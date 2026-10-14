import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  HeartPulse,
  ShieldCheck,
  Users,
  AlertTriangle,
} from 'lucide-react';

import { Link } from 'react-router';
import PortalShell from './PortalShell';
import KpiCard from '../components/dash/Kpi';
import HealthCard from '../components/dash/HealthCard';
import { AreaChart } from '../components/dash/Charts';
import './portal.css';

const policies = [
  {
    name: 'Group Health Insurance',
    id: 'CORP-POL-001',
    insurer: 'ICICI Lombard',
    members: '1,240',
    renewal: '15 Nov 2026',
    premium: '₹48.6L',
    status: 'Active',
  },
  {
    name: 'Group Mediclaim',
    id: 'CORP-POL-002',
    insurer: 'Star Health',
    members: '786',
    renewal: '02 Dec 2026',
    premium: '₹31.2L',
    status: 'Active',
  },
  {
    name: 'Group Term Life',
    id: 'CORP-POL-003',
    insurer: 'HDFC Life',
    members: '460',
    renewal: '20 Jan 2027',
    premium: '₹18.9L',
    status: 'Active',
  },
  {
    name: 'Personal Accident',
    id: 'CORP-POL-004',
    insurer: 'Bajaj Allianz',
    members: '318',
    renewal: '14 Feb 2027',
    premium: '₹9.4L',
    status: 'Active',
  },
];

const claims = [
  {
    type: 'Hospitalisation',
    employee: 'Employee #10241',
    date: '28 Aug 2026',
    status: 'In Review',
    tone: 'warning',
  },
  {
    type: 'Day Care',
    employee: 'Employee #10197',
    date: '25 Aug 2026',
    status: 'Approved',
    tone: 'success',
  },
  {
    type: 'Hospitalisation',
    employee: 'Employee #10142',
    date: '18 Aug 2026',
    status: 'Settled',
    tone: 'success',
  },
  {
    type: 'Pharmacy',
    employee: 'Employee #10086',
    date: '12 Aug 2026',
    status: 'Processing',
    tone: 'warning',
  },
];

const monthlyClaims = [42, 56, 49, 71, 64, 82, 76, 91, 86, 102, 94, 112];

const monthlyPremium = [
  31,
  36,
  34,
  42,
  39,
  47,
  44,
  52,
  49,
  58,
  55,
  63,
];

function ClaimsChart() {
  const approved = monthlyClaims.map((v) => Math.round(v * 0.89));
  return (
    <>
      <div className="portal-panel-header">
        <div className="portal-panel-title">
          <h2>Claims volume</h2>
          <p>Raised versus approved, last 12 months</p>
        </div>
      </div>
      <AreaChart
        series={[
          { name: 'Raised', data: monthlyClaims, color: '#2f7bff' },
          { name: 'Approved', data: approved, color: '#35d6c4' },
        ]}
        format={(v) => `${v} claims`}
      />
    </>
  );
}

function PremiumChart() {
  return (
    <>
      <div className="portal-panel-header">
        <div className="portal-panel-title">
          <h2>Premium collected</h2>
          <p>Monthly premium in ₹ lakh</p>
        </div>
      </div>
      <AreaChart
        width={420}
        height={260}
        labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
        series={[{ name: 'Premium', data: monthlyPremium, color: '#d8b26a' }]}
        format={(v) => `₹${v}L`}
      />
    </>
  );
}


