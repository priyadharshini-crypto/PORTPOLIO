import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// ---------- Model ----------
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, trim: true, maxlength: 200, default: '' },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
    ip: { type: String, select: false },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// ---------- Middleware ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateContact(req, res, next) {
  const { name = '', email = '', subject = '', message = '', _gotcha = '' } = req.body || {};
  if (_gotcha) return res.status(200).json({ success: true, message: 'Thanks!' });

  const errors = {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) errors.name = 'Please enter your name (2–100 characters).';
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 200) errors.email = 'Please enter a valid email address.';
  if (typeof subject !== 'string' || subject.length > 200) errors.subject = 'Subject must be under 200 characters.';
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) errors.message = 'Message should be 10–5000 characters.';

  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
  }
  req.contact = { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() };
  next();
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const ok =
    expected &&
    token.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  if (!ok) return res.status(401).json({ success: false, message: 'Unauthorized' });
  next();
}

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again in a few minutes.' },
});

// ---------- App ----------
export function createApp() {
  const app = express();
  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
        },
      },
    }),
  );
  app.use(compression());

  const origins = (process.env.CLIENT_ORIGIN || '').split(',').map((o) => o.trim()).filter(Boolean);
  app.use('/api', cors({ origin: origins.length ? origins : false }));
  app.use(express.json({ limit: '20kb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });

  // Contact form -> MongoDB
  app.post('/api/contact', contactLimiter, validateContact, async (req, res, next) => {
    try {
      await Message.create({ ...req.contact, ip: req.ip });
      res.status(201).json({ success: true, message: 'Message received.' });
    } catch (err) {
      next(err);
    }
  });

  // Admin: read / mark / delete messages (Authorization: Bearer <ADMIN_TOKEN>)
  app.get('/api/messages', requireAdmin, async (_req, res, next) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 }).limit(200).lean();
      res.json({ success: true, count: messages.length, messages });
    } catch (err) {
      next(err);
    }
  });
  app.patch('/api/messages/:id/read', requireAdmin, async (req, res, next) => {
    try {
      const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      res.json({ success: true, message: msg });
    } catch (err) {
      next(err);
    }
  });
  app.delete('/api/messages/:id', requireAdmin, async (req, res, next) => {
    try {
      const msg = await Message.findByIdAndDelete(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

  app.use('/api', (_req, res) => res.status(404).json({ success: false, message: 'Not found' }));

  // React website (pre-built in /public)
  app.use(express.static(publicDir, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error(err);
    const status = err.type === 'entity.parse.failed' ? 400 : 500;
    res.status(status).json({ success: false, message: status === 400 ? 'Invalid JSON body.' : 'Something went wrong. Please try again later.' });
  });

  return app;
}
