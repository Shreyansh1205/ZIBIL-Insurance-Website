/* =========================================================
   STATIC TEST DATA: HR (corporate) portal + Employee portal
   Replace with API data later.
========================================================= */

export const policy = {
  type: 'GMC',
  number: '7896584',
  insurer: 'Acko General Insurance Ltd.',
  tpa: 'Unitedhealthcare Parekh Insurance Tpa Private Limited',
  start: '04-06-2026',
  end: '03-06-2027',
  company: 'Demo Corporate',
  sumInsured: 300000,
};

export const hrEmployees = [
  { name: 'Riya', empId: 'Test03', memberId: 'M-1003', sumInsured: 300000, mobile: '8888888888', dept: 'Finance', doj: '12-01-2021', email: 'riya@democorp.in', dependants: 0, hasCard: false },
  { name: 'Dimple', empId: 'Test01', memberId: 'M-1001', sumInsured: 300000, mobile: '9971226636', dept: 'HR', doj: '03-04-2019', email: 'dimple@democorp.in', dependants: 0, hasCard: true },
  { name: 'Pankaj', empId: 'test02', memberId: 'M-1002', sumInsured: 300000, mobile: '9865322356', dept: 'Operations', doj: '21-08-2020', email: 'pankaj@democorp.in', dependants: 0, hasCard: true },
  { name: 'Karan Mehta', empId: 'Test04', memberId: 'M-1004', sumInsured: 300000, mobile: '9810044556', dept: 'Sales', doj: '15-02-2022', email: 'karan@democorp.in', dependants: 0, hasCard: true },
];

export const nominees = [
  { empId: 'Test01', employee: 'Dimple', nominee: 'Rakesh Kumar', relation: 'Spouse', share: '100%' },
  { empId: 'test02', employee: 'Pankaj', nominee: 'Sunita Devi', relation: 'Mother', share: '60%' },
  { empId: 'test02', employee: 'Pankaj', nominee: 'Anil Kumar', relation: 'Father', share: '40%' },
  { empId: 'Test03', employee: 'Riya', nominee: 'Mohan Lal', relation: 'Father', share: '100%' },
  { empId: 'Test04', employee: 'Karan Mehta', nominee: 'Neha Mehta', relation: 'Spouse', share: '100%' },
];

export const hrClaims = [
  { empId: 'Test01', employee: 'Dimple', beneficiary: 'Dimple', relation: 'Employee', type: 'Reimbursement', status: 'Paid', claimNo: 'CLM-22001', tpaClaim: 'CL-22000451', amount: 71443, paid: 21500, age: 35, city: 'SURAT', hospital: 'SIMS HOSPITAL' },
  { empId: 'test02', employee: 'Pankaj', beneficiary: 'Pankaj', relation: 'Employee', type: 'Reimbursement', status: 'Under Process', claimNo: 'CLM-22002', tpaClaim: 'CL-22000452', amount: 21328, paid: 0, age: 52, city: 'DELHI', hospital: 'GARVIT E.N.T HOSPITAL' },
  { empId: 'Test03', employee: 'Riya', beneficiary: 'Riya', relation: 'Employee', type: 'Reimbursement', status: 'Paid', claimNo: 'CLM-22003', tpaClaim: 'CL-22000453', amount: 21500, paid: 10000, age: 63, city: 'JAIPUR', hospital: 'GARVIT E.N.T HOSPITAL' },
];

export const claimsStrip = {
  paid: { amount: 31500, count: 2 },
  process: { amount: 8015, count: 1 },
  closed: { amount: 0, count: 0 },
  reported: { amount: 114271, count: 3 },
};

export const claimDetailFields = (c) => [
  ['Age', c.age],
  ['AMOUNT_PAID_TO_MEMBER', c.paid ? `₹${c.paid.toLocaleString('en-IN')}` : 'N/A'],
  ['AMOUNT_PAID_TO_PROVIDER', 'N/A'],
  ['CLAIMED_AMOUNT', `₹${c.amount.toLocaleString('en-IN')}`],
  ['ADMISSIBLE_AMOUNT', c.paid ? `₹${c.paid.toLocaleString('en-IN')}` : 'N/A'],
  ['APPROVED_DATE', c.status === 'Paid' ? '18-08-2026' : 'N/A'],
  ['Balance_Sum_Insured', `₹${(300000 - c.paid).toLocaleString('en-IN')}`],
  ['BENEFICIARY_NAME', c.beneficiary],
  ['CLAIM_STATUS', c.status],
  ['DEDUCTIONS', c.status === 'Paid' ? '₹2,100 (non-payable items)' : 'N/A'],
  ['PENDING_REQUIREMENTS', c.status === 'Under Process' ? 'Discharge summary, final bill' : 'None'],
  ['REASON_FOR_DEDUCTION', c.status === 'Paid' ? 'Consumables not payable as per policy' : 'N/A'],
  ['CASHLESS_DENIAL_REASONS', 'N/A'],
  ['HOSPITAL', c.hospital],
  ['CITY', c.city],
];

