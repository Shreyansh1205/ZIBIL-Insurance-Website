import { useId, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function smoothPath(pts) {
  return pts.reduce((d, p, i, a) => {
    if (i === 0) return `M${p[0]},${p[1]}`;
    const prev = a[i - 1];
    const cx = (prev[0] + p[0]) / 2;
    return `${d} C${cx},${prev[1]} ${cx},${p[1]} ${p[0]},${p[1]}`;
  }, '');
}

/** Smooth gradient area chart with hover read-out. series: [{name, data, color}] */
export function AreaChart({ series, labels = MONTHS, height = 250, width = 760, format = (v) => v }) {
  const uid = useId().replace(/:/g, '');
  const [hover, setHover] = useState(null);
  const W = width;
  const pad = { l: 38, r: 16, t: 16, b: 28 };
  const all = series.flatMap((s) => s.data);
  const max = Math.ceil(Math.max(...all) / 20) * 20;
  const n = series[0].data.length;
  const x = (i) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r);
  const y = (v) => height - pad.b - (v / max) * (height - pad.t - pad.b);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${height}`} className="chart-svg" onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label="Trend chart">
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.name} id={`${uid}g${i}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity=".32" />
              <stop offset="1" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="chart-grid" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="chart-axis">{t}</text>
          </g>
        ))}
        {labels.slice(0, n).map((m, i) => (
          <text key={m + i} x={x(i)} y={height - 8} textAnchor="middle" className="chart-axis">{m}</text>
        ))}

        {series.map((s, i) => {
          const pts = s.data.map((v, k) => [x(k), y(v)]);
          const line = smoothPath(pts);
          return (
            <g key={s.name}>
              <path d={`${line} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={`url(#${uid}g${i})`} className="chart-area" />
              <path d={line} fill="none" stroke={s.color} strokeWidth="2.75" strokeLinecap="round" className="chart-line" pathLength="1" />
            </g>
          );
        })}

        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={height - pad.b} className="chart-cursor" />
            {series.map((s) => (
              <circle key={s.name} cx={x(hover)} cy={y(s.data[hover])} r="5" fill="#fff" stroke={s.color} strokeWidth="3" />
            ))}
          </g>
        )}
      </svg>

      {hover !== null && (
        <div className="chart-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <strong>{labels[hover]}</strong>
          {series.map((s) => (
            <span key={s.name}><i style={{ background: s.color }} />{s.name}: {format(s.data[hover])}</span>
          ))}
        </div>
      )}

      <div className="chart-legend">
        {series.map((s) => (<span key={s.name}><i style={{ background: s.color }} />{s.name}</span>))}
      </div>
    </div>
  );
}

/** Donut with centre label. items: [{label, value, color}] */
export function DonutChart({ items, centerLabel, centerValue, format = (v) => v }) {
  const total = items.reduce((a, b) => a + b.value, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  const [active, setActive] = useState(null);
  const starts = items.map((_, i) => items.slice(0, i).reduce((a, b) => a + (b.value / total) * C, 0));

  return (
    <div className="donut">
      <svg viewBox="0 0 200 200" className="donut-svg" role="img" aria-label={centerLabel}>
        <circle cx="100" cy="100" r={R} className="donut-track" />
        {items.map((it, i) => {
          const len = (it.value / total) * C;
          return (
            <circle
              key={it.label}
              cx="100" cy="100" r={R}
              fill="none" stroke={it.color}
              strokeWidth={active === i ? 22 : 18}
              strokeDasharray={`${Math.max(len - 4, 0)} ${C}`}
              strokeDashoffset={-starts[i]}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              className="donut-seg"
              style={{ animationDelay: `${i * 120}ms` }}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
            />
          );
        })}
        <text x="100" y="96" textAnchor="middle" className="donut-value">
          {active !== null ? format(items[active].value) : centerValue}
        </text>
        <text x="100" y="116" textAnchor="middle" className="donut-label">
          {active !== null ? items[active].label : centerLabel}
        </text>
      </svg>
      <ul className="donut-legend">
        {items.map((it, i) => (
          <li key={it.label} className={active === i ? 'on' : ''} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}>
            <i style={{ background: it.color }} />
            <span>{it.label}</span>
            <b>{Math.round((it.value / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
