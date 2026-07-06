import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Leg {
  leg: string;
  waypoint: string;
  location: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

const legs: Leg[] = [
  {
    leg: 'LEG 04',
    waypoint: 'RSW',
    location: 'Fort Myers, FL',
    company: 'GitHub',
    role: 'Principal Engineer',
    period: '2025 - Present',
    current: true,
    description:
      'Building enterprise platform capabilities at GitHub, enabling organizations to scale their development workflows securely and efficiently.',
    achievements: [
      "Driving architecture and technical strategy for GitHub's Enterprise Platform",
      'Building scalable platform solutions that serve enterprise customers worldwide',
    ],
  },
  {
    leg: 'LEG 03',
    waypoint: 'BFI',
    location: 'Redmond, WA',
    company: 'Microsoft',
    role: 'Principal Software Engineering Manager',
    period: '2021 - 2025',
    description:
      'Led the Azure Logic Apps UX team to deliver enterprise-grade integration solutions used by millions of developers worldwide.',
    achievements: [
      'Led a team of 7 engineers building Azure Logic Apps UX platform, collaborating closely with PMs, designers, and researchers',
      'Architected and led the complete rewrite and redesign of the Azure Logic Apps Designer, modernizing the core user experience',
      'Co-led development of Logic Apps Agent Loop, pioneering AI-powered workflow automation capabilities',
      'Led development of Logic Apps Data Mapper, enabling visual data transformation for enterprise integration scenarios',
    ],
  },
  {
    leg: 'LEG 02',
    waypoint: 'PAO',
    location: 'Menlo Park, CA',
    company: 'Facebook',
    role: 'Software Engineer',
    period: '2019 - 2021',
    description:
      "Built commerce and gaming experiences across Facebook's ecosystem, from marketplace inventory systems to mobile gaming platforms.",
    achievements: [
      'Developed backend systems for Facebook Marketplace and Instagram Shopping catalog processing, handling inventory management at scale',
      'Built the Facebook Gaming native iOS app (fb.gg) as part of the gamer streaming organization, delivering live streaming features',
      "Contributed the very first shipped Swift code in the main Facebook iOS app by introducing Facebook's first iOS widget",
      'Led and mentored 1 engineer during my final 6 months, providing technical guidance and career development support',
    ],
  },
  {
    leg: 'LEG 01',
    waypoint: 'RNT',
    location: 'Redmond, WA',
    company: 'Microsoft',
    role: 'Senior Software Engineer',
    period: '2014 - 2019',
    description:
      'Built foundational UX experiences for Azure App Services, focusing on developer productivity and accessibility across the Azure portal.',
    achievements: [
      'Developed the App Service create experience supporting 30+ variations of app service creation workflows in the Azure portal',
      'Built core portal experiences for App Service configuration, enabling developers to manage cloud applications at scale',
      'Contributed to Azure Functions portal development experience, helping establish the serverless computing UX foundation',
      'Championed performance optimization and accessibility (a11y) standards across all Azure App Services portal experiences',
    ],
  },
];

const Experience = () => {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.45;
      const raw = (anchor - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="experience" data-testid="experience" className="py-section-lg bg-stone">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section header styled like a logbook heading */}
        <div className="mb-12">
          <p className="font-mono text-caption text-sage-600 mb-2" aria-hidden="true">
            ✈ PILOT'S LOGBOOK — N416TV
          </p>
          <h2 className="text-display-2 font-semibold text-charcoal-900 mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-body-lg text-charcoal-600 max-w-2xl">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Route timeline */}
        <div ref={timelineRef} className="relative">
          {/* Route line */}
          <div
            className="absolute left-[15px] md:left-[27px] top-2 bottom-2 w-px border-l-2 border-dashed border-sage-300"
            aria-hidden="true"
          />
          {/* Plane that flies down the route as you scroll */}
          <div
            className="absolute left-[15px] md:left-[27px] -ml-[13px] z-10 pointer-events-none"
            style={{ top: `calc((100% - 34px) * ${progress} + 8px)` }}
            aria-hidden="true"
          >
            <svg
              className="w-[26px] h-[26px] text-sage-600 drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ transform: 'rotate(90deg)' }}
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          <ol className="space-y-10">
            {legs.map((leg) => (
              <li key={leg.leg} className="relative pl-12 md:pl-20">
                {/* Waypoint node */}
                <span
                  className={`absolute left-0 md:left-3 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-cream ${
                    leg.current
                      ? 'border-sage-500 animate-beacon'
                      : 'border-sage-300'
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      leg.current ? 'bg-sage-500' : 'bg-sage-300'
                    }`}
                  />
                </span>

                <article className="card hover:-translate-y-0.5">
                  {/* Logbook header row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.72rem] tracking-wider text-charcoal-500 border-b border-dashed border-sage-200 pb-3 mb-4">
                    <span className="text-sage-600 font-semibold">{leg.leg}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      WPT <span className="text-charcoal-600 font-semibold">{leg.waypoint}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{leg.location.toUpperCase()}</span>
                    <span className="ml-auto tag !py-0.5 font-mono">
                      {leg.period.replace('Present', t('experience.current'))}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 mb-3">
                    <h3 className="text-heading-2 font-semibold text-charcoal-900">
                      {leg.role}
                    </h3>
                    <p className="text-heading-3 text-sage-600 font-medium">
                      {leg.company}
                    </p>
                  </div>

                  <p className="text-body text-charcoal-600 leading-relaxed mb-4">
                    {leg.description}
                  </p>

                  <h4 className="font-mono text-[0.72rem] tracking-wider text-charcoal-500 mb-3">
                    {t('experience.keyAchievements').toUpperCase()}
                  </h4>
                  <ul className="space-y-2.5">
                    {leg.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[0.55rem] w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-body text-charcoal-600 leading-relaxed">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center mt-14">
          <a href="/resume.html" target="_blank" className="btn-secondary group">
            <svg
              className="w-5 h-5 mr-2 text-sage-600 group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {t('hero.viewResume')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
