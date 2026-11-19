import { motion } from 'framer-motion';
import { GraduationCap, Languages, Lightbulb, Rocket, Sparkles, Target, Users } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ProfilePhoto from './ProfilePhoto';
import { education, profile } from '../data/profile';

const highlights = [
  {
    Icon: GraduationCap,
    title: 'Education',
    text: `${education[0].title} at ${education[0].org} (${education[0].period}) — ${education[0].detail}.`,
  },
  {
    Icon: Target,
    title: 'Career Objective',
    text: 'Looking for opportunities to enhance knowledge and gain practical experience in the IT field.',
  },
  {
    Icon: Rocket,
    title: 'Software Development',
    text: 'Strong interest in Full Stack Development and UI/UX Design, with hands-on Java Full Stack and MERN stack experience.',
  },
  {
    Icon: Lightbulb,
    title: 'Innovation',
    text: 'Built real-time, healthcare and agriculture-focused projects that solve practical, everyday problems.',
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="about me" title="Curious mind," highlight="creative builder." />

      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-600/40 via-fuchsia-500/20 to-indigo-600/40 blur-2xl" />
          <div className="glass relative overflow-hidden !rounded-[2rem] p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <ProfilePhoto size="lg" className="scale-110 object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent p-6">
                <p className="font-display text-2xl font-bold text-white">{profile.name}</p>
                <p className="text-sm text-violet-200">{profile.role} · B.E CSE</p>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute -right-4 top-10 flex rounded-2xl border border-violet-400/40 bg-ink-900/90 shadow-xl backdrop-blur items-center gap-2 px-4 py-3 text-sm font-semibold text-white sm:-right-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-fuchsia-500" /> CGPA 9.07
          </motion.div>
          <motion.div
            className="absolute -left-4 bottom-24 flex rounded-2xl border border-violet-400/40 bg-ink-900/90 shadow-xl backdrop-blur items-center gap-2 px-4 py-3 text-sm font-semibold text-white sm:-left-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className="font-mono text-violet-500">{'</>'}</span> Full Stack
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Hi, I&apos;m <span className="font-semibold text-slate-900 dark:text-white">{profile.firstName}</span> — {profile.about}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="glass glass-hover h-full p-5">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="muted mt-1.5 text-sm leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Users className="h-4 w-4 text-violet-500" /> Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.softSkills.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Languages className="h-4 w-4 text-violet-500" /> Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