export const hrRequests = [
  { id: 'REQ-3101', employee: 'Karan Mehta', type: 'Member Addition', raised: '10-06-2026', status: 'Approved' },
  { id: 'REQ-3102', employee: 'Riya', type: 'Mobile Number Correction', raised: '22-06-2026', status: 'Pending' },
  { id: 'REQ-3103', employee: 'Pankaj', type: 'e-Card Re-issue', raised: '01-07-2026', status: 'Approved' },
  { id: 'REQ-3104', employee: 'Dimple', type: 'Nominee Update', raised: '09-07-2026', status: 'Under Process' },
];

export const hospitals = [
  { name: 'Anandamayee Nursing Home & Diagnostic Centre', address: 'Hospital Road, Laldighirpara, Suri', city: 'Birbhum', state: 'West Bengal', pin: '731101' },
  { name: 'Athulya Hospital', address: 'D.No 50/760-A-56, Gayathri Estate', city: 'Kurnool', state: 'Andhra Pradesh', pin: '518002' },
  { name: 'Divya Drishti Advance Eye Care', address: 'SH10, Near Vandana Hotel, Sahapada', city: 'Jharsuguda', state: 'Odisha', pin: '768202' },
  { name: 'Institute Of Post Graduate Medical Education & Research - SSKM Hospital', address: '244, A.J.C Bose Road', city: 'Kolkata', state: 'West Bengal', pin: '700020' },
  { name: 'J.S. Multispeciality Hospitals LLP', address: '1077/1080, Loknath Temple, Baidyapur', city: 'Hooghly', state: 'West Bengal', pin: '712410' },
  { name: 'Lavanyas Padmavathi Maternity Hospital', address: '6-79/2, Pashamilaram Road, Isnapur', city: 'Sangareddy', state: 'Telangana', pin: '502307' },
  { name: 'Lifegurd Multi-speciality Hospital Pvt. Ltd.', address: 'G T Road, Nababhat, Purbo Bardhaman', city: 'Burdwan', state: 'West Bengal', pin: '713104' },
  { name: 'Omkar Hospital - Baramati', address: 'Pangalli Gunwadi Road, Near Mahada Colony', city: 'Pune', state: 'Maharashtra', pin: '413102' },
  { name: 'Vitalia Hospital', address: 'Bariatu Road, Near Booty More', city: 'Ranchi', state: 'Jharkhand', pin: '834009' },
  { name: 'Ambad Multispeciality Hospital', address: 'Top Top Plaza, 2nd Floor, XLO Point, Ambad', city: 'Nashik', state: 'Maharashtra', pin: '422010' },
  { name: 'Fortis Escorts Hospital', address: 'Jawahar Lal Nehru Marg, Malviya Nagar', city: 'Jaipur', state: 'Rajasthan', pin: '302017' },
  { name: 'Fortis Hospital And Kidney Institute', address: '111A Ananda Pur, E.M. Bypass', city: 'Kolkata', state: 'West Bengal', pin: '700029' },
];

export const escalation = [
  { level: 'Level 1', role: 'Service Executive', name: 'Shivani Tadankar', phone: '7045878582', email: 'shivani.t@zuariinsurance.in', tat: 'Within 24 hours' },
  { level: 'Level 2', role: 'Relationship Manager', name: 'Rohit Sharma', phone: '9810011223', email: 'rohit.s@zuariinsurance.in', tat: 'Within 48 hours' },
  { level: 'Level 3', role: 'Head, Employee Benefits', name: 'Anita Verma', phone: '9810099887', email: 'anita.v@zuariinsurance.in', tat: 'Within 72 hours' },
];

export const policyFeatures = [
  { group: 'Hospitalization Limits', items: [['Room rent limit', '2% of sum insured (normal room)'], ['ICU limit', '6% of sum insured'], ['Proportionate deduction', 'Covered'], ['Pre-hospitalization', '30 days'], ['Post-hospitalization', '60 days']] },
  { group: 'Maternity Cover', items: [['Normal delivery', '₹50,000'], ['C-section', '₹75,000'], ['New born baby cover', 'Day 1 onwards'], ['Waiting period', '9 months']] },
  { group: 'Waiting Periods', items: [['Initial waiting period', '30 days'], ['Pre-existing diseases', 'Covered from day 1'], ['Specific illnesses and surgeries', '1 year']] },
  { group: 'Other Benefits', items: [['Ambulance charges', '₹3,000 per hospitalization'], ['Worldwide emergency cover', 'Included'], ['Critical illness benefit', 'Optional add-on'], ['Dental cover', 'Accident only'], ['Covid-19', 'Covered']] },
];

