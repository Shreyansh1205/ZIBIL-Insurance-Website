import {
  ArrowRight,
  Building2,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { Link } from 'react-router';

import { Navbar } from '../components/Navbar';

import './portal.css';


export default function PortalSelection() {
  return (
    <main className="portal-selection-page">

      <Navbar />

      <section className="portal-selection-hero">

        <div className="portal-selection-copy">

          <span className="portal-kicker">
            <ShieldCheck size={16} />
            ZUARI INSURANCE PORTAL
          </span>

          <h1>
            Choose the portal that fits your journey.
          </h1>

          <p>
            Access your insurance information,
            policies, claims and service support
            through the dedicated Zuari portal
            experience.
          </p>

        </div>


        <div className="portal-choice-grid">

          <Link
            to="/portal/customer/login"
            className="portal-choice-card customer"
          >

            <div className="portal-choice-icon">
              <UserRound size={30} />
            </div>

            <div>

              <span className="portal-choice-label">
                FOR INDIVIDUAL POLICYHOLDERS
              </span>

              <h2>
                Customer Portal
              </h2>

              <p>
                Manage your policies, renewals,
                claims, documents, payments and
                service requests in one place.
              </p>

            </div>

            <span className="portal-choice-action">
              Continue
              <ArrowRight size={18} />
            </span>

          </Link>


          <Link
            to="/portal/corporate/login"
            className="portal-choice-card corporate"
          >

            <div className="portal-choice-icon">
              <Building2 size={30} />
            </div>

            <div>

              <span className="portal-choice-label">
                FOR ORGANIZATIONS & BUSINESSES
              </span>

              <h2>
                Corporate Portal
              </h2>

              <p>
                Manage employee benefits,
                policy portfolios, members,
                claims, renewals and reports.
              </p>

            </div>

            <span className="portal-choice-action">
              Continue
              <ArrowRight size={18} />
            </span>

          </Link>

        </div>


        <div className="portal-demo-strip">
          Client presentation mode · Demo credentials
          are enabled for this prototype.
        </div>

      </section>

    </main>
  );
}