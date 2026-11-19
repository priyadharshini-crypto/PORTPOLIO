import { motion } from 'framer-motion';
import { Award, Briefcase, Code2, Database, FileText, FolderGit2, Layers, LayoutTemplate, Server } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import TechCube from './TechCube';
import { EVIDENCE, skillGroups } from '../data/profile';

const ICONS = { Code2, LayoutTemplate, Server, Database, Layers };
const EVIDENCE_ICONS = { resume: FileText, cert: Award, project: FolderGit2, internship: Briefcase };
const ORDER = ['resume', 'cert', 'project', 'internship'];

function EvidenceBar({ evidence }) {
  return (
    <div className="mt-2 flex items-center gap-1.5" aria-label={`Evidence: ${evidence.map((e) => EVIDENCE[e]).join(', ')}`}>
      {ORDER.map((key, i) => {
        const on = evidence.includes(key);
        const Icon = EVIDENCE_ICONS[key];
        return (
          <motion.span
            key={key}
            title={EVIDENCE[key]}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            className={`flex h-6 flex-1 origin-left items-center justify-center rounded-md ${
              on ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-slate-600'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </motion.span>
        );
      })}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="technical skills"
        title="My"
        highlight="tech toolkit"
        description="Every skill below is backed by my resume. Instead of made-up percentages, each bar shows where the skill is proven — resume, certification, project or internship."
      />

      <Reveal className="mb-10 flex flex-wrap justify-center gap-3">
        {ORDER.map((key) => {
          const Icon = EVIDENCE_ICONS[key];
          return (
            <span key={key} className="chip">
              <Icon className="h-3.5 w-3.5" /> {EVIDENCE[key]}
            </span>
          );
        })}
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = ICONS[group.icon];
          return (
            <Reveal key={group.title} delay={gi * 0.06}>
              <motion.article whileHover={{ y: -6 }} className="glass group relative h-full overflow-hidden p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/20 blur-2xl transition group-hover:bg-fuchsia-500/30" />
                <div className="relative mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 transition group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{group.title}</h3>
                </div>
                <ul className="relative space-y-4">
                  {group.skills.map((s) => (
                    <li key={s.name}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{s.name}</span>
                      </div>
                      <p className="muted text-xs">{s.note}</p>
                      <EvidenceBar evidence={s.evidence} />
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          );
        })}

        <Reveal delay={0.3}>
          <div className="glass relative flex h-full flex-col items-center justify-center overflow-hidden p-6 text-center">
            <TechCube />
            <p className="font-display font-semibold text-slate-900 dark:text-white">Core stack in 3D</p>
            <p className="muted mt-1 text-sm">Hover to tilt the cube</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
