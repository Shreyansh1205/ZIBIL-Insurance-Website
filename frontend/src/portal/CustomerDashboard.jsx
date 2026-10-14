import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CreditCard,
  FileText,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';

import { Link } from 'react-router';

import PortalShell from './PortalShell';
import KpiCard from '../components/dash/Kpi';
import HealthCard from '../components/dash/HealthCard';
import { DonutChart } from '../components/dash/Charts';

import { customerDemoData } from './demoData';


function StatusBadge({ status }) {
  const className =
    status.toLowerCase().replace(/\s+/g, '-');

  return (
    <span
      className={`portal-status-badge ${className}`}
    >
      {status}
    </span>
  );
}


export default function CustomerDashboard() {

  const data = customerDemoData;

  const money = (v) => Number(String(v).replace(/[^0-9]/g, ''));
  const totalPremium = data.policies.reduce((sum, p) => sum + money(p.premium), 0);
  const nextRenewal = [...data.policies].sort((a, b) => new Date(a.renewal) - new Date(b.renewal))[0];
  const daysToRenewal = Math.max(0, Math.ceil((new Date(nextRenewal.renewal) - new Date()) / 86400000));
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const premiumMix = data.policies.map((p, i) => ({
    label: p.type.replace(' Insurance', ''),
    value: money(p.premium),
    color: ['#2f7bff', '#35d6c4', '#d8b26a'][i % 3],
  }));

  return (
     <PortalShell
      type="customer"
    >

      <div className="portal-page-header">

        <div>
          <span className="portal-eyebrow">
            CUSTOMER PORTAL
          </span>

          <h1>
            {greeting}, {data.name.split(' ')[0]}.
          </h1>

          <p>
            Here's a clear view of your insurance
            portfolio and everything that needs
            your attention.
          </p>
        </div>

        <Link
          to="/customer/requests"
          className="portal-primary-button"
        >
          Get Assistance
          <ArrowUpRight size={17} />
        </Link>

      </div>


      {/* KPIs */}

      <div className="portal-kpi-grid">
        <KpiCard icon={ShieldCheck} label="Active policies" value={data.policies.length} trend="All in force" direction="flat" tone="blue" detail="Health, motor, life" spark={[1, 2, 2, 3, 3, 3]} />
        <KpiCard icon={HeartPulse} label="Open claims" value={data.claims.length} trend="1 in review" direction="flat" tone="amber" detail="Last update 21 Aug" spark={[0, 1, 1, 2, 2, 2]} />
        <KpiCard icon={CreditCard} label="Annual premium" value={totalPremium} prefix="₹" trend="Paid up" tone="teal" detail="Across 3 policies" spark={[52, 58, 61, 70, 74, 79]} />
        <KpiCard icon={CalendarDays} label="Next renewal" value={daysToRenewal} suffix=" days" trend={nextRenewal.renewal.slice(0, 6)} direction="down" tone="rose" detail={nextRenewal.type} spark={[40, 32, 26, 20, 14, daysToRenewal]} />
      </div>

      <HealthCard
        eyebrow="Protection score"
        score={86}
        headline="Your cover is in good shape"
        copy="Health and motor are active. Review your life cover amount at the January renewal to keep pace with your family's needs."
        factors={[
          { label: 'Health cover', value: 92, color: '#35d6c4' },
          { label: 'Motor cover', value: 88, color: '#6aa8ff' },
          { label: 'Life cover', value: 78, color: '#d8b26a' },
        ]}
        action={<Link to="/customer/requests" className="health-cta">Talk to your advisor <ArrowUpRight size={15} /></Link>}
      />


      <div className="portal-dashboard-grid">

        {/* POLICIES */}

        <section className="portal-panel portal-panel-large">

          <div className="portal-panel-header">

            <div>
              <span className="portal-eyebrow">
                INSURANCE PORTFOLIO
              </span>

              <h2>
                My Policies
              </h2>
            </div>

            <Link to="/customer/policies">
              View all
              <ChevronRight size={16} />
            </Link>

          </div>


          <div className="portal-table-wrap">

            <table className="portal-table">

              <thead>
                <tr>
                  <th>Policy</th>
                  <th>Insurer</th>
                  <th>Status</th>
                  <th>Renewal</th>
                  <th />
                </tr>
              </thead>

              <tbody>

                {data.policies.map((policy) => (
                  <tr key={policy.id}>

                    <td>
                      <div className="portal-policy-name">
                        <div>
                          <ShieldCheck size={16} />
                        </div>

                        <span>
                          <strong>
                            {policy.type}
                          </strong>

                          <small>
                            {policy.id}
                          </small>
                        </span>
                      </div>
                    </td>

                    <td>
                      {policy.insurer}
                    </td>

                    <td>
                      <StatusBadge
                        status={policy.status}
                      />
                    </td>

                    <td>
                      {policy.renewal}
                    </td>

                    <td>
                      <button className="portal-row-action">
                        <ChevronRight size={17} />
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* CLAIMS */}

        <section className="portal-panel">

          <div className="portal-panel-header">

            <div>
              <span className="portal-eyebrow">
                CLAIM ACTIVITY
              </span>

              <h2>
                Recent Claims
              </h2>
            </div>

            <Link to="/customer/claims">
              All
              <ChevronRight size={16} />
            </Link>

          </div>


          <div className="portal-activity-list">

            {data.claims.map((claim) => (
              <div
                className="portal-activity-item"
                key={claim.id}
              >

                <div className="portal-activity-icon">
                  <HeartPulse size={17} />
                </div>

                <div className="portal-activity-copy">

                  <strong>
                    {claim.type}
                  </strong>

                  <span>
                    {claim.id} · {claim.date}
                  </span>

                </div>

                <StatusBadge
                  status={claim.status}
                />

              </div>
            ))}

          </div>

        </section>


        {/* PREMIUM MIX */}

        <section className="portal-panel">
          <div className="portal-panel-header">
            <div>
              <span className="portal-eyebrow">PREMIUM SPLIT</span>
              <h2>Where your premium goes</h2>
            </div>
          </div>
          <DonutChart
            items={premiumMix}
            centerLabel="Annual premium"
            centerValue={`₹${(totalPremium / 1000).toFixed(1)}k`}
            format={(v) => `₹${v.toLocaleString('en-IN')}`}
          />
        </section>


        {/* QUICK ACTIONS */}

        <section className="portal-panel">

          <div className="portal-panel-header">

            <div>
              <span className="portal-eyebrow">
                QUICK ACCESS
              </span>

              <h2>
                Useful Actions
              </h2>
            </div>

          </div>


          <div className="portal-quick-actions">

            <Link to="/customer/documents">
              <FileText size={19} />
              <span>
                <strong>
                  Download documents
                </strong>
                <small>
                  Policies & certificates
                </small>
              </span>
              <ChevronRight size={17} />
            </Link>

            <Link to="/customer/payments">
              <CreditCard size={19} />
              <span>
                <strong>
                  View payments
                </strong>
                <small>
                  Premium history
                </small>
              </span>
              <ChevronRight size={17} />
            </Link>

            <Link to="/customer/requests">
              <HeartPulse size={19} />
              <span>
                <strong>
                  Raise a request
                </strong>
                <small>
                  Get help from Zuari
                </small>
              </span>
              <ChevronRight size={17} />
            </Link>

          </div>

        </section>

      </div>

    </PortalShell>
  );
}