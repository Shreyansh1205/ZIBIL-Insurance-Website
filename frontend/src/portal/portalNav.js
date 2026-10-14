import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  FileText,
  FolderOpen,
  HeartPulse,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Network,
  Receipt,
  RefreshCcw,
  ShieldCheck,
  Users,
  UserRound,
} from 'lucide-react';


export const customerNav = [
  {
    label: 'Dashboard',
    path: '/customer/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Policies',
    path: '/customer/policies',
    icon: ShieldCheck,
  },
  {
    label: 'Renewals Due',
    path: '/customer/renewals',
    icon: RefreshCcw,
  },
  {
    label: 'Claims Status',
    path: '/customer/claims',
    icon: HeartPulse,
  },
  {
    label: 'Documents & Certificates',
    path: '/customer/documents',
    icon: FileText,
  },
  {
    label: 'Premium & Payments',
    path: '/customer/payments',
    icon: CreditCard,
  },
  {
    label: 'Nominee Details',
    path: '/customer/nominees',
    icon: Users,
  },
  {
    label: 'Service Requests',
    path: '/customer/requests',
    icon: LifeBuoy,
  },
];


export const corporateNav = [
  {
    label: 'Dashboard',
    path: '/corporate/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Policy Portfolio',
    path: '/corporate/policies',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Employee Benefits',
    path: '/corporate/benefits',
    icon: Users,
  },
  {
    label: 'Members Management',
    path: '/corporate/members',
    icon: UserRound,
  },
  {
    label: 'Claims Management',
    path: '/corporate/claims',
    icon: HeartPulse,
  },
  {
    label: 'Endorsements & Changes',
    path: '/corporate/endorsements',
    icon: FileCheck2,
  },
  {
    label: 'Renewal Calendar',
    path: '/corporate/renewals',
    icon: CalendarDays,
  },
  {
    label: 'Premium Summary',
    path: '/corporate/premium',
    icon: Receipt,
  },
  {
    label: 'Reports & Analytics',
    path: '/corporate/reports',
    icon: BarChart3,
  },
  {
    label: 'Documents & Certificates',
    path: '/corporate/documents',
    icon: FolderOpen,
  },
  {
    label: 'Service Requests',
    path: '/corporate/requests',
    icon: LifeBuoy,
  },
  {
    label: 'Communication Center',
    path: '/corporate/communications',
    icon: MessageSquare,
  },
  {
    label: 'Relationship Manager',
    path: '/corporate/relationship-manager',
    icon: Network,
  },
];