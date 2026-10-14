import express from 'express';
import cors from 'cors';

import contactRouter from './routes/contact.routes.js';
import demoAuthRouter from './routes/demoAuth.routes.js';


const app = express();


app.use(express.json());


app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN ||
      'http://localhost:5173',

    credentials: true,
  })
);


// Existing contact API
app.use(
  '/api/contact',
  contactRouter
);


// Demo authentication API
app.use(
  '/api/auth/demo',
  demoAuthRouter
);


export { app };