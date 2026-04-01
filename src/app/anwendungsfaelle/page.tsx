import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Anwendungsfälle — KI-Telefonbot für Tierärzte",
  description:
    "Notfall-Triage, Terminbuchung, Rezeptbestellungen, Öffnungszeiten, Impf-Erinnerungen — alle Use Cases für den KI-Telefonbot in Ihrer Tierarztpraxis.",
};

const useCases = [
  {
    icon: "emergency",
    title: "Notfall-Triage",
    badge: "Kernfunktion",
    badgeColor: "bg-tertiary text-on-tertiary",
    scenario:
      "Frau Meier ruft um 22 Uhr an: Ihr Hund hat eine ganze Tafel Schokolade gefressen. Der Bot fragt: Welche Sorte? Wie viel? Gewicht des Hundes? Wann wurde die Schokolade gefressen? — Ergebnis: Sofort-Notfall. Der Bot leitet den Anruf direkt an den diensthabenden Tierarzt oder den Notdienst weiter.",
    details: [
      "Erkennung typischer Notfall-Symptome (Atemnot, Vergiftung, starke Blutung, Trauma)",
      "Priorisierung nach Schweregrad in Echtzeit",
      "Sofortige Weiterleitung an Tierarzt oder Notdienst",
      "Dokumentation des Gesprächs für die Nachverfolgung",
      "Hinweis auf nächstgelegenen Notdienst nach Postleitzahl",
    ],
  },
  {
    icon: "calendar_month",
    title: "Terminbuchung",
    badge: "Häufigster Anruf",
    badgeColor: "bg-primary text-on-primary",
    scenario:
      "Herr Schmidt möchte seine Katze impfen lassen. Der Bot prüft freie Termine, schlägt drei Optionen vor und bucht den passenden Termin direkt in Ihren Praxiskalender ein — inklusive automatischer Bestätigung per SMS.",
    details: [
      "Routineimpfungen, Kastration, Zahnreinigung, allgemeine Untersuchungen",
      "Verschiedene Terminblöcke je nach Behandlungsart (15/30/60 Min)",
      "Direkte Integration in Praxissoftware (Vetera, easyVET, TIERonline)",
      "Automatische SMS-Bestätigung und Erinnerung",
      "Wartelisten-Management bei ausgebuchten Terminen",
    ],
  },
  {
    icon: "medication",
    title: "Rezept-Nachbestellungen",
    badge: "Zeitersparnis",
    badgeColor: "bg-secondary text-on-secondary",
    scenario:
      "Frau Weber braucht Nachschub für das Schilddrüsen-Medikament ihrer Katze. Der Bot nimmt Tiername, Medikament und Dosierung auf und leitet die Anfrage an die Praxis weiter. Frau Weber bekommt eine Bestätigung, sobald das Rezept bereitliegt.",
    details: [
      "Strukturierte Erfassung: Tier, Medikament, Dosierung, letzte Verschreibung",
      "Weiterleitung an den Tierarzt zur Freigabe",
      "Benachrichtigung an den Tierbesitzer bei Bereitstellung",
      "Verweis auf die Praxis für neue Rezepte (keine Ferndiagnose)",
      "Erinnerung bei regelmäßigen Nachbestellungen",
    ],
  },
  {
    icon: "info",
    title: "Öffnungszeiten & Notdienst-Info",
    badge: "24/7 verfügbar",
    badgeColor: "bg-primary text-on-primary",
    scenario:
      "Ein Anrufer möchte wissen, ob die Praxis Samstag geöffnet hat. Der Bot gibt die aktuellen Öffnungszeiten durch und verweist — falls geschlossen — auf den zuständigen Notdienst in der Region.",
    details: [
      "Aktuelle Öffnungszeiten mit Feiertags-Logik",
      "Verweis auf regionalen Notdienst nach Postleitzahl",
      "Anfahrtsbeschreibung und Parkmöglichkeiten",
      "Hinweis auf Wartezeiten bei hohem Andrang",
      "Individuelle Ansagen für Urlaub oder Betriebsferien",
    ],
  },
  {
    icon: "vaccines",
    title: "Impf- & Entwurmungs-Erinnerungen",
    badge: "Proaktiv",
    badgeColor: "bg-secondary text-on-secondary",
    scenario:
      "Der Bot ruft Frau Müller proaktiv an: Die jährliche Tollwut-Impfung ihres Hundes ist fällig. Er bietet direkt einen Termin an — Frau Müller wählt einen passenden Zeitpunkt und die Buchung ist erledigt.",
    details: [
      "Proaktive Outbound-Anrufe basierend auf Impfkalender",
      "Erinnerungen für Impfungen, Entwurmungen und Prophylaxe",
      "Direkte Terminbuchung im selben Anruf",
      "Höhere Compliance-Rate für regelmäßige Vorsorge",
      "Entlastung des Praxisteams von manuellen Erinnerungen",
    ],
  },
];

const BASE = "https://tierarzt-telefonbot.de";

export default function AnwendungsfaellePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Anwendungsfaelle", url: `${BASE}/anwendungsfaelle` },
      ]} />
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Anwendungsfälle
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            Was Ihr Telefonbot{" "}
            <span className="text-primary">alles kann</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Jeder Anwendungsfall ist individuell auf Tierarztpraxen zugeschnitten —
            mit echtem tiermedizinischen Fachwissen und empathischer Gesprächsführung.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
                  <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl sm:text-4xl">{uc.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
                      {uc.title}
                    </h2>
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${uc.badgeColor}`}>
                      {uc.badge}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-6 mb-8">
                  <p className="text-sm font-[family-name:var(--font-label)] font-semibold text-primary mb-2 uppercase tracking-wider">
                    Beispiel-Szenario
                  </p>
                  <p className="text-on-surface leading-relaxed">{uc.scenario}</p>
                </div>

                <ul className="space-y-3">
                  {uc.details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                      <span className="text-on-surface-variant">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
            Bereit für Ihren individuellen Telefonbot?
          </h2>
          <p className="text-on-surface-variant mb-8">
            Jede Praxis ist anders. Im kostenlosen Erstgespräch finden wir gemeinsam heraus,
            welche Anwendungsfälle für Sie am wertvollsten sind.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Kostenloses Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
    </>
  );
}
