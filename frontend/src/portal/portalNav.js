import {
  BarChart3,
  Calculator,
  ClipboardList,
  FileDown,
  FileText,
  FolderOpen,
  HeartPulse,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  MapPin,
  Network,
  Receipt,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react';


/* =========================================================
   EMPLOYEE PORTAL (path prefix: /customer, kept so existing
   login, route guards and demo auth keep working)
========================================================= */
export const customerNav = [
  { label: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
  { label: 'Policy Details', path: '/customer/policy-details', icon: ShieldCheck },
  { label: 'My Coverages', path: '/customer/coverages', icon: ListChecks },
  { label: 'Members Covered', path: '/customer/members', icon: Users },
  { label: 'Escalation Matrix', path: '/customer/escalation', icon: Network },
  { label: 'Network Hospital', path: '/customer/hospitals', icon: MapPin },
  { label: 'Download Forms', path: '/customer/forms', icon: FileDown },
  { label: 'Claim Status', path: '/customer/claim-status', icon: HeartPulse },
  { label: 'Intimate My Claim', path: '/customer/intimate-claim', icon: LifeBuoy },
  { label: 'Wellness (Medibhai)', path: '/customer/wellness', icon: Sparkles },
];


/* =========================================================
   HR PORTAL (path prefix: /corporate)
========================================================= */
export const corporateNav = [
  { label: 'Dashboard', path: '/corporate/dashboard', icon: LayoutDashboard },
  { label: 'Enrollment', path: '/corporate/enrollment', icon: UserPlus },
  { label: 'Employee Requests', path: '/corporate/requests', icon: ClipboardList },
  { label: 'Claims', path: '/corporate/claims', icon: HeartPulse },
  { label: 'Cashless Hospitals', path: '/corporate/hospitals', icon: MapPin },
  { label: 'Escalation Matrix', path: '/corporate/escalation', icon: Network },
  { label: 'Policy Features', path: '/corporate/features', icon: ScrollText },
  { label: 'Documents', path: '/corporate/documents', icon: FolderOpen },
  { label: 'CD & Endorsements', path: '/corporate/cd', icon: Receipt },
  { label: 'Employee', path: '/corporate/employee', icon: UserRound },
  { label: 'Endorsement Calculation', path: '/corporate/endorsement-calculation', icon: Calculator },
  { label: 'Reports', path: '/corporate/reports', icon: BarChart3 },
  { label: 'Summary', path: '/corporate/summary', icon: FileText },
];  