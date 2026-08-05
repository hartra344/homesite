import { useTranslation } from 'react-i18next';
import type { Destination } from '../content/travel/destinations';
import { destinations } from '../content/travel/destinations';
import { PROJ_SCALE, WORLD_PATH } from '../content/travel/world-path';

// Aviation-style data labels are intentionally hardcoded English,
// matching GATE/WPT/LEG elsewhere on the site.

// Equirectangular projection onto a 1080×540 plane, matching the generated
// WORLD_PATH landmass silhouette (see scripts/travel-world-path.mjs).
const project = (d: Pick<Destination, 'lat' | 'lon'>) => ({
  x: (d.lon + 180) * PROJ_SCALE,
  y: (90 - d.lat) * PROJ_SCALE,
});

const GRID_STEP_DEG = 20;
const PAD_X = 60;
const PAD_Y = 50;

const labelAttrs = (placement: Destination['labelPlacement']) => {
  switch (placement) {
    case 'top':
      return { dx: 0, dy: -10, anchor: 'middle' as const };
    case 'bottom':
      return { dx: 0, dy: 17, anchor: 'middle' as const };
    case 'left':
      return { dx: -10, dy: 3.5, anchor: 'end' as const };
    default:
      return { dx: 10, dy: 3.5, anchor: 'start' as const };
  }
};

const RouteChart = ({ places }: { places: Destination[] }) => {
  const { t } = useTranslation();
  const points = places.map((d) => {
    const { x, y } = project(d);
    return { ...d, x: x + (d.nudge?.x ?? 0), y: y + (d.nudge?.y ?? 0) };
  });

  const minX = Math.max(0, Math.min(...points.map((p) => p.x)) - PAD_X);
  const maxX = Math.min(360 * PROJ_SCALE, Math.max(...points.map((p) => p.x)) + PAD_X);
  const minY = Math.max(0, Math.min(...points.map((p) => p.y)) - PAD_Y);
  const maxY = Math.min(180 * PROJ_SCALE, Math.max(...points.map((p) => p.y)) + PAD_Y);

  const gridX: number[] = [];
  for (let lon = -180; lon <= 180; lon += GRID_STEP_DEG) {
    const x = (lon + 180) * PROJ_SCALE;
    if (x > minX && x < maxX) gridX.push(x);
  }
  const gridY: number[] = [];
  for (let lat = -80; lat <= 80; lat += GRID_STEP_DEG) {
    const y = (90 - lat) * PROJ_SCALE;
    if (y > minY && y < maxY) gridY.push(y);
  }

  return (
    <div className="rounded-2xl bg-charcoal-800 border border-charcoal-700 p-5 sm:p-7 shadow-lg">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-charcoal-300">
          ROUTE CHART · N416TV
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-charcoal-300">
          NOT FOR NAVIGATION
        </span>
      </div>

      <svg
        viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
        className="w-full h-auto"
        role="img"
        aria-label={t('travel.chartAria', 'World chart plotting the countries I have visited')}
      >
        {/* Landmass silhouette */}
        <path
          d={WORLD_PATH}
          fill="#454d46"
          fillRule="evenodd"
          stroke="#525c53"
          strokeWidth="0.5"
          aria-hidden="true"
        />

        {/* Graticule */}
        <g stroke="#525c53" strokeWidth="0.5" opacity="0.5" aria-hidden="true">
          {gridX.map((x) => (
            <line key={`x${x}`} x1={x} y1={minY} x2={x} y2={maxY} />
          ))}
          {gridY.map((y) => (
            <line key={`y${y}`} x1={minX} y1={y} x2={maxX} y2={y} />
          ))}
        </g>

        {/* Waypoints */}
        {points.map((p) => {
          const label = labelAttrs(p.labelPlacement);
          return (
            <g key={p.id}>
              {p.home && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="9"
                  fill="none"
                  stroke="#a3b1a6"
                  strokeWidth="1"
                  aria-hidden="true"
                />
              )}
              <circle cx={p.x} cy={p.y} r="5" fill="#7c9082" />
              <text
                x={p.x + label.dx}
                y={p.y + label.dy}
                textAnchor={label.anchor}
                fill="#e3e7e4"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="0.08em"
              >
                {p.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-x-8 gap-y-2 border-t border-dashed border-charcoal-500 mt-4 pt-4 font-mono text-[0.65rem] tracking-[0.2em] text-charcoal-200"
        aria-hidden="true"
      >
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sage-400" />
          VISITED
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border border-sage-300 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-sage-400" />
          </span>
          HOME BASE
        </span>
      </div>
    </div>
  );
};

const DestinationCard = ({ destination }: { destination: Destination }) => (
  <article className="card h-full">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.72rem] tracking-wider text-charcoal-500 border-b border-dashed border-sage-200 pb-3 mb-4">
      <span className="text-sage-600 font-semibold tracking-[0.2em]">
        {destination.code}
      </span>
      {destination.home && <span aria-hidden="true">· HOME BASE</span>}
      <span className="ml-auto">{destination.continent.toUpperCase()}</span>
    </div>
    <h3 className="text-heading-3 font-semibold text-charcoal-900">
      {destination.name}
    </h3>
    {destination.note && (
      <p className="text-body text-charcoal-600 leading-relaxed mt-2">{destination.note}</p>
    )}
  </article>
);

const TravelPage = () => {
  const { t } = useTranslation();
  const continents = new Set(destinations.map((d) => d.continent));

  const stats = [
    { label: 'COUNTRIES', value: String(destinations.length).padStart(2, '0') },
    { label: 'CONTINENTS', value: String(continents.size).padStart(2, '0') },
  ];

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="font-mono text-[0.7rem] tracking-[0.25em] text-sage-600 mb-3">
            DEPARTURES · ARRIVALS
          </p>
          <h1 className="text-display-2 font-semibold text-charcoal-900 mb-4">
            {t('travel.title', 'Travel')}
          </h1>
          <p className="text-body-lg text-charcoal-600 max-w-2xl">
            {t(
              'travel.subtitle',
              'Every country gets a waypoint on the chart — the route log of everywhere flying and wandering have taken me so far.'
            )}
          </p>
        </div>

        <dl className="flex flex-wrap gap-x-10 gap-y-3 mb-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-[0.65rem] tracking-[0.2em] text-charcoal-500 mb-0.5">
                {stat.label}
              </dt>
              <dd className="font-mono text-heading-2 text-charcoal-900">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <RouteChart places={destinations} />

        <section aria-labelledby="travel-visited" className="mt-14">
          <p className="font-mono text-caption text-sage-600 mb-2" aria-hidden="true">
            ✈ LOGBOOK — COMPLETED
          </p>
          <h2
            id="travel-visited"
            className="text-heading-1 font-semibold text-charcoal-900 mb-6"
          >
            {t('travel.visitedTitle', "Where I've been")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TravelPage;
