import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Telefonbot für Tierärzte — Nie wieder einen Anruf verpassen",
  description:
    "Der KI-Telefonbot für Ihre Tierarztpraxis. Notfall-Triage, Terminbuchung, Rezeptbestellungen. Full-Service: Wir kümmern uns um alles.",
};

const features = [
  {
    icon: "deployed_code",
    title: "Full-Service von A bis Z",
    text: "Wir übernehmen die komplette Einrichtung, Konfiguration und laufende Betreuung. Sie konzentrieren sich auf Ihre Patienten — wir kümmern uns um die Technik.",
  },
  {
    icon: "emergency",
    title: "Intelligente Notfall-Triage",
    text: "Unser Bot erkennt Symptome, priorisiert nach Schweregrad und leitet echte Notfälle sofort an Sie weiter. Kein kritischer Anruf geht mehr verloren.",
  },
  {
    icon: "psychology",
    title: "Tiermedizinisch trainiert",
    text: "Kein generischer Bot. Unsere KI versteht tierärztliche Fachbegriffe, kennt typische Symptome und reagiert empathisch auf besorgte Tierbesitzer.",
  },
];

const benefits = [
  {
    icon: "schedule",
    title: "24/7 Erreichbarkeit",
    text: "Auch nach Feierabend, am Wochenende und an Feiertagen — Ihre Praxis ist immer erreichbar für Notfall-Infos, Terminanfragen und Rezeptbestellungen.",
  },
  {
    icon: "calendar_month",
    title: "Automatische Terminbuchung",
    text: "Impfungen, Routineuntersuchungen, OPs — der Bot bucht Termine direkt in Ihren Praxiskalender. Ohne Wartezeiten, ohne Missverständnisse.",
  },
  {
    icon: "medication",
    title: "Rezept-Nachbestellungen",
    text: "Tierbesitzer bestellen Medikamente einfach per Anruf. Der Bot nimmt Name, Tier und Medikament auf und leitet die Anfrage an Ihre Praxis weiter.",
  },
];

const steps = [
  {
    num: "1",
    title: "Erstgespräch",
    text: "Wir lernen Ihre Praxis kennen: Welche Behandlungen bieten Sie an? Wie sieht Ihr Tagesablauf aus? Was sind die häufigsten Anrufe?",
  },
  {
    num: "2",
    title: "Konfiguration & Training",
    text: "Unsere Experten bauen Ihren individuellen Bot — mit Ihrer Begrüßung, Ihren Workflows, Ihrer Praxissoftware-Integration und tiermedizinischem Fachwissen.",
  },
  {
    num: "3",
    title: "Testphase & Optimierung",
    text: "Sie testen den Bot mit echten Anrufen. Wir hören mit, optimieren und feilen, bis alles perfekt sitzt. Erst dann gehen wir in den Regelbetrieb.",
  },
];

