import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';

export const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

/* status text -> badge colour class (styles live in premium.css) */
const toneOf = (s = '') => {
  const v = s.toLowerCase();
  if (['paid', 'active', 'approved', 'settled', 'ready', 'covered'].includes(v)) return 'active';
  if (['under process', 'pending', 'in review', 'processing'].includes(v)) return 'in-review';
  return 'rejected';
};
export const Badge = ({ status }) => <span className={`portal-status-badge ${toneOf(status)}`}>{status}</span>;

export function Panel({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`portal-panel pw-panel ${className}`}>
      {(title || actions) && (
        <div className="portal-panel-header">
          <div className="portal-panel-title">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="pw-actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="pw-tabs" role="tablist">
      {tabs.map((t) => (
        <button key={t} role="tab" aria-selected={value === t} className={value === t ? 'on' : ''} onClick={() => onChange(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}

/* gradient stat strip, like the cards in the PPT screenshots */
export function StatStrip({ items }) {
  return (
    <div className="pw-strip">
      {items.map((it) => (
        <div key={it.label} className="pw-strip-card">
          <span className="pw-strip-icon"><it.icon size={20} /></span>
          <div>
            <p>{it.label}</p>
            <strong>{it.value}</strong>
            {it.sub && <small>{it.sub}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function InfoCards({ items }) {
  return (
    <div className="pw-info">
      {items.map((it) => (
        <div key={it.label} className="pw-info-card">
          <span className="pw-info-icon"><it.icon size={20} /></span>
          <div>
            <p>{it.label}</p>
            <strong>{it.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export function downloadCsv(name, columns, rows) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [columns.map((c) => esc(c.label)).join(','), ...rows.map((r) => columns.map((c) => esc(r[c.key])).join(','))].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Searchable, paginated table with CSV export.
 * columns: [{ key, label, render?(row) }]
 */
export function DataTable({ columns, rows, exportName = 'export', pageSizes = [5, 10, 25], toolbar }) {
  const [q, setQ] = useState('');
  const [size, setSize] = useState(pageSizes[1] ?? pageSizes[0]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(s))) : rows;
  }, [q, rows]);

  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const cur = Math.min(page, pages);
  const slice = filtered.slice((cur - 1) * size, cur * size);

  return (
    <div>
      <div className="pw-toolbar">
        <label className="pw-show">
          Show
          <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}>
            {pageSizes.map((p) => <option key={p}>{p}</option>)}
          </select>
          entries
        </label>
        <div className="pw-toolbar-right">
          {toolbar}
          <label className="pw-search">
            <Search size={15} />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search..." />
          </label>
          <button className="pw-btn" onClick={() => downloadCsv(exportName, columns.filter((c) => c.key), filtered)}>
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div className="portal-table-wrapper">
        <table className="portal-table">
          <thead>
            <tr>{columns.map((c) => <th key={c.label}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr><td colSpan={columns.length} className="pw-empty">No matching records</td></tr>
            )}
            {slice.map((r, i) => (
              <tr key={i}>
                {columns.map((c) => <td key={c.label}>{c.render ? c.render(r) : r[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pw-pager">
        <span>
          Showing {filtered.length ? (cur - 1) * size + 1 : 0} to {Math.min(cur * size, filtered.length)} of {filtered.length} entries
        </span>
        <div>
          <button disabled={cur === 1} onClick={() => setPage(cur - 1)}>Previous</button>
          <b>{cur}</b>
          <button disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="pw-modal-back" onClick={onClose}>
      <div className="pw-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="pw-modal-head">
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="pw-modal-body">{children}</div>
      </div>
    </div>
  );
}