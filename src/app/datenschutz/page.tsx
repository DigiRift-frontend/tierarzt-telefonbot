import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der DigiRift GmbH — DSGVO-konformer Schutz Ihrer personenbezogenen Daten.",
};

export default function DatenschutzPage() {
  return (
    <section className="pt-32 pb-24 md:pt-44 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface mb-4">
          Datenschutzerklärung
        </h1>
        <p className="text-on-surface-variant mb-12">
          Informationen zum DSGVO-konformen Schutz Ihrer personenbezogenen Daten.
        </p>

        <div className="prose prose-lg max-w-none text-on-surface-variant space-y-10">

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="text-lg font-semibold text-on-surface mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können.
            </p>
            <h3 className="text-lg font-semibold text-on-surface mt-6 mb-2">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B.
              um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch
              der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            <h3 className="text-lg font-semibold text-on-surface mt-6 mb-2">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <h3 className="text-lg font-semibold text-on-surface mt-6 mb-2">Welche Rechte haben Sie?</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
              oder Löschung dieser Daten zu verlangen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              2. Verantwortliche Stelle
            </h2>
            <p>
              <strong className="text-on-surface">DigiRift GmbH</strong><br />
              Rothenbaumchaussee 17<br />
              20148 Hamburg<br />
              Deutschland<br /><br />
              Telefon: +49 40 74303583<br />
              E-Mail: info@digirift.com
            </p>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
              über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              3. Datenerfassung auf dieser Website
            </h2>
            <h3 className="text-lg font-semibold text-on-surface mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
              die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
              Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
            </p>
            <p className="mt-4">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="text-lg font-semibold text-on-surface mt-6 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
              von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              4. Hosting
            </h2>
            <p>
              Diese Website wird auf Servern in Deutschland gehostet. Sämtliche personenbezogene Daten werden
              ausschließlich auf deutschen Servern verarbeitet und gespeichert. Ein Transfer in Drittländer
              findet nicht statt.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              5. Ihre Rechte
            </h2>
            <p>Sie haben das Recht auf:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer gespeicherten personenbezogenen Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt,
              haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              6. SSL/TLS-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
              eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran,
              dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt.
            </p>
          </div>

          <div className="border-t border-outline-variant/20 pt-8 text-sm">
            <p>
              Diese Datenschutzerklärung gilt für tierarzt-telefonbot.de, ein Service der DigiRift GmbH, Hamburg.<br />
              Stand: April 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
