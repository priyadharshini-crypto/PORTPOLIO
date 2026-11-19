import { motion } from 'framer-motion';
import { Award, Briefcase, CheckCircle2, FolderGit2, GraduationCap, Trophy } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { certifications, education, experience, projects } from '../data/profile';

const achievements = [
  { Icon: GraduationCap, value: '9.07', label: 'CGPA', text: `${education[0].title}, ${education[0].org}` },
  { Icon: Award, value: String(certifications.length), label: 'Certifications', text: 'NPTEL, Infosys Springboard, Simplilearn, SkillRack, Novi Tech' },
  { Icon: FolderGit2, value: String(projects.length), label: 'Projects', text: 'Real-time communication, health monitoring & smart irrigation' },
  { Icon: Trophy, value: '82%', label: 'HSC Score', text: education[1].org },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="experience & achievements" title="Industry exposure &" highlight="milestones" />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {experience.map((exp) => (
          <Reveal key={exp.role}>
            <article className="glass relative h-full overflow-hidden p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-600/20 blur-3xl" />
              <div className="relative flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <span className="chip mb-2">Internship</span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <p className="font-medium text-violet-600 dark:text-violet-300">{exp.company}</p>
                </div>
              </div>
              <ul className="relative mt-6 space-y-4">
                {exp.points.map((p) => (
                  <li key={p} className="flex gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {['Java Full Stack', 'Front-end', 'Back-end', 'Database Connectivity', 'Industry Mentorship'].map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map(({ Icon, value, label, text }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6, rotate: -1 }} className="glass h-full p-6">
                <Icon className="h-6 w-6 text-fuchsia-500" />
                <p className="mt-4 font-display text-4xl font-bold text-gradient">{value}</p>
                <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
                <p className="muted mt-1 text-xs leading-relaxed">{text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
