import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DSGVO-Leitfaden — KI-Telefonie in der Tierarztpraxis",
  robots: "noindex, nofollow",
};

const teal = "#1a7a6d";
const tealLight = "#e6f5f2";
const tealDark = "#135c53";
const red = "#c0392b";

function Check({ children, color = teal }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-start gap-3 py-2" style={{ breakInside: "avoid" }}>
      <svg width="20" height="20" viewBox="0 0 20 20" className="shrink-0 mt-0.5">
        <circle cx="10" cy="10" r="10" fill={color} />
        <path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-sm leading-relaxed text-gray-700">{children}</span>
    </div>
  );
}

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <>
      <div className="flex items-start gap-4 mb-6" style={{ breakAfter: "avoid", breakInside: "avoid" }}>
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: teal }}
        >
          {num}
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: teal }}>{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <hr className="border-gray-200 mb-6" style={{ breakAfter: "avoid" }} />
    </>
  );
}

function Callout({ label, children, borderColor = teal }: { label: string; children: React.ReactNode; borderColor?: string }) {
  return (
    <div
      className="rounded-xl p-5 my-6"
      style={{ backgroundColor: tealLight, borderLeft: `4px solid ${borderColor}`, breakInside: "avoid" }}
    >
      <p className="text-sm leading-relaxed text-gray-700">
        <strong style={{ color: teal }}>{label}</strong> {children}
      </p>
    </div>
  );
}

function CtaBox({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="rounded-2xl p-8 text-center my-8"
      style={{ background: `linear-gradient(135deg, ${teal}, ${tealDark})`, breakInside: "avoid" }}
    >
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm mb-5" style={{ color: "#b2dfdb" }}>{subtitle}</p>
      <div className="inline-block bg-white rounded-full px-8 py-3 font-bold" style={{ color: teal }}>
        info@digirift.com
      </div>
    </div>
  );
}

/* Wrapper: keeps heading + text together */
function Block({ children }: { children: React.ReactNode }) {
  return <div className="mb-6" style={{ breakInside: "avoid" }}>{children}</div>;
}

/* Page padding for content pages */
const pagePad = "20mm 20mm 10mm";

