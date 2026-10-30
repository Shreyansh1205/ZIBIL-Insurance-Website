import { Construction } from 'lucide-react';
import { useParams } from 'react-router';
import PortalShell from './PortalShell';
import { hrModules } from './HrModules';
import { employeeModules } from './EmployeeModules';


export default function PortalModulePage({ type }) {
  const { module } = useParams();
  const corporate = type === 'corporate';
  const moduleData = (corporate ? hrModules : employeeModules)[module];

  if (!moduleData) {
    return (
      <PortalShell type={type}>
        <div className="portal-empty-state">
          <Construction size={40} />
          <h1>Module not found</h1>
          <p>The requested portal section does not exist.</p>
        </div>
      </PortalShell>
    );
  }

  const { Component } = moduleData;

  return (
    <PortalShell type={type}>
      <div className="portal-page-header">
        <div>
          <span className="portal-eyebrow">{corporate ? 'HR PORTAL' : 'EMPLOYEE PORTAL'}</span>
          <h1>{moduleData.title}</h1>
          <p>{moduleData.description}</p>
        </div>
      </div>

      <div className="pw-page">
        <Component />
      </div>
    </PortalShell>
  );
}