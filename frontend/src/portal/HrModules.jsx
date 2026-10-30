import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import {
  Building2, CalendarDays, Clock, Download, FileText, HeartPulse, Mail,
  Phone, Receipt, ShieldCheck, Upload, UserRound, Users, Wallet,
} from 'lucide-react';
import { DonutChart } from '../components/dash/Charts';
import {
  Badge, DataTable, InfoCards, Modal, Panel, StatStrip, Tabs, inr,
} from './PortalWidgets';
import * as D from './hrEmployeeData';

const demo = (msg) => () => toast.success(`${msg} (demo)`);

const policyCards = [
  { icon: Building2, label: 'Insurer', value: D.policy.insurer },
  { icon: FileText, label: 'Policy Number', value: D.policy.number },
  { icon: CalendarDays, label: 'Policy Period', value: `${D.policy.start} to ${D.policy.end}` },
  { icon: ShieldCheck, label: 'TPA', value: D.policy.tpa },
];

/* ---------------- ENROLLMENT ---------------- */
function Enrollment() {
  const [tab, setTab] = useState('Enrollment Details');
  return (
    <>
      <Tabs tabs={['Enrollment Details', 'List View', 'Nominee Details', 'Upload Enrollment']} value={tab} onChange={setTab} />

      {tab === 'Enrollment Details' && (
        <>
          <InfoCards items={policyCards} />
          <StatStrip items={[
            { icon: UserRound, label: 'Employees', value: 4 },
            { icon: Users, label: 'Dependents', value: 0 },
            { icon: Users, label: 'Lives', value: 4 },
          ]} />
          <Panel title="Employee enrollment" subtitle="Employees and dependents covered under this policy">
            <DataTable
              exportName="enrollment"
              columns={[
                { key: 'name', label: 'Employee Name' },
                { key: 'empId', label: 'Employee ID' },
                { key: 'memberId', label: 'Member ID' },
                { key: 'sumInsured', label: 'Sum Insured', render: (r) => inr(r.sumInsured) },
                { label: 'Dependant', render: (r) => <button className="pw-btn sm" onClick={demo(`Dependants of ${r.name}`)}>View Dependant</button> },
                { label: 'Cards', render: (r) => r.hasCard ? (
                  <span className="pw-inline">
                    <button className="pw-btn sm" onClick={demo(`e-Card for ${r.name} downloaded`)}>View Card</button>
                    <button className="pw-btn sm solid" onClick={demo(`e-Card mailed to ${r.email}`)}><Mail size={13} /> Mail</button>
                  </span>
                ) : '-' },
                { label: 'Intimate', render: (r) => <Link className="pw-link" to="/corporate/claims" state={{ tab: 'Intimate Claim', empId: r.empId }}>Intimate Claim</Link> },
                { key: 'mobile', label: 'Employee Mobile' },
              ]}
              rows={D.hrEmployees}
            />
          </Panel>
        </>
      )}

      {tab === 'List View' && (
        <div className="pw-cards">
          {D.hrEmployees.map((e) => (
            <div key={e.empId} className="pw-person">
              <span className="pw-avatar">{e.name.charAt(0)}</span>
              <div>
                <strong>{e.name}</strong>
                <p>{e.empId} · {e.dept}</p>
                <p>{e.mobile}</p>
              </div>
              <Badge status="Active" />
            </div>
          ))}
        </div>
      )}

      {tab === 'Nominee Details' && (
        <Panel title="Nominee details">
          <DataTable
            exportName="nominees"
            columns={[
              { key: 'empId', label: 'Employee ID' },
              { key: 'employee', label: 'Employee' },
              { key: 'nominee', label: 'Nominee Name' },
              { key: 'relation', label: 'Relation' },
              { key: 'share', label: 'Share' },
            ]}
            rows={D.nominees}
          />
        </Panel>
      )}

      {tab === 'Upload Enrollment' && (
        <Panel title="Upload enrollment" subtitle="Add employees and dependents in bulk using the template">
          <div className="pw-drop">
            <Upload size={30} />
            <p>Choose a filled enrollment sheet (.xlsx or .csv)</p>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => e.target.files[0] && toast.success(`${e.target.files[0].name} received (demo, not uploaded)`)} />
            <button className="pw-btn" onClick={demo('Template downloaded')}><Download size={15} /> Download template</button>
          </div>
        </Panel>
      )}
    </>
  );
}

