import axios from 'axios';


const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000',

  headers: {
    'Content-Type': 'application/json',
  },
});


export const demoCustomerLogin = async (
  identifier,
  password
) => {
  const { data } = await api.post(
    '/api/auth/demo/customer',
    {
      identifier,
      password,
    }
  );

  return data;
};


export const demoCorporateLogin = async (
  corporateId,
  identifier,
  password
) => {
  const { data } = await api.post(
    '/api/auth/demo/corporate',
    {
      corporateId,
      identifier,
      password,
    }
  );

  return data;
};