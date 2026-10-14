import {
  ArrowLeft,
  Construction,
  FileText,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router';

import PortalShell from './PortalShell';


const customerModules = {
  policies: {
    title: 'My Policies',
    description:
      'View and manage all your active and historical insurance policies.',
  },

  renewals: {
    title: 'Renewals Due',
    description:
      'Track upcoming policy renewals and avoid coverage gaps.',
  },

  claims: {
    title: 'Claims Status',
    description:
      'Track the progress of your insurance claims.',
  },

  documents: {
    title: 'Documents & Certificates',
    description:
      'Access policy documents, certificates and insurance records.',
  },

  payments: {
    title: 'Premium & Payments',
    description:
      'Review premium payments and payment history.',
  },

  nominees: {
    title: 'Nominee Details',
    description:
      'Review and manage nominee information.',
  },

  requests: {
    title: 'Service Requests',
    description:
      'Raise and track requests with the Zuari service team.',
  },
};


const corporateModules = {
  policies: {
    title: 'Policy Portfolio',
    description:
      'View your organizations complete insurance portfolio.',
  },

  benefits: {
    title: 'Employee Benefits',
    description:
      'Manage employee insurance benefit programs.',
  },

  members: {
    title: 'Members Management',
    description:
      'Manage employees, dependents and covered members.',
  },

  claims: {
    title: 'Claims Management',
    description:
      'Review and manage employee claims.',
  },

  endorsements: {
    title: 'Endorsements & Changes',
    description:
      'Submit and track policy changes and endorsements.',
  },

  renewals: {
    title: 'Renewal Calendar',
    description:
      'Track upcoming corporate policy renewals.',
  },

  premium: {
    title: 'Premium Summary',
    description:
      'Review premium costs and payment information.',
  },

  reports: {
    title: 'Reports & Analytics',
    description:
      'View portfolio reports and performance insights.',
  },

  documents: {
    title: 'Documents & Certificates',
    description:
      'Access corporate policy documents and certificates.',
  },

  requests: {
    title: 'Service Requests',
    description:
      'Raise and track corporate service requests.',
  },

  communications: {
    title: 'Communication Center',
    description:
      'Manage important insurance communications.',
  },

  'relationship-manager': {
    title: 'Relationship Manager',
    description:
      'Connect with your dedicated Zuari relationship manager.',
  },
};


export default function PortalModulePage({
  type,
}) {

  const { module } = useParams();

  const navigate = useNavigate();


  const moduleData =
    type === 'corporate'
      ? corporateModules[module]
      : customerModules[module];


  if (!moduleData) {

    return (
      <PortalShell type={type}>

        <div className="portal-empty-state">

          <Construction size={40} />

          <h1>
            Module not found
          </h1>

          <p>
            The requested portal section
            does not exist.
          </p>

        </div>

      </PortalShell>
    );
  }


  return (
    <PortalShell type={type}>

      <div className="portal-page-header">

        <div>

          <span className="portal-eyebrow">
            {type === 'corporate'
              ? 'CORPORATE PORTAL'
              : 'CUSTOMER PORTAL'}
          </span>

          <h1>
            {moduleData.title}
          </h1>

          <p>
            {moduleData.description}
          </p>

        </div>

      </div>


      <section className="portal-module-placeholder">

        <div className="portal-module-placeholder-icon">
          <FileText size={30} />
        </div>

        <h2>
          Module ready for client-demo data
        </h2>

        <p>
          This section is intentionally prepared
          as the next functional layer. We can
          connect the real policy, claim, member
          and document data here later.
        </p>

        <button
          onClick={() =>
            navigate(
              type === 'corporate'
                ? '/corporate/dashboard'
                : '/customer/dashboard'
            )
          }
          className="portal-secondary-button"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

      </section>

    </PortalShell>
  );
}