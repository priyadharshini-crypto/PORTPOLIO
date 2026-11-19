export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-violet-50/60 to-slate-100 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950" />
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-700/25" />
      <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-[120px] dark:bg-indigo-700/25" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-[120px] dark:bg-fuchsia-700/20" />
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
