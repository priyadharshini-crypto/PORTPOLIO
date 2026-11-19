import { Github, Heart, Linkedin, Mail } from 'lucide-react';
import { navLinks, profile } from '../data/profile';

export default function Footer() {
  const { contact } = profile;
  const socials = [
    { Icon: Mail, label: 'Email', href: `mailto:${contact.email}` },
    { Icon: Linkedin, label: 'LinkedIn', href: contact.linkedin },
    contact.github && { Icon: Github, label: 'GitHub', href: contact.github },
  ].filter(Boolean);

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-12 sm:px-8">
        <a href="#home" className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {profile.name}
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`} className="muted text-sm transition hover:text-violet-600 dark:hover:text-violet-300">{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-3">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="glass grid h-11 w-11 place-items-center !rounded-full text-slate-700 transition hover:-translate-y-1 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          Designed &amp; Developed with Passion and Code. <Heart className="h-4 w-4 fill-fuchsia-500 text-fuchsia-500" />
        </p>
        <p className="muted text-xs">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
