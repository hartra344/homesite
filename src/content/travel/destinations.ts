export type LabelPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface Destination {
  id: string;
  /** Representative gateway airport code, used as the chart waypoint label */
  code: string;
  /** Country or territory name */
  name: string;
  continent: string;
  /** Waypoint position in decimal degrees; positive = north / east */
  lat: number;
  lon: number;
  note?: string;
  /** Which side of the waypoint the chart label sits on (default 'right') */
  labelPlacement?: LabelPlacement;
  /** Chart-only marker displacement (SVG units) to declutter near-coincident waypoints */
  nudge?: { x?: number; y?: number };
  /** Home base gets the double-ring marker */
  home?: boolean;
}

export const destinations: Destination[] = [
  {
    id: 'usa',
    code: 'RSW',
    name: 'United States',
    continent: 'North America',
    lat: 26.54,
    lon: -81.76,
    note: 'Home base — where N416TV lives.',
    labelPlacement: 'bottom',
    home: true,
  },
  {
    id: 'canada',
    code: 'YVR',
    name: 'Canada',
    continent: 'North America',
    lat: 49.19,
    lon: -123.18,
    note: 'Seaplanes in the harbor, mountains on final — Vancouver knows how to stage an arrival.',
  },
  {
    id: 'mexico',
    code: 'MEX',
    name: 'Mexico',
    continent: 'North America',
    lat: 19.44,
    lon: -99.07,
    note: 'Field elevation 7,300 feet, and street tacos that outclass any inflight meal.',
  },
  {
    id: 'bahamas',
    code: 'NAS',
    name: 'Bahamas',
    continent: 'North America',
    lat: 25.04,
    lon: -77.47,
    note: 'The short overwater hop every Florida pilot daydreams about — fifty shades of blue off the wing.',
    nudge: { x: 4, y: 3 },
  },
  {
    id: 'netherlands',
    code: 'AMS',
    name: 'Netherlands',
    continent: 'Europe',
    lat: 52.31,
    lon: 4.76,
    note: 'The only place where the bicycle traffic is better organized than the airspace.',
  },
  {
    id: 'uk',
    code: 'LHR',
    name: 'United Kingdom',
    continent: 'Europe',
    lat: 51.47,
    lon: -0.45,
    note: 'Home of the world\'s most soothing ATC accents and a proper cup of tea after landing.',
    labelPlacement: 'left',
  },
  {
    id: 'france',
    code: 'CDG',
    name: 'France',
    continent: 'Europe',
    lat: 49.01,
    lon: 2.55,
    note: 'Worth the flight for the pâtisseries alone. The Louvre is a bonus.',
    labelPlacement: 'bottom',
    nudge: { x: 2, y: 3 },
  },
  {
    id: 'spain',
    code: 'MAD',
    name: 'Spain',
    continent: 'Europe',
    lat: 40.47,
    lon: -3.57,
    note: 'Dinner at 10 p.m. and nobody in a hurry — the official anti-jet-lag lifestyle.',
    labelPlacement: 'bottom',
  },
  {
    id: 'portugal',
    code: 'LIS',
    name: 'Portugal',
    continent: 'Europe',
    lat: 38.77,
    lon: -9.13,
    note: 'Hills, tiles, and pastéis de nata. Lisbon earns every climb.',
    labelPlacement: 'left',
  },
  {
    id: 'italy',
    code: 'FCO',
    name: 'Italy',
    continent: 'Europe',
    lat: 41.8,
    lon: 12.24,
    note: 'Two thousand years of history, and espresso strong enough to stay awake for all of it.',
  },
  {
    id: 'uae',
    code: 'DXB',
    name: 'United Arab Emirates',
    continent: 'Asia',
    lat: 25.25,
    lon: 55.36,
    note: 'A skyline climbing out of the desert like it\'s trying to make a crossing restriction.',
  },
  {
    id: 'south-korea',
    code: 'ICN',
    name: 'South Korea',
    continent: 'Asia',
    lat: 37.46,
    lon: 126.44,
    note: 'Barbecue at midnight, and the smoothest airport operation on either side of the Pacific.',
    labelPlacement: 'left',
  },
  {
    id: 'hong-kong',
    code: 'HKG',
    name: 'Hong Kong',
    continent: 'Asia',
    lat: 22.31,
    lon: 113.91,
    note: 'Dim sum below, skyline forever — pour one out for the legendary Kai Tak approach.',
    labelPlacement: 'bottom',
  },
  {
    id: 'taiwan',
    code: 'TPE',
    name: 'Taiwan',
    continent: 'Asia',
    lat: 25.08,
    lon: 121.23,
    note: 'Night markets that could keep a whole flight crew fed for a month.',
  },
  {
    id: 'vietnam',
    code: 'SGN',
    name: 'Vietnam',
    continent: 'Asia',
    lat: 10.82,
    lon: 106.66,
    note: 'Phở for breakfast and a million scooters flying close formation through the streets.',
  },
  {
    id: 'thailand',
    code: 'BKK',
    name: 'Thailand',
    continent: 'Asia',
    lat: 13.69,
    lon: 100.75,
    note: 'Temples, beaches, and street food that ruins you for takeout back home.',
    labelPlacement: 'left',
  },
];
