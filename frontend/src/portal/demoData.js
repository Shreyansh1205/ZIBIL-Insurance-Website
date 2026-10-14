export const customerDemoData = {
  name: 'Amit Verma',
  customerId: 'CUST10001',
  email: 'customer@zuari-demo.com',
  phone: '+91 98765 43210',

  policies: [
    {
      id: 'POL-100245',
      type: 'Health Insurance',
      insurer: 'Care Health Insurance',
      status: 'Active',
      premium: '₹24,800',
      renewal: '18 Oct 2026',
      members: 4,
    },
    {
      id: 'POL-100246',
      type: 'Motor Insurance',
      insurer: 'ICICI Lombard',
      status: 'Active',
      premium: '₹18,450',
      renewal: '02 Dec 2026',
      members: 1,
    },
    {
      id: 'POL-100247',
      type: 'Life Insurance',
      insurer: 'HDFC Life',
      status: 'Active',
      premium: '₹36,000',
      renewal: '14 Jan 2027',
      members: 1,
    },
  ],

  claims: [
    {
      id: 'CLM-20481',
      policy: 'POL-100245',
      type: 'Hospitalisation',
      status: 'In Review',
      amount: '₹84,500',
      date: '21 Aug 2026',
    },
    {
      id: 'CLM-19872',
      policy: 'POL-100246',
      type: 'Vehicle Repair',
      status: 'Approved',
      amount: '₹42,000',
      date: '12 Jul 2026',
    },
  ],

  payments: [
    {
      id: 'PAY-88021',
      policy: 'POL-100245',
      amount: '₹24,800',
      date: '18 Oct 2025',
      status: 'Paid',
    },
    {
      id: 'PAY-88022',
      policy: 'POL-100246',
      amount: '₹18,450',
      date: '02 Dec 2025',
      status: 'Paid',
    },
  ],
};


export const corporateDemoData = {
  name: 'Rahul Sharma',
  corporateId: 'CORP10001',
  employeeId: 'EMP10001',
  email: 'employee@zuari-demo.com',
  company: 'Zuari Technologies Pvt. Ltd.',
  designation: 'Corporate Benefits Manager',

  stats: {
    totalPolicies: 12,
    coveredEmployees: 2486,
    activeClaims: 38,
    renewalDue: 4,
  },

  policies: [
    {
      id: 'CORP-POL-001',
      insurer: 'ICICI Lombard',
      type: 'Group Health Insurance',
      members: 1240,
      premium: '₹1.84 Cr',
      status: 'Active',
      renewal: '15 Nov 2026',
    },
    {
      id: 'CORP-POL-002',
      insurer: 'Star Health',
      type: 'Group Mediclaim',
      members: 786,
      premium: '₹96.5 L',
      status: 'Active',
      renewal: '02 Dec 2026',
    },
    {
      id: 'CORP-POL-003',
      insurer: 'HDFC Life',
      type: 'Group Term Life',
      members: 460,
      premium: '₹72.4 L',
      status: 'Active',
      renewal: '20 Jan 2027',
    },
  ],

  claims: [
    {
      id: 'CCLM-10241',
      employee: 'Employee #10241',
      type: 'Hospitalisation',
      amount: '₹2,84,000',
      status: 'In Review',
      date: '28 Aug 2026',
    },
    {
      id: 'CCLM-10197',
      employee: 'Employee #10197',
      type: 'Day Care',
      amount: '₹48,500',
      status: 'Approved',
      date: '25 Aug 2026',
    },
    {
      id: 'CCLM-10142',
      employee: 'Employee #10142',
      type: 'Hospitalisation',
      amount: '₹1,12,000',
      status: 'Settled',
      date: '18 Aug 2026',
    },
  ],
};