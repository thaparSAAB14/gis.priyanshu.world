import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './Header.css';

const NAV_LINKS = [
  { href: '#gis', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const THEME_ICON = {
  dark: (
    <>
      <Moon size={15} />
      <span>Dark</span>
    </>
  ),
  light: (
    <>
      <Sun size={15} />
      <span>Light</span>
    </>
  ),
};

const Header = ({ themeMode, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header liquid-glass">
      <a href="#top" className="header-logo">Priyanshu.</a>

      <nav className="header-nav">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className="header-link">
            {label}
          </a>
        ))}
      </nav>

      <div className="header-controls">
        <button
          className="theme-btn liquid-glass"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          aria-pressed={themeMode === 'dark'}
        >
          {THEME_ICON[themeMode]}
        </button>

        <button
          className="mobile-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${open ? 'open' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav liquid-glass">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="header-link"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
