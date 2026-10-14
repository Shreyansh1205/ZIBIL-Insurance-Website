import { lazy, Suspense } from 'react';

const HeroScene = lazy(() => import('../HeroScene'));

/** Dark feature card with a 3D orb: the single "hero" moment on each dashboard. */
export default function HealthCard({ eyebrow, score, headline, copy, factors = [], action }) {
  return (
    <section className="health-card">
      <div className="health-mesh" aria-hidden="true" />
      <div className="health-copy">
        <span className="health-eyebrow">{eyebrow}</span>
        <div className="health-score">
          <strong>{score}</strong>
          <span>/ 100</span>
        </div>
        <h2>{headline}</h2>
        <p>{copy}</p>
        {action}
      </div>

      <div className="health-orb">
        <Suspense fallback={null}>
          <HeroScene variant="orb" />
        </Suspense>
      </div>

      <ul className="health-factors">
        {factors.map((f) => (
          <li key={f.label}>
            <div><span>{f.label}</span><b>{f.value}%</b></div>
            <i style={{ '--w': `${f.value}%`, '--c': f.color }} />
          </li>
        ))}
      </ul>
    </section>
  );
}