export default function DsgvoLeitfadenEbook() {
  return (
    <div className="bg-white text-gray-800" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* COVER                                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col justify-between"
        style={{
          background: `linear-gradient(160deg, ${teal} 0%, ${tealDark} 100%)`,
          height: "297mm",
          width: "210mm",
          padding: "60mm 20mm 30mm",
          pageBreakAfter: "always",
        }}
      >
        <div className="text-center">
          <div className="inline-block bg-white/20 rounded-full px-6 py-2 text-white text-xs font-semibold tracking-widest uppercase mb-10">
            Kostenloser Leitfaden
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            KI-Telefonie in der<br />Tierarztpraxis
          </h1>
          <p className="text-2xl font-semibold text-white/90 mb-6">
            Der DSGVO-Leitfaden
          </p>
          <p className="text-base text-white/70 max-w-md mx-auto leading-relaxed">
            Alles was Sie über Datenschutz, AV-Verträge und den EU-AI-Act
            wissen müssen — verständlich erklärt, mit konkreten Checklisten.
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white mb-1">tierarzt-telefonbot.de</p>
          <p className="text-sm text-white/60">Ein Service der DigiRift GmbH, Hamburg</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Über diesen Leitfaden + Inhalt                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad }}>
        <div className="flex items-center gap-5 bg-gray-50 rounded-2xl p-5 mb-10" style={{ breakInside: "avoid" }}>
          <Image
            src="/images/kamil-gawlik.jpg"
            alt="Kamil Gawlik"
            width={64}
            height={64}
            className="shrink-0 w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">Kamil Gawlik</p>
            <p className="text-sm text-gray-500">Geschäftsführer, DigiRift GmbH</p>
            <p className="text-sm text-gray-500">info@digirift.com</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4" style={{ color: teal }}>Über diesen Leitfaden</h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-3">
          KI-Telefonbots revolutionieren den Praxisalltag: Terminbuchungen, Notfall-Triage,
          Rezeptbestellungen — alles automatisiert. Doch mit großer Technologie kommt große
          Verantwortung. Datenschutz in der Tierarztpraxis ist ein sensibles Thema, und die
          rechtlichen Anforderungen an KI-Telefonie sind komplex.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mb-10">
          Dieser Leitfaden bringt Klarheit. Kein Juristendeutsch, sondern verständliche Erklärungen
          mit konkreten Checklisten, die Sie sofort in Ihrer Praxis anwenden können.
        </p>

        <div style={{ breakInside: "avoid" }}>
          <h3 className="text-lg font-bold text-gray-800 mb-5">Inhalt</h3>
          {[
            { num: "01", title: "Was darf ein KI-Telefonbot?", sub: "Rechtlicher Rahmen und Grenzen" },
            { num: "02", title: "DSGVO-Anforderungen", sub: "Schritt für Schritt erklärt" },
            { num: "03", title: "Der AV-Vertrag", sub: "Checkliste für Ihre Praxis" },
            { num: "04", title: "EU-AI-Act", sub: "Was bedeutet das konkret?" },
            { num: "05", title: "5 Praxis-Tipps", sub: "Sofort umsetzbar" },
          ].map((ch) => (
            <div key={ch.num} className="flex items-center gap-4 py-3 border-b border-gray-100">
              <span className="font-bold text-sm" style={{ color: teal, minWidth: "2rem" }}>{ch.num}</span>
              <span className="text-sm text-gray-800">
                <strong>{ch.title}</strong> — {ch.sub}
              </span>
            </div>
          ))}
        </div>

        <Callout label="Hinweis:">
          Dieser Leitfaden dient der allgemeinen Information und ersetzt keine
          Rechtsberatung. Bei konkreten rechtlichen Fragen wenden Sie sich bitte an einen
          spezialisierten Anwalt.
        </Callout>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Kapitel 1 — Was darf ein KI-Telefonbot?                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad, pageBreakBefore: "always" }}>
        <SectionHeader num="1" title="Was darf ein KI-Telefonbot?" subtitle="Rechtlicher Rahmen und Grenzen" />

        <p className="text-sm leading-relaxed text-gray-700 mb-8">
          Ein KI-Telefonbot in der Tierarztpraxis bewegt sich in einem klar definierten rechtlichen
          Rahmen. Die gute Nachricht: Vieles ist erlaubt. Aber es gibt wichtige Grenzen.
        </p>

        <h3 className="font-bold text-gray-800 mb-4" style={{ breakAfter: "avoid" }}>Das darf der Bot</h3>
        <Check>Anrufe entgegennehmen und Informationen geben (Öffnungszeiten, Adresse, Anfahrt)</Check>
        <Check>Termine vereinbaren und in den Praxiskalender eintragen</Check>
        <Check>Rezeptbestellungen aufnehmen und an die Praxis weiterleiten</Check>
        <Check>Notfälle erkennen und an den diensthabenden Tierarzt weiterleiten</Check>
        <Check>Standardfragen beantworten (Kosten, Behandlungsangebote, Parkplätze)</Check>
        <Check>Erinnerungen für Impfungen und Entwurmungen versenden</Check>

        <h3 className="font-bold text-gray-800 mt-8 mb-4" style={{ breakAfter: "avoid" }}>Das darf der Bot nicht</h3>
        <Check color={red}>Medizinische Diagnosen stellen oder Behandlungsempfehlungen geben</Check>
        <Check color={red}>Medikamente verschreiben oder Dosierungen ändern</Check>
        <Check color={red}>Gesundheitsdaten ohne Einwilligung speichern oder weitergeben</Check>
        <Check color={red}>Anrufer täuschen — der Bot muss sich als KI identifizieren</Check>

        <Callout label="Wichtig:">
          Bei Notfällen darf der Bot keine medizinische Einschätzung abgeben. Er
          darf aber Symptome erfassen und den Anruf priorisiert weiterleiten. Das ist der
          entscheidende Unterschied.
        </Callout>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Kapitel 2 — DSGVO-Anforderungen                               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad, pageBreakBefore: "always" }}>
        <SectionHeader num="2" title="DSGVO-Anforderungen" subtitle="Schritt für Schritt erklärt" />

        <p className="text-sm leading-relaxed text-gray-700 mb-6">
          Die DSGVO stellt klare Anforderungen an den Einsatz von KI-Telefonie. Hier sind die
          wichtigsten Punkte, die Sie als Praxisinhaber kennen müssen.
        </p>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">1. Transparenzpflicht (Art. 13/14 DSGVO)</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            Anrufer müssen zu Beginn des Gesprächs darüber informiert werden, dass sie mit einer KI
            sprechen. Das muss klar und verständlich geschehen — nicht versteckt in einem langen Disclaimer.
          </p>
        </Block>

        <Callout label="Beispiel:">
          „Tierarztpraxis am Stadtpark, guten Tag! Mein Name ist Mia, ich bin die KI-Telefonassistentin
          der Praxis. Wie kann ich Ihnen helfen?"
        </Callout>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">2. Rechtsgrundlage (Art. 6 DSGVO)</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            Die Verarbeitung der Anrufdaten stützt sich auf das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO)
            an einer effizienten Praxisorganisation. Für besonders sensible Daten (z.B. Gesundheitsdaten des
            Tieres in Verbindung mit dem Halter) kann eine explizite Einwilligung erforderlich sein.
          </p>
        </Block>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">3. Datensparsamkeit (Art. 5 DSGVO)</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            Der Bot darf nur die Daten erfassen, die für den jeweiligen Zweck notwendig sind. Für eine
            Terminbuchung: Name, Tierart, Grund des Besuchs, gewünschter Zeitraum. Nicht:
            Geburtsdatum des Halters, Krankengeschichte des Tieres, Zahlungsinformationen.
          </p>
        </Block>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">4. Speicherbegrenzung (Art. 5 DSGVO)</h3>
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            Anrufdaten dürfen nicht unbegrenzt gespeichert werden. Definieren Sie klare Löschfristen:
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: teal }}>
                <th className="text-left text-white font-semibold px-4 py-2.5 rounded-tl-lg">Datentyp</th>
                <th className="text-left text-white font-semibold px-4 py-2.5 rounded-tr-lg">Empfohlene Löschfrist</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Gesprächsprotokolle", "30 Tage"],
                ["Terminbuchungen", "Bis zur Durchführung + 7 Tage"],
                ["Rezeptanfragen", "Bis zur Bearbeitung + 30 Tage"],
                ["Notfall-Dokumentation", "90 Tage (Haftungsgründe)"],
              ].map(([typ, frist], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-2.5 text-gray-700">{typ}</td>
                  <td className="px-4 py-2.5 text-gray-700">{frist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Block>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">5. Hosting in Deutschland (Art. 44-49 DSGVO)</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            Alle Daten müssen auf Servern in der EU, idealerweise in Deutschland, verarbeitet werden.
            Ein Datentransfer in Drittländer (z.B. USA) ist für Gesundheitsdaten besonders kritisch und
            sollte vermieden werden.
          </p>
        </Block>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Kapitel 3 — Der AV-Vertrag                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad, pageBreakBefore: "always" }}>
        <SectionHeader num="3" title="Der AV-Vertrag" subtitle="Checkliste für Ihre Praxis" />

        <p className="text-sm leading-relaxed text-gray-700 mb-6">
          Wenn ein externer Dienstleister (wie DigiRift) den KI-Telefonbot für Ihre Praxis betreibt, ist
          ein Auftragsverarbeitungsvertrag (AV-Vertrag) gemäß Art. 28 DSGVO Pflicht. Hier ist Ihre
          Checkliste — prüfen Sie jeden Punkt bevor Sie unterschreiben.
        </p>

        <h3 className="font-bold text-gray-800 mb-4" style={{ breakAfter: "avoid" }}>AV-Vertrag Checkliste</h3>
        <Check><strong>Gegenstand und Dauer</strong> — Was wird verarbeitet? Wie lange?</Check>
        <Check><strong>Art der Daten</strong> — Welche personenbezogenen Daten genau? (Name, Telefonnummer, Anliegen)</Check>
        <Check><strong>Kreis der Betroffenen</strong> — Wer ist betroffen? (Anrufer = Tierbesitzer)</Check>
        <Check><strong>Weisungsgebundenheit</strong> — Der Dienstleister handelt nur nach Ihrer Weisung</Check>
        <Check><strong>Vertraulichkeit</strong> — Mitarbeiter des Dienstleisters sind zur Vertraulichkeit verpflichtet</Check>
        <Check><strong>Technische Maßnahmen</strong> — Verschlüsselung, Zugriffskontrollen, Backup-Konzept</Check>
        <Check><strong>Unterauftragnehmer</strong> — Wer ist sonst noch beteiligt? (Cloud-Provider, TTS-Anbieter)</Check>
        <Check><strong>Löschpflichten</strong> — Was passiert mit den Daten nach Vertragsende?</Check>
        <Check><strong>Audit-Recht</strong> — Sie dürfen die Einhaltung überprüfen (lassen)</Check>
        <Check><strong>Meldepflicht</strong> — Bei Datenpannen: Benachrichtigung innerhalb von 24-72 Stunden</Check>

        <Callout label="Bei DigiRift:">
          Der AV-Vertrag ist Teil unseres Full-Service-Pakets. Sie erhalten ihn
          fertig vorbereitet — Sie müssen ihn nur noch unterschreiben. Alle oben genannten
          Punkte sind standardmäßig enthalten.
        </Callout>

        <CtaBox
          title="Fragen zum AV-Vertrag?"
          subtitle="Wir erklären Ihnen jeden Punkt im kostenlosen Erstgespräch."
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Kapitel 4 — EU-AI-Act                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad, pageBreakBefore: "always" }}>
        <SectionHeader num="4" title="EU-AI-Act" subtitle="Was bedeutet das konkret für Ihre Praxis?" />

        <p className="text-sm leading-relaxed text-gray-700 mb-6">
          Der EU-AI-Act ist seit 2024 in Kraft und regelt den Einsatz von KI-Systemen in der EU. Für
          KI-Telefonbots in Tierarztpraxen gelten spezifische Anforderungen.
        </p>

        <Block>
          <h3 className="font-bold text-gray-800 mb-3">Risikoklassifizierung</h3>
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            KI-Telefonbots in Tierarztpraxen fallen in die Kategorie <strong>„begrenztes Risiko"</strong>. Das bedeutet:
            Es gelten Transparenzpflichten, aber keine Zulassungspflicht.
          </p>
        </Block>

        <table className="w-full text-sm mb-6" style={{ breakInside: "avoid" }}>
          <thead>
            <tr style={{ backgroundColor: teal }}>
              <th className="text-left text-white font-semibold px-4 py-2.5 rounded-tl-lg">Anforderung</th>
              <th className="text-left text-white font-semibold px-4 py-2.5">Was das bedeutet</th>
              <th className="text-left text-white font-semibold px-4 py-2.5 rounded-tr-lg">Wer ist zuständig?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Transparenz", "Anrufer wissen, dass sie mit KI sprechen", "Der Bot (automatisch)"],
              ["Dokumentation", "Funktionsweise des Bots ist dokumentiert", "Der Anbieter (DigiRift)"],
              ["Menschliche Aufsicht", "Ein Mensch kann jederzeit eingreifen", "Ihre Praxis + DigiRift"],
              ["Datenqualität", "Training mit korrekten, aktuellen Daten", "Der Anbieter (DigiRift)"],
            ].map(([anf, bed, zust], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2.5 font-medium text-gray-800">{anf}</td>
                <td className="px-4 py-2.5 text-gray-700">{bed}</td>
                <td className="px-4 py-2.5 text-gray-700">{zust}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Block>
          <h3 className="font-bold text-gray-800 mb-2">Was müssen SIE tun?</h3>
          <p className="text-sm leading-relaxed text-gray-700 mb-2">Kurze Antwort: <strong>Nichts.</strong></p>
          <p className="text-sm leading-relaxed text-gray-700">
            Die Transparenzpflicht wird vom Bot selbst erfüllt (er stellt sich als KI vor). Die
            Dokumentationspflicht liegt beim Anbieter. Die technischen Anforderungen werden von
            der Infrastruktur erfüllt. Sie als Praxisinhaber müssen lediglich sicherstellen, dass ein
            Mensch (Sie oder Ihr Team) bei Bedarf erreichbar ist — was ohnehin der Fall ist.
          </p>
        </Block>

        <Callout label="Achtung bei anderen Anbietern:" borderColor={red}>
          Nicht alle KI-Telefonbot-Anbieter erfüllen den EU-AI-Act. Fragen Sie nach der
          Dokumentation zur Risikoklassifizierung und den technischen Maßnahmen. Wenn Ihr
          Anbieter keine Antwort hat, ist das ein Warnsignal.
        </Callout>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Kapitel 5 — 5 Praxis-Tipps                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: pagePad, pageBreakBefore: "always" }}>
        <SectionHeader num="5" title="5 Praxis-Tipps" subtitle="Sofort umsetzbar" />

        <p className="text-sm leading-relaxed text-gray-700 mb-8">
          Diese fünf konkreten Tipps können Sie sofort umsetzen — unabhängig davon, ob Sie bereits
          einen KI-Telefonbot einsetzen oder erst planen.
        </p>

        {[
          {
            num: "1",
            title: "Datenschutzerklärung aktualisieren",
            text: "Ergänzen Sie Ihre Datenschutzerklärung um einen Abschnitt zur KI-Telefonie. Nennen Sie den Anbieter, den Zweck der Datenverarbeitung und die Rechtsgrundlage. Wir liefern Ihnen den Text fertig formuliert.",
          },
          {
            num: "2",
            title: "Verarbeitungsverzeichnis ergänzen",
            text: "Die KI-Telefonie gehört in Ihr Verarbeitungsverzeichnis nach Art. 30 DSGVO. Dokumentieren Sie: welche Daten, warum, wie lange, und an wen sie weitergegeben werden.",
          },
          {
            num: "3",
            title: "Team informieren",
            text: "Schulen Sie Ihr Praxisteam zum Thema KI-Telefonie. Jeder sollte wissen: Was macht der Bot? Was macht er nicht? An wen werden Anrufe weitergeleitet? Wie können Anrufer einen Menschen erreichen?",
          },
          {
            num: "4",
            title: "Notfall-Prozess definieren",
            text: "Definieren Sie klar, wie der Bot mit Notfällen umgeht. Wer ist der diensthabende Tierarzt? Wie erreicht der Bot ihn? Was passiert, wenn niemand erreichbar ist? Diese Prozesse müssen vorher stehen.",
          },
          {
            num: "5",
            title: "Regelmäßig überprüfen",
            text: "Planen Sie eine vierteljährliche Überprüfung: Stimmen die Öffnungszeiten noch? Sind die richtigen Telefonnummern hinterlegt? Gibt es neue Behandlungen, die der Bot kennen sollte?",
          },
        ].map((tip) => (
          <div key={tip.num} className="mb-6" style={{ breakInside: "avoid" }}>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: teal }}
              >
                {tip.num}
              </div>
              <h3 className="font-bold text-gray-800">{tip.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 ml-11">{tip.text}</p>
          </div>
        ))}

        <Callout label="Unser Angebot:">
          Als DigiRift-Kunde müssen Sie sich um die Punkte 1-4 nicht selbst kümmern. Wir
          liefern alle Dokumente, schulen Ihr Team und definieren die Prozesse gemeinsam mit
          Ihnen. Punkt 5 übernehmen wir ebenfalls — als Teil unserer laufenden Betreuung.
        </Callout>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Abschluss / CTA                                               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ height: "297mm", padding: "0 20mm", pageBreakBefore: "always" }}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Bereit für datenschutzkonforme<br />KI-Telefonie?
        </h2>
        <p className="text-base text-gray-600 max-w-md leading-relaxed mb-10">
          Im kostenlosen Erstgespräch klären wir alle Ihre Fragen — zu Datenschutz,
          Technik und Kosten. Unverbindlich, in 30 Minuten.
        </p>

        <div
          className="rounded-2xl p-10 mb-10 w-full max-w-md"
          style={{ background: `linear-gradient(135deg, ${teal}, ${tealDark})` }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Erstgespräch vereinbaren</h3>
          <div className="inline-block bg-white rounded-full px-8 py-3 font-bold mb-4" style={{ color: teal }}>
            info@digirift.com
          </div>
          <p className="text-sm text-white/70">oder besuchen Sie tierarzt-telefonbot.de/kontakt</p>
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p className="font-bold text-gray-700">DigiRift GmbH</p>
          <p>Kamil Gawlik, Geschäftsführer</p>
          <p>Hamburg, Deutschland</p>
          <p>info@digirift.com</p>
          <p className="pt-4 font-semibold" style={{ color: teal }}>tierarzt-telefonbot.de</p>
        </div>
      </div>
    </div>
  );
}
