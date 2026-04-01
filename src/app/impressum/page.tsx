import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der DigiRift GmbH — Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <section className="pt-32 pb-24 md:pt-44 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface mb-12">
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none text-on-surface-variant space-y-8">
          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              <strong className="text-on-surface">DigiRift GmbH</strong><br />
              Rothenbaumchaussee 17<br />
              20148 Hamburg<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Geschäftsführung
            </h2>
            <p>
              Kamil Gawlik<br />
              Kian Ansari<br />
              <span className="text-sm">Beide geschäftsführungsberechtigte Gesellschafter</span>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Kontaktdaten
            </h2>
            <p>
              Telefon: +49 40 74303583<br />
              E-Mail: info@digirift.com<br />
              Geschäftszeiten: Mo-Fr 9:00-17:00 Uhr
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Rechtsform & Registrierung
            </h2>
            <p>
              Rechtsform: GmbH (Gesellschaft mit beschränkter Haftung)<br />
              Registergericht: Amtsgericht Hamburg<br />
              Eingetragen im Handelsregister Hamburg
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <strong className="text-on-surface">DE347780824</strong>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener nofollow"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>Unsere E-Mail-Adresse für Streitbeilegungsverfahren: info@digirift.com</p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Zuständige Schlichtungsstelle:<br />
              Universalschlichtungsstelle des Zentrums für Schlichtung e.V.<br />
              Straßburger Straße 8, 77694 Kehl am Rhein<br />
              <a
                href="https://www.verbraucher-schlichter.de"
                target="_blank"
                rel="noopener nofollow"
                className="text-primary hover:underline"
              >
                www.verbraucher-schlichter.de
              </a>
            </p>
            <p>
              Wir sind bereit, bei Streitigkeiten mit Verbrauchern an einem Schlichtungsverfahren
              vor dieser Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </div>

          <div className="border-t border-outline-variant/20 pt-8 text-sm">
            <p>
              tierarzt-telefonbot.de ist ein Service der DigiRift GmbH, Hamburg.<br />
              Dieses Impressum gilt auch für die Social-Media-Auftritte von tierarzt-telefonbot.de.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
