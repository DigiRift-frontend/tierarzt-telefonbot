import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "So funktioniert's — Ihr Weg zum KI-Telefonbot",
  description:
    "In 3 Phasen zum fertigen KI-Telefonbot für Ihre Tierarztpraxis. Erstgespräch, Konfiguration, Testphase — wir kümmern uns um alles.",
};

const phases = [
  {
    num: "01",
    title: "Erstgespräch",
    subtitle: "Wir lernen Ihre Praxis kennen",
    icon: "handshake",
    items: [
      "30-minütiges Kennenlernen — kostenlos und unverbindlich",
      "Wir analysieren Ihren Bedarf: Welche Anrufe kommen am häufigsten?",
      "Welche Praxissoftware nutzen Sie? Welche Telefonanlage?",
      "Gemeinsame Definition der Ziele und Anwendungsfälle",
      "Sie entscheiden — ohne Druck, ohne Vertragsbindung",
    ],
    highlight: "Ihr Aufwand: 30 Minuten. Danach kümmern wir uns um alles.",
  },
  {
    num: "02",
    title: "Konfiguration & Training",
    subtitle: "Wir bauen Ihren individuellen Bot",
    icon: "engineering",
    items: [
      "Unsere Experten konfigurieren den Bot speziell für Ihre Praxis",
      "Individuelle Begrüßung mit Ihrem Praxisnamen",
      "Tiermedizinisches Fachvokabular und Symptom-Erkennung",
      "Integration mit Ihrem Kalender oder Praxissoftware",
      "Notfall-Triage-Logik nach Ihren Vorgaben",
      "DSGVO-Dokumentation und AV-Vertrag werden vorbereitet",
    ],
    highlight: "Ihr Aufwand: Null. Wir halten Sie per E-Mail auf dem Laufenden.",
  },
  {
    num: "03",
    title: "Testphase & Optimierung",
    subtitle: "Sie testen — wir optimieren",
    icon: "tune",
    items: [
      "Der Bot geht mit echten Anrufen in die Testphase",
      "Wir hören mit und analysieren die Gespräche",
      "Feintuning der Antworten, Workflows und Weiterleitung",
      "Regelmäßiges Feedback-Gespräch mit Ihnen",
      "Erst wenn alles perfekt sitzt, gehen wir in den Regelbetrieb",
    ],
    highlight: "Kein Risiko. Kein Vertrag während der Testphase.",
  },
];

const afterLaunch = [
  {
    icon: "monitoring",
    title: "Laufende Optimierung",
    text: "Wir überwachen die Performance und optimieren den Bot kontinuierlich — ohne Ihr Zutun.",
  },
  {
    icon: "summarize",
    title: "Täglicher Report oder Dashboard",
    text: "Täglicher Report per E-Mail oder Live-Dashboard mit allen Anrufen, Themen und Weiterleitungen. Sie entscheiden.",
  },
  {
    icon: "support_agent",
    title: "Persönlicher Ansprechpartner",
    text: "Kein Ticket-System. Ihr fester Ansprechpartner ist immer für Sie da.",
  },
  {
    icon: "update",
    title: "Regelmäßige Updates",
    text: "Neue Features, verbesserte Stimmen, erweiterte Funktionen — alles automatisch für Sie.",
  },
];

const BASE = "https://tierarzt-telefonbot.de";

export default function SoFunktionierts() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "So funktioniert's", url: `${BASE}/so-funktionierts` },
      ]} />
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Der Prozess
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            So kommen Sie zu Ihrem{" "}
            <span className="text-primary">Telefonbot</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Ein strukturierter Prozess in 3 Phasen. Wir nehmen uns die Zeit,
            Ihren Bot perfekt auf Ihre Praxis abzustimmen.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-[family-name:var(--font-headline)] font-extrabold">{phase.num}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-1">
                      {phase.title}
                    </h2>
                    <p className="text-on-surface-variant">{phase.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                      <span className="text-on-surface-variant">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-primary/5 rounded-2xl p-5 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">{phase.icon}</span>
                  <p className="text-on-surface font-[family-name:var(--font-headline)] font-semibold">
                    {phase.highlight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-12 text-center text-on-surface">
            Nach dem Launch: Laufende Betreuung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {afterLaunch.map((item) => (
              <div key={item.title} className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-[family-name:var(--font-headline)] font-bold mb-3 text-on-surface">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
            Klingt gut? Dann starten wir.
          </h2>
          <p className="text-on-surface-variant mb-8">
            Das Erstgespräch dauert 30 Minuten und ist kostenlos. Danach wissen Sie genau,
            was möglich ist — und wir kümmern uns um den Rest.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
