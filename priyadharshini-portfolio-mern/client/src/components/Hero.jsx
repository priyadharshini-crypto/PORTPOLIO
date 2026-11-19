import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Atom, Braces, Cloud, Coffee, Cpu, Database, Download, MapPin, Palette, Server, Terminal } from 'lucide-react';
import ParticleField from './ParticleField';
import ProfilePhoto from './ProfilePhoto';
import useTyping from '../hooks/useTyping';
import { profile, stats } from '../data/profile';

const ORBIT = [
  { Icon: Coffee, label: 'Java', pos: '-left-[8%] top-[14%]', delay: 0 },
  { Icon: Atom, label: 'React', pos: '-right-[4%] top-[8%]', delay: 0.8 },
  { Icon: Database, label: 'MongoDB', pos: '-right-[10%] bottom-[22%]', delay: 1.6 },
  { Icon: Server, label: 'Node.js', pos: '-left-[10%] bottom-[18%]', delay: 2.4 },
  { Icon: Palette, label: 'UI/UX', pos: 'left-[38%] -bottom-[4%]', delay: 3.2 },
  { Icon: Terminal, label: 'Python', pos: 'left-[40%] -top-[6%]', delay: 4 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const typed = useTyping(profile.typing);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <ParticleField />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 pb-20 sm:px-8 grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </span>
            <span className="chip">
              <MapPin className="h-3.5 w-3.5" /> {profile.contact.location}
            </span>
          </motion.div>

          <motion.p variants={item} className="font-mono text-sm text-violet-600 dark:text-violet-300">
            {'// Hello, I\'m'}
          </motion.p>
          <motion.h1 variants={item} className="mt-2 font-display break-words text-[2.6rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl xl:text-7xl">
            <span className="text-gradient animate-gradient bg-[length:200%_auto]">{profile.name}</span>
          </motion.h1>
          <motion.h2 variants={item} className="mt-6 font-display text-xl font-semibold leading-snug text-slate-800 dark:text-slate-100 sm:text-3xl">
            {profile.heading}
          </motion.h2>
          <motion.p variants={item} className="muted mt-4 text-base font-medium sm:text-lg">
            {profile.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="glass mx-auto mt-6 inline-flex max-w-full items-center gap-2 !rounded-2xl px-4 py-3 font-mono text-sm lg:mx-0"
            aria-live="polite"
          >
            <Braces className="h-4 w-4 shrink-0 text-violet-500" />
            <span className="text-slate-500 dark:text-slate-400">passionate_about</span>
            <span className="text-slate-400">=</span>
            <span className="truncate text-fuchsia-600 dark:text-fuchsia-300">&quot;{typed}</span>
            <span className="-ml-1 inline-block h-4 w-0.5 animate-pulse bg-violet-500" />
            <span className="-ml-1 text-fuchsia-600 dark:text-fuchsia-300">&quot;</span>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#projects" className="btn-primary group w-full sm:w-auto">
              Explore My Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href={profile.resume} download="Priyadharshini_S_Resume.pdf" className="btn-ghost w-full sm:w-auto">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass glass-hover !rounded-2xl px-4 py-4 text-center lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-gradient">{s.value}</dd>
                <dd className="muted mt-1 text-xs font-medium">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[26rem] lg:order-2"
          style={{ perspective: 1000 }}
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          <motion.div style={{ rotateX, rotateY }} className="preserve-3d relative aspect-square">
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#d946ef,#6366f1,#0ea5e9,#8b5cf6)] p-[3px] opacity-90 blur-[1px]" />
            <div className="absolute inset-[-18px] rounded-full border border-dashed border-violet-500/30 animate-spin-slow [animation-direction:reverse] [animation-duration:40s]" />
            <div className="absolute inset-[3px] rounded-full bg-slate-50 dark:bg-ink-950" />
            <div className="absolute inset-[10px] overflow-hidden rounded-full bg-gradient-to-br from-violet-200 to-indigo-200 dark:from-violet-900/40 dark:to-indigo-900/40">
              <ProfilePhoto size="lg" />
            </div>
            <div className="absolute -inset-10 -z-10 rounded-full bg-violet-600/30 blur-3xl" />

            {ORBIT.map(({ Icon, label, pos, delay }) => (
              <motion.div
                key={label}
                className={`absolute z-20 ${pos}`}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
              >
                <div className="glass flex items-center gap-1.5 !rounded-2xl px-3 py-2 text-xs font-semibold text-slate-800 shadow-lg dark:text-slate-100 !bg-white/90 dark:!bg-ink-900/90">
                  <Icon className="h-4 w-4 text-violet-500 dark:text-violet-300" /> {label}
                </div>
              </motion.div>
            ))}
            <Cpu aria-hidden="true" className="absolute right-[18%] top-[26%] hidden h-5 w-5 animate-float text-fuchsia-400/60 sm:block" />
            <Cloud aria-hidden="true" className="absolute bottom-[30%] left-[16%] hidden h-5 w-5 animate-float text-indigo-400/60 [animation-delay:2s] sm:block" />
          </motion.div>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-11 w-7 justify-center rounded-full border-2 border-violet-500/50 pt-2">
          <motion.span className="h-2 w-1 rounded-full bg-violet-500" animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>
      </a>
    </section>
  );
}
