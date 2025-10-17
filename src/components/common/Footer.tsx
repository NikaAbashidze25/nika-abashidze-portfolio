import Link from 'next/link';
import { socialLinks } from '@/lib/data.tsx';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex flex-col items-center gap-4 px-4 text-center md:px-0 md:items-start">
          <p className="text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} Nika Abashidze. All Rights Reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-transform duration-300 hover:scale-110"
              aria-label={link.name}
            >
              <link.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
