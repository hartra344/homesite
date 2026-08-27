import { useEffect, useState } from 'react';

// Type "snap" anywhere on the site (outside a text field) and the page
// fires the shutter — viewfinder brackets, a flash, and a frame counter.
// A small reward for the curious.
const ShutterEasterEgg = () => {
  const [shotId, setShotId] = useState(0);

  useEffect(() => {
    console.log(
      '%c📷  You found the darkroom.\n%cType "snap" anywhere on the page to fire the shutter.',
      'color: #5f7563; font-size: 14px; font-weight: bold;',
      'color: #68736a; font-size: 12px;'
    );

    let buffer = '';
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === 'snap') {
        buffer = '';
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }
        setShotId((id) => id + 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (shotId === 0) return null;

  return (
    <div
      key={shotId}
      className="fixed inset-0 z-[100] pointer-events-none animate-shutter-snap"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        // The flash child animation bubbles up too; only the wrapper's
        // envelope ending should dismiss the overlay.
        if (e.animationName === 'shutter-snap') setShotId(0);
      }}
    >
      {/* Flash */}
      <div className="absolute inset-0 bg-cream animate-flash-pop" style={{ opacity: 0 }} />
      {/* Viewfinder brackets */}
      <span className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-sage-500 rounded-tl-sm" />
      <span className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-sage-500 rounded-tr-sm" />
      <span className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-sage-500 rounded-bl-sm" />
      <span className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-sage-500 rounded-br-sm" />
      {/* Frame counter, like a film advance */}
      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.3em] text-sage-600">
        FRAME {String(shotId).padStart(2, '0')} · GOT IT
      </span>
    </div>
  );
};

export default ShutterEasterEgg;
