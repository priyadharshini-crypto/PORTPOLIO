import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Github, Mail, Target } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ProjectMockup from './ProjectMockup';
import Reveal from './Reveal';
import { profile, projects } from '../data/profile';

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="glass group relative overflow-hidden p-5 sm:p-8"
    >
      <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r from-violet-600/0 via-fuchsia-500/0 to-indigo-600/0 opacity-0 transition duration-500 group-hover:from-violet-600/20 group-hover:via-fuchsia-500/10 group-hover:to-indigo-600/20 group-hover:opacity-100" />
      <div className={`grid items-center gap-8 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <motion.div whileHover={{ scale: 1.02, rotate: reversed ? 1 : -1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <ProjectMockup type={project.mockup} />
        </motion.div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <p className="font-mono text-xs text-violet-600 dark:text-violet-300">Project 0{index + 1}</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{project.title}</h3>
          <p className="muted mt-3 leading-relaxed">{project.description}</p>

          <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <Target className="h-4 w-4 text-fuchsia-500" /> Problem it solves
            </p>
            <p className="muted mt-1 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Technologies</p>
            {project.tech.length ? (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-lg border border-slate-300 bg-white/60 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{t}</span>
                ))}
              </div>
            ) : (
              <p className="muted text-sm italic">Tech stack details available on request.</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5">
                <Github className="h-4 w-4" /> GitHub
              </a>
            ) : (
              <a
                href={`mailto:${profile.contact.email}?subject=${encodeURIComponent(`Source code: ${project.title}`)}`}
                className="btn-primary !px-5 !py-2.5"
                title="GitHub repository not public yet — request the code by email"
              >
                <Mail className="h-4 w-4" /> Request Source Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const filters = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.tags))], []);
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="featured projects"
        title="Things I've"
        highlight="built"
        description="Real problems, practical solutions. Visuals are illustrative mockups and are labelled as such."
      />

      <Reveal className="mb-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects by technology">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
              active === f ? 'text-white' : 'glass !rounded-full text-slate-700 hover:text-violet-600 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {active === f && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/30" />
            )}
            {f}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="space-y-10">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
