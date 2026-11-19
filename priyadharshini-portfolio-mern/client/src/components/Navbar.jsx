import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks, profile } from '../data/profile';

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 ${scrolled ? '' : ''}`}
      >
        <a
          href="#home"
          className={`group flex items-center gap-2 rounded-full px-3 py-2 transition ${scrolled ? 'glass !rounded-full' : ''}`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 font-display text-sm font-bold text-white">
            PS
          </span>
          <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
            {profile.firstName}
            <span className="text-violet-500">.dev</span>
          </span>
        </a>

        <ul className={`hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex ${scrolled ? 'glass !rounded-full' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === id ? 'text-white' : 'text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="glass grid h-11 w-11 place-items-center !rounded-full text-slate-700 transition hover:text-violet-600 dark:text-slate-200 dark:hover:text-violet-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <ThemeIcon className="h-5 w-5" />
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="glass grid h-11 w-11 place-items-center !rounded-full text-slate-700 dark:text-slate-200 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-5 mt-3 p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ id, label }, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                      active === id
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                        : 'text-slate-700 hover:bg-violet-500/10 dark:text-slate-200'
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
