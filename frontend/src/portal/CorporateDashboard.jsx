import { Link } from 'react-router';
import {
  ArrowRight, Building2, CalendarDays, FileText, HeartPulse, Receipt, ShieldCheck, Users, Wallet,
} from 'lucide-react';
import PortalShell from './PortalShell';
import KpiCard from '../components/dash/Kpi';
import HealthCard from '../components/dash/HealthCard';
import { DonutChart } from '../components/dash/Charts';
import { InfoCards, Panel, StatStrip, inr } from './PortalWidgets';
import * as D from './hrEmployeeData';

/* HR PORTAL: Policy Dashboard (see HR Portal PPT) */
export default function CorporateDashboard() {
  const p = D.premiumSummary;
  return (
    <PortalShell type="corporate">
      <div className="portal-page-header">
        <div>
          <span className="portal-eyebrow">HR PORTAL</span>
          <h1>Policy Dashboard</h1>
          <p>Centralised view of your employee benefit policy: premium, members, claims and utilisation.</p>
        </div>
        <Link to="/corporate/summary" className="portal-primary-button">Open summary <ArrowRight size={16} /></Link>
      </div>

      <div className="pw-tabs"><button className="on">{D.policy.type} · {D.policy.number}</button></div>

      <InfoCards items={[
        { icon: Building2, label: 'Insurer Name', value: D.policy.insurer },
        { icon: FileText, label: 'Policy Number', value: D.policy.number },
        { icon: CalendarDays, label: 'Policy Period', value: `${D.policy.start} to ${D.policy.end}` },
        { icon: ShieldCheck, label: 'TPA', value: D.policy.tpa },
      ]} />

      <div className="portal-kpi-grid">
        <KpiCard icon={Wallet} label="Net premium" value={p.net} prefix="₹" trend="Policy year" direction="flat" tone="gold" detail="Inception + additions - deletions" spark={[60, 70, 78, 80, 80, 80]} />
        <KpiCard icon={Users} label="Active employees" value={4} trend="+1 addition" tone="teal" detail="3 at inception" spark={[3, 3, 3, 4, 4, 4]} />
        <KpiCard icon={HeartPulse} label="Reported claims" value={D.claimsStrip.reported.count} trend="1 in process" direction="flat" tone="amber" detail={inr(D.claimsStrip.reported.amount)} spark={[0, 1, 1, 2, 3, 3]} />
        <KpiCard icon={Receipt} label="CD balance" value={11453} prefix="₹" trend="Low balance" direction="down" tone="rose" detail="Top up to avoid endorsement delay" spark={[80, 70, 40, 20, 12, 11]} />
      </div>

      <HealthCard
        eyebrow="Policy utilisation"
        score={98}
        headline="Claims are well below premium"
        copy={`Claim ratio is ${D.claimRatio.claim}% and incurred claim ratio is ${D.claimRatio.incurred}%. Your CD balance is low; add funds before the next endorsement.`}
        factors={[
          { label: 'Premium retained', value: 98, color: '#35d6c4' },
          { label: 'Members enrolled', value: 100, color: '#6aa8ff' },
          { label: 'CD balance health', value: 12, color: '#d8b26a' },
        ]}
        action={<Link to="/corporate/cd" className="health-cta">View CD statement <ArrowRight size={15} /></Link>}
      />

      <div className="pw-cards three">
        <Panel title="Premium analysis">
          <DonutChart
            items={[
              { label: 'Inception', value: p.inception, color: '#2f7bff' },
              { label: 'Additional', value: p.additional, color: '#35d6c4' },
            ]}
            centerLabel="Total premium" centerValue="₹79.9L" format={inr}
          />
        </Panel>
        <Panel title="Claim ratio">
          <DonutChart
            items={[
              { label: 'Claim ratio', value: D.claimRatio.claim, color: '#e5566d' },
              { label: 'Incurred claim ratio', value: D.claimRatio.incurred, color: '#19b9a6' },
            ]}
            centerLabel="Incurred" centerValue={`${D.claimRatio.incurred}%`} format={(v) => `${v}%`}
          />
        </Panel>
        <Panel title="Active employees">
          <StatStrip items={[{ icon: Users, label: 'Active employees', value: 4 }]} />
          <ul className="pw-bars plain">
            <li><span>Inception employees</span><em>3</em></li>
            <li><span>Addition employees</span><em>1</em></li>
            <li><span>Deletion employees</span><em>0</em></li>
          </ul>
        </Panel>
      </div>
    </PortalShell>
  );
}