export const hrDocuments = [
  { name: 'Policy Copy: GMC 7896584', type: 'PDF', size: '1.2 MB', date: '04-06-2026' },
  { name: 'Member Data Sheet', type: 'XLSX', size: '84 KB', date: '04-06-2026' },
  { name: 'Claim Form', type: 'PDF', size: '220 KB', date: '04-06-2026' },
  { name: 'Claim Checklist', type: 'PDF', size: '96 KB', date: '04-06-2026' },
  { name: 'Day Care Surgeries List', type: 'PDF', size: '310 KB', date: '04-06-2026' },
  { name: 'Blacklisted Hospital List', type: 'PDF', size: '74 KB', date: '04-06-2026' },
  { name: 'Non Payable List', type: 'PDF', size: '58 KB', date: '04-06-2026' },
];

export const cdOpening = [{ particular: 'Opening Balance', cdNumber: 'demo', bank: '-', cheque: '-', amount: 8000000, created: '06 Jun 2026 12:21 PM' }];

export const cdEntries = [
  { particular: 'Policy Premium', type: 'GMC', policy: '7896584', endorsement: '-', emp: 0, dep: 0, debit: 7999998, credit: 0, date: '-', created: '06 Jun 2026 12:22 PM' },
  { particular: 'Addition', type: 'GMC', policy: '7896584', endorsement: 'END-001', emp: 1, dep: 0, debit: 78549, credit: 0, date: '10-06-2026', created: '06 Jun 2026 12:22 PM' },
  { particular: 'Deletion', type: 'GMC', policy: '7896584', endorsement: 'END-002', emp: 0, dep: 0, debit: 0, credit: 90000, date: '-', created: '06 Jun 2026 12:23 PM' },
];

export const premiumSummary = { inception: 7999998, additional: 78549, deletion: 90000, net: 7988547, activeLives: 4 };
export const claimRatio = { claim: 0.58, incurred: 1.53 };

export const claimAgeWise = [
  { label: '31-40 Yrs', count: 1, amount: 71443, color: '#e9c03f' },
  { label: '51-60 Yrs', count: 1, amount: 21328, color: '#6aa8ff' },
  { label: '61-70 Yrs', count: 1, amount: 21500, color: '#e5566d' },
];
export const claimGender = [
  { label: 'Female', count: 2, amount: 42828, color: '#e5566d' },
  { label: 'Male', count: 1, amount: 71443, color: '#2f7bff' },
];
export const demographyAge = [
  { label: '21-30 Yrs', value: 0 }, { label: '31-40 Yrs', value: 2 }, { label: '41-50 Yrs', value: 1 }, { label: '51-60 Yrs', value: 1 },
];
export const demographyGender = [
  { label: 'Male', value: 3, color: '#2f7bff' },
  { label: 'Female', value: 1, color: '#e5566d' },
];
export const topHospitalsReported = [
  { label: 'GARVIT E.N.T HOSPITAL', value: 72000, color: '#e9c03f' },
  { label: 'SIMS HOSPITAL', value: 42271, color: '#6aa8ff' },
];
export const topHospitalsPaid = [
  { label: 'GARVIT E.N.T HOSPITAL', value: 25200, color: '#e9c03f' },
  { label: 'SIMS HOSPITAL', value: 6300, color: '#6aa8ff' },
];
export const endorsementAnalysis = [
  { type: 'Addition', lives: 1, premium: 78549, effective: '10-06-2026', status: 'Approved' },
  { type: 'Deletion', lives: 0, premium: 90000, effective: '-', status: 'Approved' },
  { type: 'Correction', lives: 0, premium: 0, effective: '22-06-2026', status: 'Pending' },
];

/* =========================================================
   EMPLOYEE PORTAL
========================================================= */

export const employeeProfile = {
  name: 'Amit Verma',
  empCode: 'EMP10001',
  groupCode: 'GRP-DEMO',
  mobile: '98XXXXXX21',
  company: 'Demo Corporate',
};

