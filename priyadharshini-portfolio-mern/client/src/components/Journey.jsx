import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Award, BadgeCheck, ChevronDown, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { certifications, education } from '../data/profile';

function TimelineItem({ icon: Icon, title, org, period, detail, open, onToggle, children }) {
  return (
    <li className="relative pl-14">
      <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/40 ring-4 ring-slate-50 dark:ring-ink-950">
        <Icon className="h-5 w-5" />
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`glass glass-hover w-full p-5 text-left ${open ? '!border-violet-500/60' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {period && <p className="font-mono text-xs text-violet-600 dark:text-violet-300">{period}</p>}
            <h3 className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {org && <p className="muted text-sm">{org}</p>}
          </div>
          <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-violet-500 transition ${open ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="pt-4">
                {detail && <span className="chip">{detail}</span>}
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
}

function Timeline({ heading, Icon, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <div>
      <Reveal>
        <h3 className="mb-8 flex items-center gap-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
          <Icon className="h-6 w-6 text-violet-500" /> {heading}
        </h3>
      </Reveal>
      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-300 dark:bg-white/10" />
        <motion.div style={{ scaleY }} className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-violet-500 via-fuchsia-500 to-indigo-500" />
        <ul className="space-y-6">{children}</ul>
      </div>
    </div>
  );
}

export default function Journey() {
  const [openEdu, setOpenEdu] = useState(0);
  const [openCert, setOpenCert] = useState(0);
  const issuers = [...new Set(certifications.map((c) => c.issuer))];

  return (
    <section id="journey" className="section">
      <SectionHeading eyebrow="education & certifications" title="My learning" highlight="journey" description="Click any milestone to expand it." />
      <div className="grid gap-14 lg:grid-cols-2">
        <Timeline heading="Education" Icon={GraduationCap}>
          {education.map((e, i) => (
            <Reveal as="div" key={e.title} delay={i * 0.1}>
              <TimelineItem icon={GraduationCap} {...e} open={openEdu === i} onToggle={() => setOpenEdu(openEdu === i ? -1 : i)} />
            </Reveal>
          ))}
        </Timeline>

        <Timeline heading="Certifications" Icon={Award}>
          {issuers.map((issuer, i) => (
            <Reveal as="div" key={issuer} delay={i * 0.08}>
              <TimelineItem
                icon={BadgeCheck}
                title={issuer}
                org={`${certifications.filter((c) => c.issuer === issuer).length} certification(s)`}
                open={openCert === i}
                onToggle={() => setOpenCert(openCert === i ? -1 : i)}
              >
                <ul className="space-y-2">
                  {certifications.filter((c) => c.issuer === issuer).map((c) => (
                    <li key={c.name} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <BadgeCheck className="h-4 w-4 text-fuchsia-500" /> {c.name}
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            </Reveal>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