/* ---------------- CLAIMS ---------------- */
function Claims() {
  const loc = useLocation();
  const [tab, setTab] = useState(loc.state?.tab || 'Claims Details');
  const [open, setOpen] = useState(null);
  const [fq, setFq] = useState('');
  const s = D.claimsStrip;

  const [form, setForm] = useState({ empId: loc.state?.empId || D.hrEmployees[0].empId, beneficiary: 'Employee', type: 'Cashless', hospital: '', date: '', amount: '', reason: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast.success('Claim intimated. Reference INT-' + Math.floor(100000 + Math.random() * 900000) + ' (demo)');
    setForm({ ...form, hospital: '', date: '', amount: '', reason: '' });
  };

  return (
    <>
      <Tabs tabs={['Claims Details', 'Intimate Claim']} value={tab} onChange={setTab} />

      {tab === 'Claims Details' && (
        <>
          <StatStrip items={[
            { icon: Wallet, label: 'Claims Paid', value: inr(s.paid.amount), sub: `${s.paid.count} claims` },
            { icon: Clock, label: 'Claims Under Process', value: inr(s.process.amount), sub: `${s.process.count} claim` },
            { icon: HeartPulse, label: 'Closed / Rejected', value: inr(s.closed.amount), sub: `${s.closed.count} claims` },
            { icon: FileText, label: 'Reported Claims', value: inr(s.reported.amount), sub: `${s.reported.count} claims` },
          ]} />
          <Panel title="Claims" subtitle="All employee claims by current status">
            <DataTable
              exportName="claims"
              columns={[
                { label: 'View Details', render: (r) => <button className="pw-btn sm solid" onClick={() => { setOpen(r); setFq(''); }}>View Details</button> },
                { key: 'empId', label: 'Employee ID' },
                { key: 'employee', label: 'Employee Name' },
                { key: 'beneficiary', label: 'Beneficiary' },
                { key: 'relation', label: 'Relation' },
                { key: 'type', label: 'Claim Type' },
                { label: 'Claim Status', render: (r) => <Badge status={r.status} /> },
                { key: 'tpaClaim', label: 'TPA Claim No' },
              ]}
              rows={D.hrClaims}
            />
          </Panel>

          {open && (
            <Modal title="Claims Details" onClose={() => setOpen(null)}>
              <input className="pw-modal-search" placeholder="Search..." value={fq} onChange={(e) => setFq(e.target.value)} />
              <dl className="pw-dl">
                {D.claimDetailFields(open)
                  .filter(([k, v]) => `${k} ${v}`.toLowerCase().includes(fq.toLowerCase()))
                  .map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
            </Modal>
          )}
        </>
      )}

      {tab === 'Intimate Claim' && (
        <Panel title="Intimate a claim" subtitle="Initiate a claim on behalf of an employee with the insurer / TPA">
          <form className="pw-form" onSubmit={submit}>
            <label>Employee
              <select value={form.empId} onChange={set('empId')}>
                {D.hrEmployees.map((e) => <option key={e.empId} value={e.empId}>{e.name} ({e.empId})</option>)}
              </select>
            </label>
            <label>Beneficiary
              <select value={form.beneficiary} onChange={set('beneficiary')}><option>Employee</option><option>Spouse</option><option>Child</option><option>Parent</option></select>
            </label>
            <label>Claim Type
              <select value={form.type} onChange={set('type')}><option>Cashless</option><option>Reimbursement</option></select>
            </label>
            <label>Hospital Name<input required value={form.hospital} onChange={set('hospital')} placeholder="Name of hospital" /></label>
            <label>Admission Date<input required type="date" value={form.date} onChange={set('date')} /></label>
            <label>Estimated Amount (₹)<input required type="number" min="1" value={form.amount} onChange={set('amount')} /></label>
            <label className="wide">Reason for Claim<textarea required rows={3} value={form.reason} onChange={set('reason')} /></label>
            <button type="submit" className="portal-primary-button">Submit claim intimation</button>
          </form>
        </Panel>
      )}
    </>
  );
}

/* ---------------- OTHER MODULES ---------------- */
const Requests = () => (
  <>
    <StatStrip items={[
      { icon: FileText, label: 'Total requests', value: D.hrRequests.length },
      { icon: Clock, label: 'Pending / in process', value: D.hrRequests.filter((r) => r.status !== 'Approved').length },
      { icon: ShieldCheck, label: 'Approved', value: D.hrRequests.filter((r) => r.status === 'Approved').length },
    ]} />
    <Panel title="Employee requests">
      <DataTable
        exportName="employee-requests"
        columns={[
          { key: 'id', label: 'Request ID' },
          { key: 'employee', label: 'Employee' },
          { key: 'type', label: 'Request Type' },
          { key: 'raised', label: 'Raised On' },
          { label: 'Status', render: (r) => <Badge status={r.status} /> },
        ]}
        rows={D.hrRequests}
      />
    </Panel>
  </>
);

function Hospitals() {
  const [state, setState] = useState('');
  const states = [...new Set(D.hospitals.map((h) => h.state))].sort();
  return (
    <Panel title="Cashless hospitals" subtitle={`Network of ${D.policy.insurer} and ${D.policy.tpa}`}>
      <label className="pw-select-row">Hospital State
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Please select state</option>
          {states.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <DataTable
        exportName="cashless-hospitals"
        columns={[
          { key: 'name', label: 'Hospital Name' },
          { key: 'address', label: 'Address' },
          { key: 'city', label: 'City' },
          { key: 'state', label: 'State' },
          { key: 'pin', label: 'PIN' },
        ]}
        rows={state ? D.hospitals.filter((h) => h.state === state) : D.hospitals}
      />
    </Panel>
  );
}

export const EscalationCards = () => (
  <div className="pw-cards three">
    {D.escalation.map((e, i) => (
      <div key={e.level} className="pw-esc">
        <span className={`pw-level l${i + 1}`}>{e.level}</span>
        <strong>{e.name}</strong>
        <p>{e.role}</p>
        <a href={`tel:${e.phone}`}><Phone size={14} /> {e.phone}</a>
        <a href={`mailto:${e.email}`}><Mail size={14} /> {e.email}</a>
        <small>Response: {e.tat}</small>
      </div>
    ))}
  </div>
);

export const FeatureGrid = () => (
  <div className="pw-cards two">
    {D.policyFeatures.map((g) => (
      <Panel key={g.group} title={g.group}>
        <dl className="pw-dl">
          {g.items.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </Panel>
    ))}
  </div>
);

const Documents = () => (
  <Panel title="Documents & certificates">
    <ul className="pw-files">
      {D.hrDocuments.map((d) => (
        <li key={d.name}>
          <span className="pw-file-icon">{d.type}</span>
          <div><strong>{d.name}</strong><small>{d.size} · {d.date}</small></div>
          <button className="pw-btn" onClick={demo(`${d.name} downloaded`)}><Download size={15} /> Download</button>
        </li>
      ))}
    </ul>
  </Panel>
);

function CdStatement() {
  const credit = D.cdEntries.reduce((a, b) => a + b.credit, 0);
  const debit = D.cdEntries.reduce((a, b) => a + b.debit, 0);
  const opening = D.cdOpening.reduce((a, b) => a + b.amount, 0);
  return (
    <>
      <StatStrip items={[
        { icon: Wallet, label: 'Opening balance', value: inr(opening) },
        { icon: Receipt, label: 'Total credit', value: inr(credit) },
        { icon: Receipt, label: 'Total debit', value: inr(debit) },
        { icon: Wallet, label: 'Balance amount', value: inr(opening + credit - debit) },
      ]} />
      <Panel title="Opening balance">
        <DataTable exportName="cd-opening" pageSizes={[5, 10]}
          columns={[
            { key: 'particular', label: 'Particular' }, { key: 'cdNumber', label: 'CD Number' },
            { key: 'bank', label: 'Bank Name' }, { key: 'cheque', label: 'Cheque Number' },
            { label: 'Amount', render: (r) => inr(r.amount) }, { key: 'created', label: 'Created At' },
          ]}
          rows={D.cdOpening} />
      </Panel>
      <Panel title="Premium entry">
        <DataTable exportName="cd-premium-entry" pageSizes={[5, 10]}
          columns={[
            { key: 'particular', label: 'Particular' }, { key: 'type', label: 'Policy Type' },
            { key: 'policy', label: 'Policy Number' }, { key: 'endorsement', label: 'Endorsement No' },
            { key: 'emp', label: 'Emp Count' }, { key: 'dep', label: 'Dep Count' },
            { label: 'Debit (DR)', render: (r) => (r.debit ? inr(r.debit) : '-') },
            { label: 'Credit (CR)', render: (r) => (r.credit ? inr(r.credit) : '-') },
            { key: 'created', label: 'Created At' },
          ]}
          rows={D.cdEntries} />
      </Panel>
    </>
  );
}

const EmployeeDirectory = () => (
  <Panel title="Employees" subtitle="Employee master for this organisation">
    <DataTable
      exportName="employees"
      columns={[
        { key: 'empId', label: 'Employee ID' }, { key: 'name', label: 'Name' },
        { key: 'dept', label: 'Department' }, { key: 'doj', label: 'Date of Joining' },
        { key: 'mobile', label: 'Mobile' }, { key: 'email', label: 'Email' },
        { label: 'Status', render: () => <Badge status="Active" /> },
      ]}
      rows={D.hrEmployees}
    />
  </Panel>
);

function EndorsementCalc() {
  const [type, setType] = useState('Addition');
  const [premium, setPremium] = useState(78549);
  const [date, setDate] = useState('2026-09-01');
  const start = new Date('2026-06-04');
  const end = new Date('2027-06-03');
  const total = Math.round((end - start) / 86400000) + 1;
  const left = Math.max(0, Math.min(total, Math.round((end - new Date(date)) / 86400000) + 1));
  const amount = Math.round((Number(premium) * left) / total);
  return (
    <div className="pw-cards two">
      <Panel title="Endorsement calculator" subtitle="Pro-rata premium for adding or deleting a life">
        <div className="pw-form single">
          <label>Endorsement type<select value={type} onChange={(e) => setType(e.target.value)}><option>Addition</option><option>Deletion</option></select></label>
          <label>Annual premium per life (₹)<input type="number" min="0" value={premium} onChange={(e) => setPremium(e.target.value)} /></label>
          <label>Effective date<input type="date" min="2026-06-04" max="2027-06-03" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        </div>
      </Panel>
      <Panel title="Result">
        <dl className="pw-dl">
          <div><dt>Policy period</dt><dd>{D.policy.start} to {D.policy.end}</dd></div>
          <div><dt>Days in policy</dt><dd>{total}</dd></div>
          <div><dt>Days remaining</dt><dd>{left}</dd></div>
          <div><dt>{type === 'Addition' ? 'Additional premium (debit)' : 'Refund (credit)'}</dt><dd className="pw-big">{inr(amount)}</dd></div>
        </dl>
      </Panel>
    </div>
  );
}

/* ---------------- REPORTS ---------------- */
const pdfBtn = <button className="pw-btn solid" onClick={() => window.print()}>Generate PDF</button>;
const slices = (arr, key = 'count') => arr.map((a) => ({ label: a.label, value: a[key], color: a.color }));

function Reports() {
  const [tab, setTab] = useState('Claims Report');
  return (
    <>
      <Tabs tabs={['Claims Report', 'Demography Report', 'Top Ten Claims', 'Endorsement Analysis']} value={tab} onChange={setTab} />
      <div className="pw-actions-row">{pdfBtn}</div>

      {tab === 'Claims Report' && (
        <div className="pw-cards two">
          <Panel title="Age wise"><DonutChart items={slices(D.claimAgeWise)} centerLabel="Claims" centerValue="3" format={(v) => `${v}`} /></Panel>
          <Panel title="Gender wise"><DonutChart items={slices(D.claimGender)} centerLabel="Claims" centerValue="3" format={(v) => `${v}`} /></Panel>
          <Panel title="Claim amount by age" className="span-2">
            <DataTable exportName="claims-age-wise" pageSizes={[5, 10]}
              columns={[
                { key: 'label', label: 'Age' }, { key: 'count', label: 'Count' },
                { label: 'Amount', render: (r) => inr(r.amount) },
                { label: 'Percentage', render: (r) => `${((r.count / 3) * 100).toFixed(2)}%` },
              ]} rows={D.claimAgeWise} />
          </Panel>
        </div>
      )}

      {tab === 'Demography Report' && (
        <div className="pw-cards two">
          <Panel title="Gender"><DonutChart items={D.demographyGender} centerLabel="Lives" centerValue="4" /></Panel>
          <Panel title="Age bands">
            <ul className="pw-bars">
              {D.demographyAge.map((a) => (
                <li key={a.label}><span>{a.label}</span><i><b style={{ width: `${(a.value / 2) * 100}%` }} /></i><em>{a.value}</em></li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {tab === 'Top Ten Claims' && (
        <>
          <div className="pw-cards two">
            <Panel title="Top 10 reported hospital claim amount"><DonutChart items={D.topHospitalsReported} centerLabel="Reported" centerValue="₹1.14L" format={inr} /></Panel>
            <Panel title="Top 10 reported hospital paid claim amount"><DonutChart items={D.topHospitalsPaid} centerLabel="Paid" centerValue="₹31.5k" format={inr} /></Panel>
          </div>
          <Panel title="Hospital wise">
            <DataTable exportName="top-hospitals" pageSizes={[5, 10]}
              columns={[
                { key: 'label', label: 'Hospital' },
                { label: 'Reported amount', render: (r) => inr(r.value) },
                { label: 'Paid amount', render: (r) => inr(D.topHospitalsPaid.find((p) => p.label === r.label)?.value ?? 0) },
              ]} rows={D.topHospitalsReported} />
          </Panel>
        </>
      )}

      {tab === 'Endorsement Analysis' && (
        <Panel title="Endorsement analysis">
          <DataTable exportName="endorsement-analysis"
            columns={[
              { key: 'type', label: 'Type' }, { key: 'lives', label: 'Lives' },
              { label: 'Premium', render: (r) => inr(r.premium) }, { key: 'effective', label: 'Effective Date' },
              { label: 'Status', render: (r) => <Badge status={r.status} /> },
            ]} rows={D.endorsementAnalysis} />
        </Panel>
      )}
    </>
  );
}

function Summary() {
  const p = D.premiumSummary;
  return (
    <>
      <div className="pw-actions-row">{pdfBtn}</div>
      <Panel title={D.policy.company}>
        <table className="pw-summary">
          <tbody>
            <tr><th>Insurance Company</th><td colSpan={5}>{D.policy.insurer}</td></tr>
            <tr><th>TPA Name</th><td colSpan={5}>{D.policy.tpa}</td></tr>
            <tr><th>Policy No</th><td>{D.policy.number}</td><th>Policy Period</th><td colSpan={3}>{D.policy.start} to {D.policy.end}</td></tr>
            <tr className="head"><th rowSpan={2}>Premium Summary</th><th>Inception Premium</th><th>Additional Premium</th><th>Deletion Premium</th><th>Net Premium</th><th>Active Lives</th></tr>
            <tr><td>{inr(p.inception)}</td><td>{inr(p.additional)}</td><td>{inr(p.deletion)}</td><td>{inr(p.net)}</td><td>{p.activeLives}</td></tr>
          </tbody>
        </table>
        <table className="pw-summary">
          <thead><tr><th colSpan={5}>Enrollment Summary</th></tr><tr className="head"><th>Lives</th><th>Inception</th><th>Additional</th><th>Deletion</th><th>Active</th></tr></thead>
          <tbody>
            <tr><td>Employee</td><td>3</td><td>1</td><td>0</td><td>4</td></tr>
            <tr className="tot"><td>Total</td><td>3</td><td>1</td><td>0</td><td>4</td></tr>
          </tbody>
        </table>
        <table className="pw-summary">
          <thead><tr><th colSpan={4}>Claim Ratio (%) Summary</th></tr><tr className="head"><th>Claims Reported</th><th>Claims Paid</th><th>Under Process</th><th>Claim Ratio / Incurred</th></tr></thead>
          <tbody><tr><td>{D.claimsStrip.reported.count} ({inr(D.claimsStrip.reported.amount)})</td><td>{D.claimsStrip.paid.count} ({inr(D.claimsStrip.paid.amount)})</td><td>{D.claimsStrip.process.count} ({inr(D.claimsStrip.process.amount)})</td><td>{D.claimRatio.claim}% / {D.claimRatio.incurred}%</td></tr></tbody>
        </table>
      </Panel>
    </>
  );
}

/* ---------------- ROUTER ---------------- */
export const hrModules = {
  enrollment: { title: 'Enrollment', description: 'Employee and dependent enrollment, nominees and bulk upload.', Component: Enrollment },
  requests: { title: 'Employee Requests', description: 'Track requests raised for employees and dependents.', Component: Requests },
  claims: { title: 'Claims', description: 'Claims reporting and claim intimation on behalf of employees.', Component: Claims },
  hospitals: { title: 'Cashless Hospitals', description: 'Hospital network based on your insurer and TPA.', Component: Hospitals },
  escalation: { title: 'Escalation Matrix', description: 'Contact the right person at each escalation level.', Component: EscalationCards },
  features: { title: 'Policy Features', description: 'Coverage terms, limits and waiting periods of your policy.', Component: FeatureGrid },
  documents: { title: 'Documents', description: 'Policy documents, claim forms and lists.', Component: Documents },
  cd: { title: 'CD & Endorsements', description: 'CD statement: premium payments, credits and endorsement debits.', Component: CdStatement },
  employee: { title: 'Employee', description: 'Employee directory for your organisation.', Component: EmployeeDirectory },
  'endorsement-calculation': { title: 'Endorsement Calculation', description: 'Calculate pro-rata premium for additions and deletions.', Component: EndorsementCalc },
  reports: { title: 'Reports', description: 'Claims, demography, hospital and endorsement analytics.', Component: Reports },
  summary: { title: 'Summary', description: 'Key policy, enrollment, premium and claim metrics at a glance.', Component: Summary },
};