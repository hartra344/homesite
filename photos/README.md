# Photography pipeline

1. Drop full-resolution images into `photos/originals/` (JPEG, PNG, TIFF, or
   WebP — export HEIC from Photos/Lightroom as JPEG first). Filenames become
   URL slugs, so name them like `osprey-over-estero-bay.jpg`.
2. Run `npm run photos:build`. This extracts the camera/lens/exposure data,
   renders stripped-metadata WebP derivatives into `public/photos/`, and
   updates `src/content/photos/manifest.json`.
3. Optionally edit the manifest: `title`, `caption`, `location`, `featured`,
   and `published` are yours to curate and survive re-runs. Everything else
   is regenerated. If an original is geotagged (e.g. Sony body paired with
   the Creators' App) and `location` is empty, the pipeline reverse-geocodes
   it to a coarse "City, Region" label — exact coordinates are never written
   to the manifest or the published files.
4. Commit `public/photos/` and the manifest. Originals never leave this
   machine (`photos/originals/` is gitignored), and GPS/serial EXIF is
   stripped from the published files.

`npm run photos:rebuild` reprocesses everything (e.g. after changing sizes
or replacing an original with a re-edit).
