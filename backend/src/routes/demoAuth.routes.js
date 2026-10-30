import { Router } from 'express';

import {
  demoCustomerLogin,
  demoCorporateLogin,
} from '../controllers/demoAuth.controller.js';


const router = Router();


router.post(
  '/customer',
  demoCustomerLogin
);


router.post(
  '/corporate',
  demoCorporateLogin
);


export default router;