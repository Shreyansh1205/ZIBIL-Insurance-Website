import axios from 'axios';

/*
  Demo auth client.
  - Calls the Render backend (VITE_API_URL).
  - Wakes the backend as soon as the login page loads (Render free tier sleeps).
  - If the backend is asleep/unreachable, falls back to the same demo
    credentials locally so the demo login never fails in front of a client.
    A wrong password still fails: the backend's 401 is never overridden.
*/

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_URL,
  timeout: 12000, // Render cold start can take ~30-60s; fall back after 12s
  headers: { 'Content-Type': 'application/json' },
});

/* Same values as the backend defaults (backend/src/controllers/demoAuth.controller.js) */
const DEMO = {
  customer: {
    id: 'demo-customer-001',
    role: 'customer',
    customerId: 'CUST10001',
    email: 'customer@zuari-demo.com',
    password: 'Zuari@123',
    name: 'Amit Verma',
    phone: '+91 98765 43210',
  },
  corporate: {
    id: 'demo-corporate-001',
    role: 'corporate_employee',
    corporateId: 'CORP10001',
    employeeId: 'EMP10001',
    email: 'employee@zuari-demo.com',
    password: 'Zuari@123',
    name: 'Rahul Sharma',
    company: 'Zuari Technologies Pvt. Ltd.',
    designation: 'Corporate Benefits Manager',
  },
};

const norm = (v) => String(v || '').trim().toLowerCase();
const strip = (u) => {
  const copy = { ...u };
  delete copy.password;
  return copy;
};

/* True when the server never answered (asleep, offline, CORS, timeout) */
const isUnreachable = (error) => !error?.response;

const authError = (message) => {
  const err = new Error(message);
  err.response = { status: 401, data: { success: false, message } };
  return err;
};

const localCustomerLogin = (identifier, password) => {
  const u = DEMO.customer;
  const ok = [u.email, u.customerId].some((v) => norm(v) === norm(identifier)) && password === u.password;
  if (!ok) throw authError('Invalid demo customer credentials.');
  return { success: true, demo: true, offline: true, message: 'Demo customer login successful.', user: strip(u) };
};

const localCorporateLogin = (corporateId, identifier, password) => {
  const u = DEMO.corporate;
  const ok =
    norm(corporateId) === norm(u.corporateId) &&
    [u.email, u.employeeId].some((v) => norm(v) === norm(identifier)) &&
    password === u.password;
  if (!ok) throw authError('Invalid demo corporate credentials.');
  return { success: true, demo: true, offline: true, message: 'Demo corporate login successful.', user: strip(u) };
};

/* Fire-and-forget ping so the Render instance is awake by the time the user submits */
let warmed = false;
export const warmUpBackend = () => {
  if (warmed) return;
  warmed = true;
  axios.get(`${API_URL}/api/health`, { timeout: 60000 }).catch(() => {});
};

export const demoCustomerLogin = async (identifier, password) => {
  try {
    const { data } = await api.post('/api/auth/demo/customer', { identifier, password });
    return data;
  } catch (error) {
    if (isUnreachable(error)) {
      console.warn('[demo auth] backend unreachable, using local demo check:', error.message);
      return localCustomerLogin(identifier, password);
    }
    throw error;
  }
};

export const demoCorporateLogin = async (corporateId, identifier, password) => {
  try {
    const { data } = await api.post('/api/auth/demo/corporate', { corporateId, identifier, password });
    return data;
  } catch (error) {
    if (isUnreachable(error)) {
      console.warn('[demo auth] backend unreachable, using local demo check:', error.message);
      return localCorporateLogin(corporateId, identifier, password);
    }
    throw error;
  }
};