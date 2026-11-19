import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { profile } from '../data/profile';

// Same-origin by default (Express serves the app). Set VITE_API_URL if the API is hosted elsewhere.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"><AlertCircle className="h-3.5 w-3.5" /> {error}</p>}
    </div>
  );
}

export default function Contact() {
  const { contact } = profile;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const [copied, setCopied] = useState(false);

  const channels = [
    { Icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { Icon: Linkedin, label: 'LinkedIn', value: contact.linkedinHandle, href: contact.linkedin, external: true },
    contact.github && { Icon: Github, label: 'GitHub', value: contact.github.replace(/^https?:\/\/(www\.)?/, ''), href: contact.github, external: true },
    { Icon: Phone, label: 'Phone', value: contact.phone, href: `tel:+91${contact.phone}` },
    { Icon: MapPin, label: 'Location', value: contact.location },
  ].filter(Boolean);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form._gotcha) return;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setStatus({ type: 'loading', text: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'Request failed');
      }
      setStatus({ type: 'success', text: `Thank you, ${form.name.trim().split(' ')[0]}! Your message has been sent — I'll get back to you soon.` });
      setForm({ name: '', email: '', subject: '', message: '', _gotcha: '' });
    } catch (err) {
      const reason = err instanceof TypeError ? "The server couldn't be reached." : err.message;
      setStatus({ type: 'error', text: `Sorry, your message couldn't be sent. ${reason} You can also email me directly at ${contact.email}.` });
    }
  };

  const STATUS_STYLE = {
    success: ['border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', CheckCircle2],
    error: ['border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300', AlertCircle],
  };

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="contact"
        title="Let's build something"
        highlight="amazing together"
        description="Have an opportunity, internship or project in mind? My inbox is always open."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="min-w-0">
          <div className="glass relative h-full overflow-hidden p-6 sm:p-8">
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-ink-900 p-5 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
              <p><span className="text-fuchsia-400">const</span> <span className="text-sky-300">developer</span> = {'{'}</p>
              <p className="pl-4">name: <span className="text-emerald-300">&quot;{profile.name}&quot;</span>,</p>
              <p className="pl-4">role: <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>,</p>
              <p className="pl-4">status: <span className="text-emerald-300">&quot;open_to_work&quot;</span>,</p>
              <p>{'};'}</p>
            </div>

            <ul className="relative mt-6 space-y-3">
              {channels.map(({ Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 transition group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500">{label}</span>
                      <span className="block break-words font-medium text-slate-900 dark:text-white">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} className="group flex items-center gap-4 rounded-2xl p-2 transition hover:bg-violet-500/10">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 p-2">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <button type="button" onClick={copyEmail} className="btn-ghost relative mt-6 w-full">
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Email copied!' : 'Copy email address'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <form onSubmit={onSubmit} noValidate className="glass h-full space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your name *" error={errors.name}>
                <input id="name" name="name" value={form.name} onChange={update} autoComplete="name" className="input" placeholder="Jane Recruiter" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
              </Field>
              <Field id="email" label="Your email *" error={errors.email}>
                <input id="email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" className="input" placeholder="jane@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
              </Field>
            </div>
            <Field id="subject" label="Subject">
              <input id="subject" name="subject" value={form.subject} onChange={update} className="input" placeholder="Internship / job opportunity" />
            </Field>
            <Field id="message" label="Message *" error={errors.message}>
              <textarea id="message" name="message" rows={6} value={form.message} onChange={update} className="input resize-none" placeholder="Tell me about the role or project…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>
            <input type="text" name="_gotcha" value={form._gotcha} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <button type="submit" disabled={status.type === 'loading'} className="btn-primary w-full">
              {status.type === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {status.type === 'loading' ? 'Sending…' : 'Send Message'}
            </button>

            <AnimatePresence>
              {STATUS_STYLE[status.type] && (
                <motion.div
                  key={status.type + status.text}
                  role={status.type === 'error' ? 'alert' : 'status'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${STATUS_STYLE[status.type][0]}`}
                >
                  {(() => { const I = STATUS_STYLE[status.type][1]; return <I className="mt-0.5 h-4 w-4 shrink-0" />; })()}
                  <span>{status.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
