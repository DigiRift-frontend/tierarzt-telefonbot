import Link from "next/link";
import type { Metadata } from "next";
import { AudioPlayer } from "@/components/AudioPlayer";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";

interface Demo {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  color: string;
  audioSrc?: string;
}

export const metadata: Metadata = {
  title: "Demo anhören — So klingt Ihr KI-Telefonbot",
  description:
    "Hören Sie echte Beispielgespräche: Notfall-Triage, Terminbuchung, Rezeptbestellung. So klingt der KI-Telefonbot für Ihre Tierarztpraxis.",
};

const demos: Demo[] = [
  {
    id: "notfall",
    icon: "emergency",
    title: "Notfall-Triage",
    subtitle: "Besorgter Tierbesitzer meldet Vergiftungsverdacht",
    description:
      "Frau Meier ruft um 22 Uhr an — ihr Hund hat Schokolade gefressen. Der Bot erkennt den Notfall, stellt die richtigen Fragen und leitet sofort an den Notdienst weiter.",
    duration: "1:00",
    audioSrc: "/audio/demo-notfall-triage.mp3",
    color: "bg-tertiary/10 text-tertiary",
  },
  {
    id: "termin",
    icon: "calendar_month",
    title: "Terminbuchung",
    subtitle: "Katzenbesitzer möchte Impftermin vereinbaren",
    description:
      "Herr Schmidt ruft an, um einen Impftermin für seine Katze zu buchen. Der Bot prüft die Verfügbarkeit, schlägt drei Optionen vor und bucht direkt ein.",
    duration: "1:18",
    audioSrc: "/audio/demo-terminbuchung.mp3",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "rezept",
    icon: "medication",
    title: "Rezept-Nachbestellung",
    subtitle: "Hundebesitzer braucht Medikamenten-Nachschub",
    description:
      "Herr Müller braucht Nachschub für das Schilddrüsen-Medikament seiner Katze. Der Bot nimmt alle Daten auf und leitet die Anfrage an die Praxis weiter.",
    duration: "1:03",
    audioSrc: "/audio/demo-rezept.mp3",
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: "oeffnungszeiten",
    icon: "info",
    title: "Öffnungszeiten & Notdienst",
    subtitle: "Anruf außerhalb der Sprechzeiten",
    description:
      "Ein Anrufer möchte wissen, ob die Praxis Samstag geöffnet hat. Der Bot gibt die aktuellen Zeiten durch und verweist auf den regionalen Notdienst.",
    duration: "1:18",
    audioSrc: "/audio/demo-oeffnungszeiten.mp3",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "erinnerung",
    icon: "vaccines",
    title: "Impf-Erinnerung",
    subtitle: "Proaktiver Outbound-Anruf",
    description:
      "Der Bot ruft Herr Müller an: Die jährliche Tollwut-Impfung seines Hundes ist fällig. Er bietet direkt einen Termin an — Buchung im selben Anruf.",
    duration: "1:05",
    audioSrc: "/audio/demo-impf-erinnerung.mp3",
    color: "bg-secondary/10 text-secondary",
  },
];

const BASE = "https://tierarzt-telefonbot.de";

export default function DemoPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Demo", url: `${BASE}/demo` },
      ]} />
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Demo
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            So klingt Ihr{" "}
            <span className="text-primary">Telefonbot</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Echte Beispielgespräche zwischen Anrufern und dem KI-Bot.
            Premium-Stimmen, natürliche Pausen, empathische Kommunikation.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {demos.map((demo, index) => {
            const card = (
              <div
                key={demo.id}
                className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className={`shrink-0 w-16 h-16 ${demo.color} rounded-2xl flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-3xl">{demo.icon}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
                          {demo.title}
                        </h2>
                        <span className="text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                          {demo.duration}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-semibold mb-3">{demo.subtitle}</p>
                      <p className="text-on-surface-variant leading-relaxed mb-6">{demo.description}</p>

                      {/* Audio Player */}
                      {demo.audioSrc ? (
                        <AudioPlayer src={demo.audioSrc} duration={demo.duration} />
                      ) : (
                        <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-4 opacity-50">
                          <div className="shrink-0 w-12 h-12 bg-surface-container-highest text-on-surface-variant rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">hourglass_top</span>
                          </div>
                          <div className="flex-1">
                          <p className="text-sm text-on-surface-variant">Demo wird produziert...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            );

            return card;
          })}
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
            Überzeugt? Dann hören Sie Ihren eigenen Bot.
          </h2>
          <p className="text-on-surface-variant mb-8">
            Im Erstgespräch konfigurieren wir eine individuelle Demo speziell für Ihre Praxis —
            mit Ihrem Praxisnamen, Ihren Öffnungszeiten und Ihren Behandlungen.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Individuelle Demo anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