export default function CorporateDashboard() {
  return (
     <PortalShell type="corporate">
        <div className="corporate-dashboard">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="portal-page-header">
          <div className="portal-page-header-copy">

            <div className="portal-eyebrow">
              <Building2 size={13} />
              CORPORATE PORTAL
            </div>

            <h1>
              Corporate Benefits Overview
            </h1>

            <p>
              Monitor your organisation's insurance
              portfolio, employee coverage, claims
              and upcoming renewals from one
              intelligent workspace.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '9px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/corporate/reports"
              className="portal-header-action"
            >
              <BarChart3 size={15} />
              View Reports
            </Link>

            <Link
              to="/corporate/relationship-manager"
              className="portal-button secondary"
            >
              Relationship Manager
              <ArrowRight size={14} />
            </Link>
          </div>
        </header>


        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <section className="portal-kpi-grid">
          <KpiCard icon={ShieldCheck} label="Total policies" value={12} trend="+8.4%" trendLabel="vs last quarter" tone="blue" spark={[8, 9, 9, 10, 11, 12]} />
          <KpiCard icon={Users} label="Covered employees" value={2486} trend="+12.2%" trendLabel="94% active coverage" tone="teal" spark={[1900, 2050, 2150, 2260, 2390, 2486]} />
          <KpiCard icon={HeartPulse} label="Active claims" value={38} trend="+4.8%" trendLabel="6 currently in review" tone="amber" direction="up" spark={[24, 30, 27, 33, 35, 38]} />
          <KpiCard icon={CalendarDays} label="Renewals due" value={4} trend="2 urgent" trendLabel="within next 90 days" tone="rose" direction="down" spark={[1, 2, 2, 3, 4, 4]} />
        </section>

        <HealthCard
          eyebrow="Portfolio health"
          score={91}
          headline="Cover is strong, two renewals need action"
          copy="Settlement and coverage are above plan. Start the two urgent renewals now to avoid a lapse in group cover."
          factors={[
            { label: 'Claim settlement', value: 89, color: '#35d6c4' },
            { label: 'Employee coverage', value: 94, color: '#6aa8ff' },
            { label: 'Premium collected', value: 92, color: '#d8b26a' },
          ]}
          action={<Link to="/corporate/renewals" className="health-cta">Review renewals <ArrowRight size={15} /></Link>}
        />


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="portal-dashboard-grid">


          {/* ===================================================
              POLICY PORTFOLIO
          =================================================== */}

          <section className="portal-panel">

            <div className="portal-panel-header">

              <div className="portal-panel-title">
                <h2>
                  Active Policy Portfolio
                </h2>

                <p>
                  Current corporate insurance
                  policies
                </p>
              </div>

              <Link
                to="/corporate/policies"
                className="portal-panel-link"
              >
                View portfolio
                <ChevronRight size={14} />
              </Link>

            </div>

            <div className="portal-table-wrapper">

              <table className="portal-table">

                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Insurer</th>
                    <th>Members</th>
                    <th>Premium</th>
                    <th>Renewal</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {policies.map((policy) => (
                    <tr key={policy.id}>

                      <td>
                        <div className="primary-text">
                          {policy.name}
                        </div>

                        <span className="secondary-text">
                          {policy.id}
                        </span>
                      </td>

                      <td>
                        {policy.insurer}
                      </td>

                      <td>
                        <strong>
                          {policy.members}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {policy.premium}
                        </strong>
                      </td>

                      <td>
                        {policy.renewal}
                      </td>

                      <td>
                        <span className="portal-status active">
                          Active
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            <div className="portal-mini-stats">

              <div className="portal-mini-stat">
                <span>Total Portfolio Value</span>
                <strong>₹108.1L</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Average Coverage</span>
                <strong>₹8.7L</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Portfolio Health</span>
                <strong style={{ color: '#15946a' }}>
                  94.8%
                </strong>
              </div>

            </div>

          </section>


          {/* ===================================================
              CLAIM ACTIVITY
          =================================================== */}

          <section className="portal-panel">

            <div className="portal-panel-header">

              <div className="portal-panel-title">
                <h2>
                  Latest Claims Activity
                </h2>

                <p>
                  Real-time claim movement
                </p>
              </div>

              <Link
                to="/corporate/claims"
                className="portal-panel-link"
              >
                View all
                <ChevronRight size={14} />
              </Link>

            </div>

            <div className="portal-activity">

              {claims.map((claim, index) => (
                <div
                  className={`portal-activity-item ${claim.tone}`}
                  key={index}
                >

                  <div className="portal-activity-icon">

                    {claim.tone === 'warning' ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}

                  </div>

                  <div className="portal-activity-content">

                    <strong>
                      {claim.type}
                    </strong>

                    <p>
                      {claim.employee}
                      {' · '}
                      {claim.date}
                    </p>

                    <span
                      className="portal-status"
                      style={{
                        color:
                          claim.tone ===
                          'success'
                            ? '#13855f'
                            : '#c77b1e',
                        background:
                          claim.tone ===
                          'success'
                            ? '#eaf8f3'
                            : '#fff5e8',
                      }}
                    >
                      {claim.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </section>


          {/* ===================================================
              CLAIMS CHART
          =================================================== */}

          <section className="portal-panel">
            <ClaimsChart />

            <div className="portal-mini-stats">

              <div className="portal-mini-stat">
                <span>Total Claims</span>
                <strong>821</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Settled</span>
                <strong>734</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Settlement Rate</span>
                <strong style={{ color: '#15946a' }}>
                  89.4%
                </strong>
              </div>

            </div>
          </section>


          {/* ===================================================
              PREMIUM CHART
          =================================================== */}

          <section className="portal-panel">
            <PremiumChart />

            <div className="portal-mini-stats">

              <div className="portal-mini-stat">
                <span>YTD Premium</span>
                <strong>₹5.42Cr</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Paid</span>
                <strong>₹4.96Cr</strong>
              </div>

              <div className="portal-mini-stat">
                <span>Outstanding</span>
                <strong style={{ color: '#c77b1e' }}>
                  ₹46L
                </strong>
              </div>

            </div>
          </section>


          {/* ===================================================
              RENEWALS
          =================================================== */}

          <section className="portal-panel">

            <div className="portal-panel-header">

              <div className="portal-panel-title">
                <h2>
                  Renewal Pipeline
                </h2>

                <p>
                  Upcoming policy renewals
                </p>
              </div>

              <Link
                to="/corporate/renewals"
                className="portal-panel-link"
              >
                Calendar
                <ChevronRight size={14} />
              </Link>

            </div>

            <div style={{ padding: '18px 21px' }}>

              {[
                ['Group Health', '15 Nov 2026', '72 days'],
                ['Group Mediclaim', '02 Dec 2026', '89 days'],
                ['Group Term Life', '20 Jan 2027', '138 days'],
              ].map(
                ([name, date, days]) => (
                  <div
                    key={name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '34px 1fr auto',
                      gap: '12px',
                      alignItems: 'center',
                      padding: '13px 0',
                      borderBottom:
                        '1px solid #eef1f4',
                    }}
                  >

                    <div className="portal-activity-icon">
                      <CalendarDays size={15} />
                    </div>

                    <div>
                      <strong
                        style={{
                          display: 'block',
                          color: '#1b2d47',
                          fontSize: '11px',
                        }}
                      >
                        {name}
                      </strong>

                      <span
                        style={{
                          color: '#8f9aaa',
                          fontSize: '9px',
                        }}
                      >
                        {date}
                      </span>
                    </div>

                    <span
                      className="portal-status pending"
                    >
                      {days}
                    </span>

                  </div>
                ),
              )}

            </div>

          </section>


          {/* ===================================================
              QUICK ACTIONS
          =================================================== */}

          <section className="portal-panel">

            <div className="portal-panel-header">

              <div className="portal-panel-title">
                <h2>
                  Quick Actions
                </h2>

                <p>
                  Frequently used tools
                </p>
              </div>

            </div>

            <div className="portal-quick-actions">

              <Link
                to="/corporate/members"
                className="portal-quick-action"
              >
                <Users size={17} />
                Manage Members
              </Link>

              <Link
                to="/corporate/claims"
                className="portal-quick-action"
              >
                <HeartPulse size={17} />
                Review Claims
              </Link>

              <Link
                to="/corporate/documents"
                className="portal-quick-action"
              >
                <FileText size={17} />
                Documents
              </Link>

              <Link
                to="/corporate/reports"
                className="portal-quick-action"
              >
                <Download size={17} />
                Download Reports
              </Link>

            </div>

          </section>

        </div>
</div>
    </PortalShell>
  );
}