export const employeePolicies = [
  { key: 'GMC', label: 'GMC', title: 'Group Mediclaim', insurer: 'Acko General Insurance Ltd.', number: '7896584', start: '04-06-2026', end: '03-06-2027', sumInsured: 300000, tpa: 'Unitedhealthcare Parekh Insurance TPA', type: 'Group Health Insurance' },
  { key: 'GPA', label: 'GPA', title: 'Group Personal Accident', insurer: 'ICICI Lombard', number: 'GPA-55120', start: '01-04-2026', end: '31-03-2027', sumInsured: 1000000, tpa: 'In-house', type: 'Group Personal Accident' },
  { key: 'GTL', label: 'GTL', title: 'Group Term Life', insurer: 'HDFC Life', number: 'GTL-77310', start: '01-04-2026', end: '31-03-2027', sumInsured: 2500000, tpa: 'In-house', type: 'Group Term Life' },
  { key: 'PARENT', label: 'Parent Policy', title: 'Parent Policy', insurer: 'Star Health', number: 'PAR-20418', start: '15-05-2026', end: '14-05-2027', sumInsured: 500000, tpa: 'In-house', type: 'Parent Mediclaim' },
  { key: 'TOPUP', label: 'Top Up Policy', title: 'Super Top Up', insurer: 'Care Health', number: 'TOP-88213', start: '04-06-2026', end: '03-06-2027', sumInsured: 700000, tpa: 'In-house', type: 'Super Top Up' },
];

export const wellnessChips = ['Medicines', 'Diagnostics', 'Nutrition', 'Teleconsultation'];

export const members = [
  { name: 'Amit Verma', relation: 'Employee', dob: '29-08-1985', age: 41, memberId: 'GH2674', cardReady: true },
  { name: 'Neha Verma', relation: 'Spouse', dob: '21-10-1987', age: 39, memberId: 'GH2674-S', cardReady: true },
  { name: 'Aarav Verma', relation: 'Son', dob: '22-04-2012', age: 14, memberId: 'GH2674-C1', cardReady: true },
  { name: 'Anaya Verma', relation: 'Daughter', dob: '12-09-2016', age: 10, memberId: 'GH2674-C2', cardReady: true },
];

export const employeeClaims = [
  { claimNo: '2000039423', patient: 'Amit Verma', hospital: 'Ramana Hospital, Chennai', intimated: '10-07-2026', admission: '10-07-2026', updated: '29-07-2026', status: 'Paid', amount: 42000 },
  { claimNo: '2000041876', patient: 'Neha Verma', hospital: 'Apollo Hospital, Delhi', intimated: '02-09-2026', admission: '02-09-2026', updated: '10-09-2026', status: 'Under Process', amount: 18500 },
];

export const formsList = [
  { name: 'Claim Form', desc: 'For reimbursement and cashless claims', size: '220 KB' },
  { name: 'Check List', desc: 'Documents required while submitting a claim', size: '96 KB' },
  { name: 'Blacklisted Hospital List', desc: 'Hospitals not eligible for cashless', size: '74 KB' },
  { name: 'Day Care Surgeries List', desc: 'Procedures covered as day care', size: '310 KB' },
  { name: 'Non Payable List', desc: 'Items not payable under the policy', size: '58 KB' },
];

export const wellnessServices = [
  { key: 'tele', title: 'Doctor Teleconsultation', text: 'Chat, audio and video consultation with qualified doctors, anywhere.', points: ['General physicians', 'Cardiologists', 'Orthopedics', 'Pediatricians', 'Gynecologists', '20+ specialities'] },
  { key: 'diag', title: 'Diagnostic Support', text: 'Book a test for yourself or a family member from the comfort of home.', points: ['NABH accredited labs and centers', 'Pathology and radiology network', 'Lifestyle and chronic ailment tests', 'Home sample collection'] },
  { key: 'opd', title: 'OPD Cashless', text: 'Cashless OPD with no network restrictions, pan India.', points: ['Reimbursement, wallet and cashless modes', 'No restriction on type of hospital', 'No age restrictions', 'Health wallet with complimentary wellness'] },
  { key: 'med', title: 'Medicine Delivery', text: 'Order medicines online at discounted rates, delivered home.', points: ['19,000+ pincodes covered', '1.5 lakh+ medicines available', 'Real-time order tracking', 'Upload prescription and order', 'Cancellation, wallet and cash on delivery'] },
  { key: 'amb', title: 'Emergency Ambulance', text: 'Book ambulance or paramedic services in medical emergencies.', points: ['Patient Transport Ambulance (PTA)', 'Basic Life Support (BLS)', 'Advance Life Support (ALS)', 'Mortuary van / ambulance', '24/7 support with ETA tracking'] },
  { key: 'wallet', title: 'Medibhai Wellness Wallet', text: 'Flex benefits wallet customised for your company.', points: ['Pre-employment check-ups', 'Health check-ups', 'Fitness plan', 'Doctor consultation', 'Mental wellness packages', 'Dental and vision check-ups', 'OPD wallets'] },
];