const faqs = [
  {
    q: "Muss ich mich um die Technik kümmern?",
    a: "Nein, überhaupt nicht. Wir übernehmen die komplette Einrichtung, Konfiguration und laufende Betreuung. Sie müssen nur eine Rufumleitung einrichten — dabei helfen wir Ihnen natürlich auch.",
  },
  {
    q: "Erkennt der Bot echte Notfälle?",
    a: "Ja. Unser Bot ist speziell für Tierarztpraxen trainiert und erkennt typische Notfall-Symptome wie Atemnot, starke Blutungen oder Vergiftungsverdacht. In solchen Fällen wird der Anruf sofort an Sie oder den Notdienst weitergeleitet.",
  },
  {
    q: "Wie klingt der Bot? Merken Anrufer, dass es eine KI ist?",
    a: "Wir verwenden Premium-Stimmen mit natürlichen Pausen und empathischer Tonalität. Der Bot klingt professionell und freundlich — speziell geschult für den einfühlsamen Umgang mit besorgten Tierbesitzern.",
  },
  {
    q: "Ist das DSGVO-konform?",
    a: "Absolut. Alle Daten werden auf deutschen Servern verarbeitet. Ein Auftragsverarbeitungsvertrag (AV-Vertrag) ist inklusive. Anrufer werden zu Beginn informiert, dass sie mit einer KI sprechen. Wir übernehmen die komplette Datenschutz-Dokumentation.",
  },
  {
    q: "Kann der Bot Termine in meinen Kalender eintragen?",
    a: "Ja. Wir integrieren den Bot mit Ihrer bestehenden Praxissoftware oder Ihrem Kalender. Termine werden automatisch synchronisiert — für Impfungen, Routineuntersuchungen, OPs und mehr.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 rounded-full mb-6">
              <span className="ai-status-pulse w-2 h-2 rounded-full" />
              <span className="text-primary font-[family-name:var(--font-label)] font-semibold text-xs tracking-wider uppercase">
                KI-Telefonassistenz
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface leading-[1.1] tracking-tight mb-8">
              Nie wieder einen Anruf{" "}
              <span className="text-primary">verpassen</span>
            </h1>

            <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
              Der KI-Telefonbot für Ihre Tierarztpraxis. Wir entwickeln, konfigurieren
              und betreuen ihn — Sie müssen sich um nichts kümmern. Von A bis Z.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Kostenloses Erstgespräch
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 text-on-surface font-[family-name:var(--font-headline)] font-bold px-8 py-4 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined">play_circle</span>
                Demo anhören
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10 aspect-[4/3]">
              <Image
                src="/images/hero-vet.jpg"
                alt="Professionelle Tierärztin in einer modernen Praxis"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-2xl p-6 rounded-3xl shadow-xl border border-white/40 max-w-xs z-20 hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">24/7 Verfügbarkeit</p>
                  <p className="text-xs text-on-surface-variant">Kein Anruf geht verloren</p>
                </div>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full w-full">
                <div className="h-full bg-primary w-3/4 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface-container-low py-6 border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: "verified_user", text: "DSGVO-konform" },
            { icon: "dns", text: "Deutsche Server" },
            { icon: "person", text: "Persönlicher Ansprechpartner" },
            { icon: "event_available", text: "Monatlich kündbar" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
              <span className="font-[family-name:var(--font-label)] font-medium text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
            Ihre Praxis klingelt. Aber niemand geht ran.
          </h2>
          <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-2xl mx-auto">
            Während Sie operieren, impfen oder Notfälle behandeln, gehen Anrufe verloren.
            Tierbesitzer sind frustriert, Termine werden nicht gebucht, echte Notfälle kommen nicht durch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "67%", text: "der Tierarztpraxen sind während Stoßzeiten telefonisch nicht erreichbar" },
              { num: "40%", text: "aller Anrufe in Tierarztpraxen sind repetitive Standardfragen" },
              { num: "1 von 3", text: "Anrufern wählt nie wieder dieselbe Praxis, wenn niemand rangeht — verlorene Kontakte, die nicht zurückkommen" },
            ].map((stat) => (
              <div key={stat.num} className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm">
                <div className="text-4xl font-[family-name:var(--font-headline)] font-extrabold text-primary mb-3">
                  {stat.num}
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">{stat.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-lg text-on-surface font-[family-name:var(--font-headline)] font-semibold">
            Sie konzentrieren sich auf Ihre Patienten. Wir kümmern uns um Ihre Anrufe.
          </p>
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-container">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-on-primary">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-headline)] font-bold mb-3">
              Was kosten Sie verpasste Anrufe?
            </h2>
            <p className="text-primary-fixed-dim opacity-90">
              Unser Kosten-Rechner zeigt Ihnen in 2 Minuten, wie viel Umsatz Ihrer Praxis durch verpasste Anrufe verloren geht.
            </p>
          </div>
          <Link
            href="/check"
            className="shrink-0 inline-flex items-center gap-2 bg-surface text-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined">calculate</span>
            Jetzt berechnen
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold mb-4 text-on-surface">
              Speziell für Tierarztpraxen entwickelt
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Modernste KI-Technologie trifft auf tiermedizinisches Fachwissen — kein generischer Bot,
              sondern ein Assistent, der Ihre Praxis versteht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-transparent hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-4 text-on-surface">
                  {f.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-video lg:aspect-square relative">
                <Image
                  src="/images/cat-clinic.jpg"
                  alt="Katze auf dem Untersuchungstisch in einer modernen Tierarztpraxis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold mb-8 text-on-surface">
                Was Ihr Telefonbot kann
              </h2>
              <div className="space-y-8">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined">{b.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-headline)] font-bold text-lg mb-2 text-on-surface">
                        {b.title}
                      </h4>
                      <p className="text-on-surface-variant">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              So kommen Sie zu Ihrem Telefonbot
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-xl">
              Ein strukturierter Prozess — wir nehmen uns die Zeit, Ihren Bot perfekt auf Ihre Praxis abzustimmen.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-start lg:items-center text-left lg:text-center">
                  <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-8 border-surface-container-low font-[family-name:var(--font-headline)]">
                    {s.num}
                  </div>
                  <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-4 text-on-surface">
                    {s.title}
                  </h4>
                  <p className="text-on-surface-variant px-0 lg:px-6">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DSGVO Trust Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
                DSGVO-konform. Deutsche Server. Ihre Daten sind sicher.
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Datenschutz in der Tierarztpraxis ist sensibel. Deshalb übernehmen wir die komplette Compliance —
                Sie müssen sich um nichts kümmern.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: "dns", title: "Deutsche Server", text: "Alle Daten werden ausschließlich in Deutschland verarbeitet und gespeichert." },
                  { icon: "description", title: "AV-Vertrag inklusive", text: "Der Auftragsverarbeitungsvertrag ist Teil unseres Service — fertig unterschriftsreif." },
                  { icon: "record_voice_over", title: "Transparenz-Hinweis", text: "Anrufer werden zu Beginn informiert, dass sie mit einer KI sprechen." },
                  { icon: "delete_sweep", title: "Automatische Löschung", text: "Anrufdaten werden nach definierten Fristen automatisch gelöscht." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-headline)] font-bold text-sm mb-1 text-on-surface">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/datenschutz-ki-telefonie"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-8 hover:gap-4 transition-all"
              >
                Mehr zu DSGVO & KI-Telefonie
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">shield</span>
                  <h3 className="font-[family-name:var(--font-headline)] font-bold text-xl text-on-surface">
                    Compliance-Checkliste
                  </h3>
                </div>
                {[
                  "DSGVO-konforme Datenverarbeitung",
                  "Hosting auf deutschen Servern",
                  "AV-Vertrag im Service inklusive",
                  "KI-Transparenzhinweis bei jedem Anruf",
                  "Datenschutzfolgenabschätzung verfügbar",
                  "EU-AI-Act konforme Dokumentation",
                  "Verschlüsselte Datenübertragung",
                  "Regelmäßige Sicherheitsaudits",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-3 border-b border-outline-variant/10 last:border-0">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-on-surface text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold mb-12 text-center text-on-surface">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-surface-container-lowest rounded-2xl shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-[family-name:var(--font-headline)] font-bold text-on-surface">
                  {faq.q}
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-primary to-primary-container p-12 md:p-20 rounded-[3rem] text-on-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold mb-6">
                Bereit für Ihren KI-Telefonbot?
              </h2>
              <p className="text-primary-fixed-dim text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
                Lassen Sie uns gemeinsam herausfinden, wie wir Ihre Praxis entlasten können.
                Das Erstgespräch ist kostenlos und unverbindlich.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex bg-surface text-primary px-10 py-5 rounded-full font-[family-name:var(--font-headline)] font-bold text-xl shadow-xl hover:bg-on-primary-container transition-all"
              >
                Jetzt Erstgespräch vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
