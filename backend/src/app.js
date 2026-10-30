import express from 'express';
import cors from 'cors';

import contactRouter from './routes/contact.routes.js';
import demoAuthRouter from './routes/demoAuth.routes.js';


const app = express();

app.set('trust proxy', 1); // Render sits behind a proxy

app.use(express.json());


// CORS_ORIGIN can hold several origins, comma-separated, e.g.
// https://zuari-premium.vercel.app,http://localhost:5173
// Vercel preview URLs (*.vercel.app) are allowed when ALLOW_VERCEL_PREVIEWS=true.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === 'true';

app.use(
  cors({
    origin(origin, callback) {
      // allow server-to-server / curl / health checks (no Origin header)
      if (!origin) return callback(null, true);
      const clean = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(clean)) return callback(null, true);
      if (allowVercelPreviews && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(clean)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS: ' + origin));
    },
    credentials: true,
  })
);


// Health check (Render health check + frontend warm-up ping)
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});


// Existing contact API
app.use('/api/contact', contactRouter);


// Demo authentication API
app.use('/api/auth/demo', demoAuthRouter);


// Basic error handler (incl. CORS rejections)
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.message && err.message.startsWith('Not allowed by CORS') ? 403 : 500;
  res.status(status).json({ success: false, message: err.message || 'Server error' });
});


export { app };