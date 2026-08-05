#!/usr/bin/env node
/**
 * Photography pipeline: drop full-resolution images into photos/originals/,
 * run `npm run photos:build`, commit the results.
 *
 * For each original this script:
 *   1. Extracts shooting data (camera, lens, focal length, aperture,
 *      shutter speed, ISO, capture time) with exifr.
 *   2. Renders web-optimized WebP derivatives into public/photos/
 *      (metadata is stripped from the published files, so GPS and serial
 *      numbers never leave your machine — the manifest is the only
 *      metadata that ships).
 *   3. Merges an entry into src/content/photos/manifest.json. Curated
 *      fields (title, caption, location, featured, published, order) are
 *      preserved across re-runs; camera data and image paths are refreshed.
 *
 * If the original is geotagged and `location` hasn't been curated yet, the
 * coordinates are reverse-geocoded (Nominatim/OpenStreetMap) to a coarse
 * "City, Region" label at ingest time. Only that label ever reaches the
 * manifest — exact coordinates are never written anywhere.
 *
 * Originals are gitignored; only the derivatives and manifest are committed.
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import exifr from "exifr";
import sharp from "sharp";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const ORIGINALS_DIR = path.join(ROOT, "photos", "originals");
const OUTPUT_DIR = path.join(ROOT, "public", "photos");
const MANIFEST_PATH = path.join(ROOT, "src", "content", "photos", "manifest.json");

const SUPPORTED = /\.(jpe?g|png|tiff?|webp)$/i;
const THUMB_WIDTH = 800; // grid cell, retina-friendly
const FULL_WIDTH = 2000; // lightbox
const WEBP_QUALITY = 82;

const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const titleFromSlug = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** "NIKON CORPORATION" + "NIKON Z 6" -> "Nikon Z 6" */
const formatCamera = (make, model) => {
  if (!model) return make || null;
  const cleanMake = (make || "").replace(/\s*(corporation|corp\.?|co\.,? ltd\.?|inc\.?)\s*$/i, "").trim();
  if (!cleanMake || model.toLowerCase().includes(cleanMake.toLowerCase())) {
    return normalizeCase(model);
  }
  return `${normalizeCase(cleanMake)} ${model}`;
};

/** Shouty vendor strings ("FUJIFILM") -> title case; mixed case passes through. */
const normalizeCase = (s) =>
  s === s.toUpperCase() ? s.replace(/\w+/g, (w) => w[0] + w.slice(1).toLowerCase()) : s;

const formatShutter = (seconds) => {
  if (!seconds || seconds <= 0) return null;
  if (seconds >= 1) return `${Number(seconds.toFixed(1))}s`;
  return `1/${Math.round(1 / seconds)}s`;
};

const formatFocal = (mm) => (mm ? `${Math.round(mm)}mm` : null);

/**
 * Coarse place label ("Key West, FL" / "Reykjavík, Iceland") from GPS.
 * Nominatim asks for at most 1 request/second; ingest is throttled below.
 */
