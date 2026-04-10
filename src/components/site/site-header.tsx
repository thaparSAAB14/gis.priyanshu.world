import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Connect" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          Priyanshu GIS
        </Link>
        <nav className="flex items-center gap-4 text-sm text-foreground/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
          <a
            href="https://lab.priyanshu.world"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-foreground/20 px-3 py-1 text-xs text-foreground/70 hover:text-foreground"
          >
            Lab (Experimental)
          </a>
        </nav>
      </div>
    </header>
  );
}
