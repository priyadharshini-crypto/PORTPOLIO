import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <Reveal className="mx-auto mb-16 max-w-3xl text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
        <span className="opacity-60">{'<'}</span> {eyebrow} <span className="opacity-60">{'/>'}</span>
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && <p className="muted mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">{description}</p>}
    </Reveal>
  );
}
