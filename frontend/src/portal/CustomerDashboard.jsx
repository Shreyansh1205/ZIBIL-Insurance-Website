import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, CalendarDays, HeartPulse, ShieldCheck, Sparkles, Stethoscope, Users,
} from 'lucide-react';
import PortalShell from './PortalShell';
import KpiCard from '../components/dash/Kpi';
import HealthCard from '../components/dash/HealthCard';
import { usePortalAuth } from '../contexts/portalAuth.context';
import { Badge, Panel, Tabs, inr } from './PortalWidgets';
import * as D from './hrEmployeeData';

const quick = [
  { to: '/customer/members', label: 'Download e-card', sub: 'Cashless card for you and family', icon: Users },
  { to: '/customer/claim-status', label: 'Claim status', sub: 'Track your claims', icon: HeartPulse },
  { to: '/customer/intimate-claim', label: 'Intimate a claim', sub: 'Cashless or reimbursement', icon: ShieldCheck },
  { to: '/customer/wellness', label: 'Wellness benefits', sub: 'Teleconsult, diagnostics, medicines', icon: Sparkles },
];

/* EMPLOYEE PORTAL: Home (see Employee Portal PPT) */
export default function CustomerDashboard() {
  const { user } = usePortalAuth();
  const [label, setLabel] = useState('GMC');
  const p = D.employeePolicies.find((x) => x.label === label);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const first = (user?.name || D.employeeProfile.name).split(' ')[0];
  const daysLeft = Math.max(0, Math.ceil((new Date(p.end.split('-').reverse().join('-')) - new Date()) / 86400000));

  return (
    <PortalShell type="customer">
      <div className="portal-page-header">
        <div>
          <span className="portal-eyebrow">EMPLOYEE PORTAL</span>
          <h1>{greeting}, {first}.</h1>
          <p>All your policies and wellness benefits in one place.</p>
        </div>
        <Link to="/customer/intimate-claim" className="portal-primary-button">Intimate a claim <ArrowRight size={16} /></Link>
      </div>

      <Tabs tabs={D.employeePolicies.map((x) => x.label)} value={label} onChange={setLabel} />

      <div className="portal-kpi-grid">
        <KpiCard icon={ShieldCheck} label={`${p.label} sum insured`} value={p.sumInsured} prefix="₹" trend="In force" direction="flat" tone="blue" detail={p.insurer} spark={[2, 3, 3, 4, 5, 5]} />
        <KpiCard icon={Users} label="Members covered" value={D.members.length} trend="Family floater" direction="flat" tone="teal" detail="Self, spouse, 2 children" spark={[1, 2, 3, 4, 4, 4]} />
        <KpiCard icon={HeartPulse} label="Open claims" value={D.employeeClaims.filter((c) => c.status !== 'Paid').length} trend="1 paid" direction="flat" tone="amber" detail="Last update 10 Sep" spark={[0, 1, 1, 2, 2, 2]} />
        <KpiCard icon={CalendarDays} label="Policy expires in" value={daysLeft} suffix=" days" trend={p.end} direction="down" tone="rose" detail={p.number} spark={[300, 240, 180, 120, 60, daysLeft]} />
      </div>

      <HealthCard
        eyebrow="Your cover"
        score={92}
        headline={`${p.title} is active`}
        copy={`Policy ${p.number} with ${p.insurer}, valid ${p.start} to ${p.end}. Cashless e-cards are ready for all four members.`}
        factors={[
          { label: 'Health cover', value: 92, color: '#35d6c4' },
          { label: 'Accident cover', value: 85, color: '#6aa8ff' },
          { label: 'Life cover', value: 78, color: '#d8b26a' },
        ]}
        action={<Link to="/customer/policy-details" className="health-cta">View policy details <ArrowRight size={15} /></Link>}
      />

      <div className="pw-cards two">
        <Panel title="Recent claims" actions={<Link to="/customer/claim-status" className="pw-link">View all</Link>}>
          <ul className="pw-files">
            {D.employeeClaims.map((c) => (
              <li key={c.claimNo}>
                <span className="pw-file-icon"><Stethoscope size={16} /></span>
                <div><strong>{c.patient}</strong><small>{c.claimNo} · {c.hospital} · {inr(c.amount)}</small></div>
                <Badge status={c.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Quick access">
          <div className="pw-quick">
            {quick.map((q) => (
              <Link key={q.to} to={q.to}>
                <q.icon size={20} />
                <span><strong>{q.label}</strong><small>{q.sub}</small></span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Wellness benefits" subtitle="Powered by Medibhai">
        <div className="pw-chips">
          {D.wellnessChips.map((c) => <Link key={c} to="/customer/wellness">{c}</Link>)}
        </div>
      </Panel>
    </PortalShell>
  );
}