import { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import useCountUp from './useCountUp';

export function Sparkline({ data = [], tone = 'blue' }) {
  if (data.length < 2) return null;
  const w = 120;
  const h = 38;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((d, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((d - min) / span) * (h - 10),
  ]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  const id = `spark-${tone}-${data.join('').length}-${data[0]}-${data[data.length - 1]}`;

  return (
    <svg className={`kpi-spark ${tone}`} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path className="kpi-spark-line" d={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * KPI tile with count-up number, trend chip, sparkline and pointer-driven 3D tilt.
 * value: number. Use prefix/suffix/decimals for formatting.
 */
export default function KpiCard({
  icon: Icon,
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  trend,
  trendLabel,
  direction = 'up',
  tone = 'blue',
  detail,
  spark,
  text,
}) {
  const cardRef = useRef(null);
  const [numRef, shown] = useCountUp(typeof value === 'number' ? value : 0, { decimals });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 9}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  const Arrow = direction === 'down' ? ArrowDownRight : direction === 'flat' ? Minus : ArrowUpRight;

  return (
    <article ref={cardRef} className={`kpi-card tone-${tone}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="kpi-glow" aria-hidden="true" />
      <div className="kpi-top">
        <span className="kpi-orb">
          <Icon size={20} strokeWidth={2} />
        </span>
        {trend && (
          <span className={`kpi-trend ${direction}`}>
            <Arrow size={13} strokeWidth={2.5} />
            {trend}
          </span>
        )}
      </div>

      <p className="kpi-label">{label}</p>
      <div className="kpi-value" ref={numRef}>
        {text ?? (
          <>
            {prefix}
            {shown.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
          </>
        )}
      </div>

      <div className="kpi-bottom">
        <span className="kpi-detail">{trendLabel || detail}</span>
        <Sparkline data={spark} tone={tone} />
      </div>
    </article>
  );
}
