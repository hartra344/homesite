import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Photo } from '../utils/photos';
import { getPhotos, formatSettings } from '../utils/photos';

// Aviation-style data labels are intentionally hardcoded English,
// matching GATE/WPT/LEG elsewhere on the site.
const ExifStrip = ({ photo }: { photo: Photo }) => {
  const { exif } = photo;
  if (!exif) return null;

  const fields = [
    { label: 'CAMERA', value: exif.camera },
    { label: 'LENS', value: exif.lens },
    { label: 'FOCAL', value: exif.focalLength },
    { label: 'APERTURE', value: exif.aperture },
    { label: 'SHUTTER', value: exif.shutter },
    { label: 'ISO', value: exif.iso != null ? String(exif.iso) : null },
  ].filter((f) => f.value);

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-charcoal-500 pt-4">
      {fields.map((field) => (
        <div key={field.label}>
          <dt className="font-mono text-[0.65rem] tracking-[0.2em] text-charcoal-300 mb-0.5">
            {field.label}
          </dt>
          <dd className="font-mono text-caption text-cream">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
};

const Lightbox = ({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  const { i18n } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [index, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-[60] bg-charcoal-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full max-h-full overflow-y-auto rounded-2xl bg-charcoal-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-charcoal-900 flex items-center justify-center">
          <img
            src={photo.images.full}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto max-h-[62vh] object-contain"
          />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal-900/70 text-cream hover:bg-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {hasPrev && (
            <button
              onClick={() => onNavigate(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal-900/70 text-cream hover:bg-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onNavigate(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal-900/70 text-cream hover:bg-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Shot data panel, styled like the site's flight-data readouts */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
            <h2 className="text-heading-2 font-semibold text-cream">{photo.title}</h2>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-charcoal-300">
              FRAME {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
          </div>
          <p className="text-caption text-charcoal-300 mb-4">
            {[
              photo.location,
              photo.dateTaken
                ? new Date(photo.dateTaken).toLocaleDateString(i18n.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          {photo.caption && (
            <p className="text-body text-charcoal-200 mb-5 max-w-content">{photo.caption}</p>
          )}
          <ExifStrip photo={photo} />
        </div>
      </div>
    </div>
  );
};

const PhotographyPage = () => {
  const { t } = useTranslation();
  const [photos] = useState<Photo[]>(() => getPhotos());
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    openerRef.current?.focus();
  }, []);

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-mono text-[0.7rem] tracking-[0.25em] text-sage-600 mb-3">
            VFR · EYES OUTSIDE
          </p>
          <h1 className="text-display-2 font-semibold text-charcoal-900 mb-4">
            {t('photography.title', 'Photography')}
          </h1>
          <p className="text-body-lg text-charcoal-600 max-w-2xl">
            {t(
              'photography.subtitle',
              'Frames from the flight deck and the ground, with the camera, glass, and settings behind each shot.'
            )}
          </p>
        </div>

        {photos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {photos.map((photo, i) => (
              <figure key={photo.id} className="mb-6 break-inside-avoid">
                <button
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  aria-label={`View ${photo.title}`}
                  className="group block w-full text-left rounded-xl overflow-hidden border border-sage-200 bg-paper hover:border-sage-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 focus:ring-offset-cream"
                >
                  <img
                    src={photo.images.thumb}
                    alt={photo.title}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                  <figcaption className="px-4 py-3">
                    <span className="block text-body font-medium text-charcoal-900 group-hover:text-sage-600 transition-colors">
                      {photo.title}
                    </span>
                    {photo.exif && (
                      <span className="block font-mono text-[0.7rem] text-charcoal-500 mt-1">
                        {[photo.exif.camera, formatSettings(photo.exif)]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    )}
                  </figcaption>
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📷</div>
            <h3 className="text-heading-2 font-medium text-charcoal-900 mb-2">
              {t('photography.emptyTitle', 'No photos yet')}
            </h3>
            <p className="text-body text-charcoal-600">
              {t('photography.emptyBody', 'The gallery is being loaded — check back soon.')}
            </p>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </main>
  );
};

export default PhotographyPage;
