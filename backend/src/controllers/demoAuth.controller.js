const demoUsers = {
  customer: {
    id: 'demo-customer-001',
    role: 'customer',

    customerId:
      process.env.DEMO_CUSTOMER_ID ||
      'CUST10001',

    email:
      process.env.DEMO_CUSTOMER_EMAIL ||
      'customer@zuari-demo.com',

    password:
      process.env.DEMO_CUSTOMER_PASSWORD ||
      'Zuari@123',

    name: 'Amit Verma',

    phone: '+91 98765 43210',
  },


  corporate: {
    id: 'demo-corporate-001',
    role: 'corporate_employee',

    corporateId:
      process.env.DEMO_CORPORATE_ID ||
      'CORP10001',

    employeeId:
      process.env.DEMO_EMPLOYEE_ID ||
      'EMP10001',

    email:
      process.env.DEMO_EMPLOYEE_EMAIL ||
      'employee@zuari-demo.com',

    password:
      process.env.DEMO_EMPLOYEE_PASSWORD ||
      'Zuari@123',

    name: 'Rahul Sharma',

    company:
      'Zuari Technologies Pvt. Ltd.',

    designation:
      'Corporate Benefits Manager',
  },
};


const publicUser = (user) => {

  const {
    password,
    ...safeUser
  } = user;

  return safeUser;
};


export const demoCustomerLogin = (
  req,
  res
) => {

  const {
    identifier,
    password,
  } = req.body || {};

  const user = demoUsers.customer;


  const identifierMatches = [
    user.email,
    user.customerId,
  ].some(
    (value) =>
      String(value)
        .toLowerCase() ===
      String(identifier || '')
        .trim()
        .toLowerCase()
  );


  if (
    !identifierMatches ||
    password !== user.password
  ) {

    return res.status(401).json({
      success: false,
      message:
        'Invalid demo customer credentials.',
    });

  }


  return res.json({
    success: true,
    demo: true,
    message:
      'Demo customer login successful.',
    user: publicUser(user),
  });
};


export const demoCorporateLogin = (
  req,
  res
) => {

  const {
    corporateId,
    identifier,
    password,
  } = req.body || {};

  const user = demoUsers.corporate;


  const corporateMatches =
    String(corporateId || '')
      .trim()
      .toLowerCase() ===
    user.corporateId.toLowerCase();


  const identifierMatches = [
    user.email,
    user.employeeId,
  ].some(
    (value) =>
      String(value)
        .toLowerCase() ===
      String(identifier || '')
        .trim()
        .toLowerCase()
  );


  if (
    !corporateMatches ||
    !identifierMatches ||
    password !== user.password
  ) {

    return res.status(401).json({
      success: false,
      message:
        'Invalid demo corporate credentials.',
    });

  }


  return res.json({
    success: true,
    demo: true,
    message:
      'Demo corporate login successful.',
    user: publicUser(user),
  });
};