import { useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Download, Search } from 'lucide-react';
import { Badge, DataTable, Panel, Tabs, inr } from './PortalWidgets';
import { EscalationCards } from './HrModules';
import * as D from './hrEmployeeData';

const demo = (msg) => () => toast.success(`${msg} (demo)`);

/* ---------------- POLICY DETAILS ---------------- */
function PolicyDetails() {
  const [key, setKey] = useState('GMC');
  const p = D.employeePolicies.find((x) => x.key === key);
  const rows = [
    ['Insurance Company Name', p.insurer], ['TPA Name', p.tpa], ['Policy Number', p.number],
    ['Policy Type', p.type], ['Policy Start Date', p.start], ['Policy Expiry Date', p.end],
    ['Sum Insured', inr(p.sumInsured)], ['Policy Holder', D.employeeProfile.company],
  ];
  return (
    <>
      <Tabs tabs={D.employeePolicies.map((x) => x.label)} value={p.label} onChange={(l) => setKey(D.employeePolicies.find((x) => x.label === l).key)} />
      <Panel title={p.title} subtitle="Stay informed about your coverage">
        <div className="pw-info wide">
          {rows.map(([k, v]) => (
            <div key={k} className="pw-info-card"><div><p>{k}</p><strong>{v}</strong></div></div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* ---------------- MY COVERAGES ---------------- */
function Coverages() {
  const [q, setQ] = useState('');
  const groups = D.policyFeatures
    .map((g) => ({ ...g, items: g.items.filter(([k, v]) => `${g.group} ${k} ${v}`.toLowerCase().includes(q.toLowerCase())) }))
    .filter((g) => g.items.length);
  return (
    <Panel title="My coverages" subtitle="Benefits and coverage limits at a glance"
      actions={<label className="pw-search"><Search size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search coverage..." /></label>}>
      <div className="pw-accordion">
        {groups.map((g) => (
          <details key={g.group} open>
            <summary>{g.group}</summary>
            <dl className="pw-dl">
              {g.items.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            </dl>
          </details>
        ))}
        {groups.length === 0 && <p className="pw-empty">No coverage matches your search.</p>}
      </div>
    </Panel>
  );
}

/* ---------------- MEMBERS COVERED ---------------- */
const Members = () => (
  <Panel title="Members covered" subtitle="View and download e-cards to avail cashless facilities"
    actions={<button className="pw-btn solid" onClick={demo('All cashless cards downloaded')}><Download size={15} /> Download cashless card</button>}>
    <div className="pw-cards two">
      {D.members.map((m) => (
        <div key={m.memberId} className="pw-member">
          <span className="pw-avatar">{m.name.charAt(0)}</span>
          <div>
            <strong>{m.name}</strong>
            <p>{m.memberId} · {m.relation}</p>
            <p>DOB: {m.dob} (Age {m.age})</p>
          </div>
          <div className="pw-inline">
            <button className="pw-btn sm" onClick={demo(`e-Card of ${m.name} opened`)}>View</button>
            <button className="pw-btn sm solid" onClick={demo(`e-Card of ${m.name} downloaded`)}><Download size={13} /></button>
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

/* ---------------- NETWORK HOSPITAL ---------------- */
const Hospitals = () => (
  <Panel title="Network hospitals" subtitle="Search by name, PIN code, state or city to avail cashless facilities">
    <DataTable
      exportName="network-hospitals"
      columns={[
        { key: 'name', label: 'Hospital Name' }, { key: 'address', label: 'Address' },
        { key: 'city', label: 'City' }, { key: 'state', label: 'State' }, { key: 'pin', label: 'PIN' },
      ]}
      rows={D.hospitals}
    />
  </Panel>
);

/* ---------------- DOWNLOAD FORMS ---------------- */
const Forms = () => (
  <Panel title="Download essential forms" subtitle="Important claim-related documents in one place">
    <ul className="pw-files">
      {D.formsList.map((f) => (
        <li key={f.name}>
          <span className="pw-file-icon">PDF</span>
          <div><strong>{f.name}</strong><small>{f.desc} · {f.size}</small></div>
          <button className="pw-btn" onClick={demo(`${f.name} downloaded`)}><Download size={15} /> Download</button>
        </li>
      ))}
    </ul>
  </Panel>
);

/* ---------------- CLAIM STATUS ---------------- */
const stages = ['Intimated', 'Documents verified', 'Approved', 'Paid'];
const stageIndex = (s) => (s === 'Paid' ? 3 : s === 'Under Process' ? 1 : 0);

function ClaimStatus() {
  const [open, setOpen] = useState(D.employeeClaims[0].claimNo);
  return (
    <div className="pw-stack">
      {D.employeeClaims.map((c) => {
        const idx = stageIndex(c.status);
        return (
          <Panel key={c.claimNo} title={`Claim ${c.claimNo}`} subtitle={c.patient}
            actions={<Badge status={c.status} />}>
            <dl className="pw-dl cols">
              <div><dt>Hospital</dt><dd>{c.hospital}</dd></div>
              <div><dt>Intimation date</dt><dd>{c.intimated}</dd></div>
              <div><dt>Admission date</dt><dd>{c.admission}</dd></div>
              <div><dt>Latest update</dt><dd>{c.updated}</dd></div>
              <div><dt>Claim amount</dt><dd>{inr(c.amount)}</dd></div>
            </dl>
            <div className="pw-actions-row left">
              <button className="pw-btn solid" onClick={() => setOpen(open === c.claimNo ? null : c.claimNo)}>Track your claim</button>
              <button className="pw-btn" onClick={demo('Document upload')}>Upload document</button>
            </div>
            {open === c.claimNo && (
              <ol className="pw-steps">
                {stages.map((s, i) => (
                  <li key={s} className={i <= idx ? 'done' : ''}><span>{i <= idx ? <Check size={14} /> : i + 1}</span>{s}</li>
                ))}
              </ol>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

/* ---------------- INTIMATE MY CLAIM ---------------- */
function IntimateClaim() {
  const blank = { patient: D.members[0].name, type: 'Cashless', reason: '', date: '', amount: '', hospital: '', address: '', city: '', state: '', pin: '' };
  const [f, setF] = useState(blank);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast.success('Claim intimated. Reference INT-' + Math.floor(100000 + Math.random() * 900000) + ' (demo)');
    setF(blank);
  };
  return (
    <Panel title="Intimate my claim" subtitle="Initiate a claim with the insurer / TPA. It is processed by the respective provider.">
      <form className="pw-form" onSubmit={submit}>
        <label>Patient Name<select value={f.patient} onChange={set('patient')}>{D.members.map((m) => <option key={m.memberId}>{m.name}</option>)}</select></label>
        <label>Claim Type<select value={f.type} onChange={set('type')}><option>Cashless</option><option>Reimbursement</option></select></label>
        <label>Hospitalization Date<input required type="date" value={f.date} onChange={set('date')} /></label>
        <label>Estimated Claim Amount (₹)<input required type="number" min="1" value={f.amount} onChange={set('amount')} /></label>
        <label>Name of Hospital<input required value={f.hospital} onChange={set('hospital')} /></label>
        <label>Hospital Address<input required value={f.address} onChange={set('address')} /></label>
        <label>City<input required value={f.city} onChange={set('city')} /></label>
        <label>State<input required value={f.state} onChange={set('state')} /></label>
        <label>Pincode<input required pattern="[0-9]{6}" title="6 digit pincode" value={f.pin} onChange={set('pin')} /></label>
        <label className="wide">Reason for Claim<textarea required rows={3} value={f.reason} onChange={set('reason')} /></label>
        <button type="submit" className="portal-primary-button">Submit claim</button>
      </form>
    </Panel>
  );
}

/* ---------------- WELLNESS (Medibhai) ---------------- */
function Wellness() {
  return (
    <>
      <div className="pw-hero">
        <div>
          <span className="portal-eyebrow">YOUR WELLNESS PARTNER</span>
          <h2>Medibhai: in your life, by your side</h2>
          <p>Preventive care, specialist consultations and wellness programs for you and your family.</p>
        </div>
      </div>
      <div className="pw-cards three">
        {D.wellnessServices.map((s) => (
          <article key={s.key} className="pw-service">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul>{s.points.map((pt) => <li key={pt}><Check size={14} />{pt}</li>)}</ul>
            <button className="pw-btn solid" onClick={demo(`${s.title} requested`)}>Get started</button>
          </article>
        ))}
      </div>
    </>
  );
}

export const employeeModules = {
  'policy-details': { title: 'Policy Details', description: 'Insurer, policy number, period, sum insured and more.', Component: PolicyDetails },
  coverages: { title: 'My Coverages', description: 'Room rent, maternity limits, waiting periods, ambulance and more.', Component: Coverages },
  members: { title: 'Members Covered', description: 'Members under your policy and their e-cards.', Component: Members },
  escalation: { title: 'Escalation Matrix', description: 'Contact details of our team for insurance related queries.', Component: EscalationCards },
  hospitals: { title: 'Network Hospital', description: 'Hospitals where you can avail cashless facilities.', Component: Hospitals },
  forms: { title: 'Download Forms', description: 'Claim form, checklist and other important documents.', Component: Forms },
  'claim-status': { title: 'Claim Status', description: 'Track the real-time status of your claims.', Component: ClaimStatus },
  'intimate-claim': { title: 'Intimate My Claim', description: 'Raise a claim with the insurer or TPA.', Component: IntimateClaim },
  wellness: { title: 'Wellness (Medibhai)', description: 'Teleconsultation, diagnostics, OPD, medicines and more.', Component: Wellness },
};