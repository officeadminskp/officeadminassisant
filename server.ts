import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface ContactSubmissionRecord {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  packageTier: string;
  message: string;
  submittedAt: string;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const recentSubmissions: ContactSubmissionRecord[] = [];
const MAX_RECENT_SUBMISSIONS = 200;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 150;
}

function isValidPhone(phone: string): boolean {
  if (!phone) {
    return true;
  }
  return /^[+\d\s().-]{7,30}$/.test(phone);
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

async function startServer() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/contact', (req, res) => {
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
      res.status(429).json({
        success: false,
        error: 'Too many inquiries submitted recently. Please wait a few minutes or message us on WhatsApp.',
      });
      return;
    }

    const body = req.body && typeof req.body === 'object' ? (req.body as Record<string, unknown>) : {};

    // Honeypot check to silently reject automated bot submissions
    const honeypot = sanitizeText(body.companyWebsite, 100);
    if (honeypot.length > 0) {
      res.status(200).json({
        success: true,
        referenceId: `OAA-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        submittedAt: new Date().toISOString(),
      });
      return;
    }

    const name = sanitizeText(body.name, 100);
    const email = sanitizeText(body.email, 150).toLowerCase();
    const phone = sanitizeText(body.phone, 30);
    const service = sanitizeText(body.service, 120);
    const packageTier = sanitizeText(body.packageTier, 60) || 'Custom Inquiry';
    const message = sanitizeMessage(body.message, 2500);

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!isValidEmail(email)) {
      fieldErrors.email = 'Please enter a valid email address.';
    }
    if (!isValidPhone(phone)) {
      fieldErrors.phone = 'Please enter a valid phone number or leave it blank.';
    }
    if (service.length < 2) {
      fieldErrors.service = 'Please select the service you need.';
    }
    if (message.length < 10) {
      fieldErrors.message = 'Please describe your project requirements (at least 10 characters).';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Please review the highlighted form fields.',
        fieldErrors,
      });
      return;
    }

    const referenceId = `OAA-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const record: ContactSubmissionRecord = {
      referenceId,
      name,
      email,
      phone,
      service,
      packageTier,
      message,
      submittedAt,
    };

    recentSubmissions.unshift(record);
    if (recentSubmissions.length > MAX_RECENT_SUBMISSIONS) {
      recentSubmissions.length = MAX_RECENT_SUBMISSIONS;
    }

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      summary: {
        name,
        email,
        service,
        packageTier,
      },
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application build not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Office Admin Assistant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
