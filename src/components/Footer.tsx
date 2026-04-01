import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-primary font-[family-name:var(--font-headline)] mb-6">
              tierarzt-telefonbot.de
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">
              Die intelligente Telefonlösung für moderne Tierarztpraxen.
              Entlastung für Ihr Team, besserer Service für Ihre Kunden — Full-Service von DigiRift.
            </p>
          </div>

          <div>
            <h5 className="font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
              Seiten
            </h5>
            <ul className="space-y-4">
              <li>
                <Link href="/anwendungsfaelle" className="text-on-surface-variant hover:text-primary transition-colors">
                  Anwendungsfälle
                </Link>
              </li>
              <li>
                <Link href="/so-funktionierts" className="text-on-surface-variant hover:text-primary transition-colors">
                  So funktioniert&apos;s
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-on-surface-variant hover:text-primary transition-colors">
                  Demo anhören
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-on-surface-variant hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
              Rechtliches
            </h5>
            <ul className="space-y-4">
              <li>
                <Link href="/impressum" className="text-on-surface-variant hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-on-surface-variant hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/datenschutz-ki-telefonie" className="text-on-surface-variant hover:text-primary transition-colors">
                  DSGVO & KI-Telefonie
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-on-surface-variant hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* E-Book Teaser */}
        <div className="mb-12 bg-gradient-to-r from-primary/5 to-primary-container/5 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <span className="material-symbols-outlined text-primary text-4xl">menu_book</span>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-1">
              Kostenloser DSGVO-Leitfaden
            </h4>
            <p className="text-sm text-on-surface-variant">
              Alles über Datenschutz bei KI-Telefonie in der Tierarztpraxis — verständlich erklärt.
            </p>
          </div>
          <Link
            href="/ratgeber"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-[family-name:var(--font-headline)] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Jetzt herunterladen
          </Link>
        </div>

        <div className="border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">
            &copy; {new Date().getFullYear()} tierarzt-telefonbot.de — Ein Service der{" "}
            <a
              href="https://digirift.com"
              rel="noopener"
              className="text-primary hover:underline"
            >
              DigiRift GmbH
            </a>
          </p>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-primary text-base">location_on</span>
            Hamburg, Deutschland
          </div>
        </div>
      </div>
    </footer>
  );
}
