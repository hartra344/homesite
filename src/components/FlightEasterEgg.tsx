import { useEffect, useState } from 'react';

// Type "fly" anywhere on the site (outside a text field) and a paper
// plane takes off across the screen. A small reward for the curious.
const FlightEasterEgg = () => {
  const [flightId, setFlightId] = useState(0);

  useEffect(() => {
    console.log(
      '%c✈  N416TV — you found the flight deck.\n%cType "fly" anywhere on the page for a quick departure.',
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
      buffer = (buffer + e.key.toLowerCase()).slice(-3);
      if (buffer === 'fly') {
        buffer = '';
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }
        setFlightId((id) => id + 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (flightId === 0) return null;

  return (
    <div
      key={flightId}
      className="fixed top-1/2 left-0 z-[100] pointer-events-none animate-fly-across"
      aria-hidden="true"
      onAnimationEnd={() => setFlightId(0)}
    >
      <span className="relative inline-block">
        <svg
          className="w-10 h-10 text-sage-600 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M2.5 19l19-7-19-7v5l13 2-13 2v5z" />
        </svg>
        {/* Contrail */}
        <span className="absolute top-1/2 right-full mr-1 w-24 border-t-2 border-dashed border-sage-300" />
      </span>
    </div>
  );
};

export default FlightEasterEgg;
