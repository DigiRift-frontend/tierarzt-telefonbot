"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/check", label: "Kosten-Rechner" },
  { href: "/anwendungsfaelle", label: "Anwendungsfälle" },
  { href: "/demo", label: "Demo" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm h-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
        <Link
          href="/"
          className="text-xl font-bold text-primary font-[family-name:var(--font-headline)] tracking-tight"
        >
          tierarzt-telefonbot.de
        </Link>

        <div className="hidden md:flex items-center gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary-container font-[family-name:var(--font-headline)] font-semibold tracking-tight transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/kontakt"
            className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-[family-name:var(--font-headline)] font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            Erstgespräch vereinbaren
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Menü öffnen"
          >
            <span className="material-symbols-outlined text-on-surface">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-surface-container-high px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-on-surface-variant hover:text-primary font-[family-name:var(--font-headline)] font-semibold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-[family-name:var(--font-headline)] font-bold text-sm mt-4"
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      )}

      <div className="bg-surface-container-low h-[1px] w-full" />
    </nav>
  );
}