const reverseGeocode = async (lat, lon) => {
  const url =
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}` +
    `&format=jsonv2&zoom=10&accept-language=en`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "travis.dev-photo-pipeline/1.0" },
    });
    if (!res.ok) return null;
    const { address } = await res.json();
    if (!address) return null;
    const place =
      address.city || address.town || address.village || address.municipality ||
      address.county || null;
    if (!place) return null;
    // US: "City, FL" via the ISO region code; elsewhere: "City, Country".
    const iso = address["ISO3166-2-lvl4"];
    const region =
      address.country_code === "us" && iso
        ? iso.split("-")[1]
        : address.country;
    return region ? `${place}, ${region}` : place;
  } catch {
    return null;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const extractExif = async (filePath) => {
  const raw = await exifr.parse(filePath, {
    pick: [
      "Make", "Model", "LensModel", "LensMake", "Lens",
      "FocalLength", "FocalLengthIn35mmFormat",
      "FNumber", "ExposureTime", "ISO",
      "DateTimeOriginal", "CreateDate",
    ],
  }).catch(() => null);
  if (!raw) return { exif: null, dateTaken: null };

  const lens = raw.LensModel || raw.Lens || null;
  const date = raw.DateTimeOriginal || raw.CreateDate || null;
  return {
    exif: {
      camera: formatCamera(raw.Make, raw.Model),
      lens: lens ? lens.trim() : null,
      focalLength: formatFocal(raw.FocalLength),
      focalLength35: formatFocal(raw.FocalLengthIn35mmFormat),
      aperture: raw.FNumber ? `f/${Number(raw.FNumber.toFixed(1))}` : null,
      shutter: formatShutter(raw.ExposureTime),
      iso: raw.ISO ?? null,
    },
    dateTaken: date instanceof Date ? date.toISOString() : date,
  };
};

const renderDerivative = async (filePath, outPath, width) => {
  // sharp strips EXIF/GPS by default; keep it that way for published files.
  await sharp(filePath)
    .rotate() // bake in EXIF orientation before metadata is dropped
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);
};

const main = async () => {
  if (!existsSync(ORIGINALS_DIR)) {
    await mkdir(ORIGINALS_DIR, { recursive: true });
    console.log(`Created ${path.relative(ROOT, ORIGINALS_DIR)} — drop your photos there and re-run.`);
    return;
  }
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(await readFile(MANIFEST_PATH, "utf8"))
    : [];
  const byId = new Map(manifest.map((entry) => [entry.id, entry]));

  const files = (await readdir(ORIGINALS_DIR)).filter((f) => SUPPORTED.test(f)).sort();
  if (files.length === 0) {
    console.log(`No images found in ${path.relative(ROOT, ORIGINALS_DIR)} (jpg/png/tiff/webp).`);
    console.log("HEIC isn't supported — export from Photos/Lightroom as JPEG first.");
    return;
  }

  const force = process.argv.includes("--force");
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(ORIGINALS_DIR, file);
    const id = slugify(file);
    if (!id) {
      console.warn(`  ! Skipping ${file}: filename produces an empty slug`);
      continue;
    }

    const thumbName = `${id}-${THUMB_WIDTH}.webp`;
    const fullName = `${id}-${FULL_WIDTH}.webp`;
    const existing = byId.get(id);
    const outputsExist =
      existsSync(path.join(OUTPUT_DIR, thumbName)) &&
      existsSync(path.join(OUTPUT_DIR, fullName));

    if (existing && outputsExist && !force) {
      skipped++;
      continue;
    }

    const { exif, dateTaken } = await extractExif(filePath);
    const meta = await sharp(filePath).rotate().metadata();

    // Auto-fill location from GPS only when it hasn't been curated by hand.
    let location = existing?.location ?? "";
    if (!location) {
      const gps = await exifr.gps(filePath).catch(() => null);
      if (gps?.latitude != null && gps?.longitude != null) {
        const place = await reverseGeocode(gps.latitude, gps.longitude);
        if (place) {
          location = place;
          console.log(`    ⌖ geotag resolved to ${place}`);
        }
        await sleep(1100); // Nominatim rate limit: 1 req/s
      }
    }

    await renderDerivative(filePath, path.join(OUTPUT_DIR, thumbName), THUMB_WIDTH);
    await renderDerivative(filePath, path.join(OUTPUT_DIR, fullName), FULL_WIDTH);

    const entry = {
      // Curated fields — edit these in the manifest; re-runs won't touch them.
      title: existing?.title ?? titleFromSlug(id),
      caption: existing?.caption ?? "",
      location,
      featured: existing?.featured ?? false,
      published: existing?.published ?? true,
      // Pipeline-owned fields — refreshed on every run.
      id,
      original: file,
      dateTaken,
      width: meta.width,
      height: meta.height,
      images: {
        thumb: `/photos/${thumbName}`,
        full: `/photos/${fullName}`,
      },
      exif,
    };
    byId.set(id, entry);
    processed++;

    const summary = exif?.camera
      ? `${exif.camera}${exif.lens ? ` · ${exif.lens}` : ""} · ${[exif.focalLength, exif.aperture, exif.shutter, exif.iso ? `ISO ${exif.iso}` : null].filter(Boolean).join(" ")}`
      : "no EXIF found";
    console.log(`  ✓ ${file} -> ${id} (${summary})`);
  }

  // Newest first by capture date; undated photos sink to the end.
  const entries = [...byId.values()].sort((a, b) => {
    const ta = a.dateTaken ? new Date(a.dateTaken).getTime() : 0;
    const tb = b.dateTaken ? new Date(b.dateTaken).getTime() : 0;
    return tb - ta;
  });

  await writeFile(MANIFEST_PATH, JSON.stringify(entries, null, 2) + "\n");
  console.log(
    `\nDone: ${processed} processed, ${skipped} up to date, ${entries.length} total in manifest.`
  );
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
  console.log("Curate titles/captions/featured flags there, then commit public/photos + the manifest.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
