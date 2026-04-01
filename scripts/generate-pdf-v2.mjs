import ReactPDF from "@react-pdf/renderer";
import { Document, Page, Text, View, Image, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { createElement as h } from "react";
import { resolve } from "path";
import { mkdirSync } from "fs";

const OUT = resolve(import.meta.dirname, "../public/downloads/dsgvo-leitfaden-tierarzt.pdf");
mkdirSync(resolve(import.meta.dirname, "../public/downloads"), { recursive: true });

/* ── Fonts ── */
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYAZ9hjQ.ttf", fontWeight: 800 },
  ],
});

/* ── Colors ── */
const teal = "#1a7a6d";
const tealDark = "#135c53";
const tealLight = "#e6f5f2";
const red = "#c0392b";
const gray = { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 400: "#9ca3af", 500: "#6b7280", 700: "#374151", 800: "#1f2937" };

/* ── Base styles ── */
const s = StyleSheet.create({
  page: { fontFamily: "Inter", fontSize: 10, color: gray[700], paddingTop: 50, paddingBottom: 50, paddingHorizontal: 50 },
  // Cover
  cover: { fontFamily: "Inter", backgroundColor: teal, color: "white", justifyContent: "space-between", alignItems: "center", paddingVertical: 140, paddingHorizontal: 50 },
  coverBadge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 18, fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 30 },
  coverTitle: { fontSize: 36, fontWeight: 800, textAlign: "center", lineHeight: 1.2, marginBottom: 16 },
  coverSubtitle: { fontSize: 18, fontWeight: 600, textAlign: "center", opacity: 0.9, marginBottom: 16 },
  coverDesc: { fontSize: 11, textAlign: "center", opacity: 0.7, maxWidth: 320, lineHeight: 1.6 },
  coverFooter: { textAlign: "center" },
  coverFooterBold: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  coverFooterSub: { fontSize: 10, opacity: 0.6 },
  // Footer
  footer: { position: "absolute", bottom: 25, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: gray[400] },
  // Section header
  sectionRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 16 },
  sectionBadge: { width: 36, height: 36, borderRadius: 8, backgroundColor: teal, justifyContent: "center", alignItems: "center" },
  sectionBadgeText: { color: "white", fontWeight: 700, fontSize: 14 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: teal },
  sectionSub: { fontSize: 9, color: gray[500], marginTop: 2 },
  hr: { borderBottomWidth: 1, borderBottomColor: gray[200], marginBottom: 16 },
  // Text
  h3: { fontSize: 12, fontWeight: 700, color: gray[800], marginBottom: 6, marginTop: 14 },
  p: { fontSize: 10, lineHeight: 1.7, color: gray[700], marginBottom: 10 },
  bold: { fontWeight: 700 },
  // Check
  checkRow: { flexDirection: "row", gap: 8, marginBottom: 6, alignItems: "flex-start" },
  checkDot: { width: 16, height: 16, borderRadius: 8, justifyContent: "center", alignItems: "center", marginTop: 1 },
  checkMark: { color: "white", fontSize: 9, fontWeight: 700 },
  checkText: { flex: 1, fontSize: 10, lineHeight: 1.6, color: gray[700] },
  // Callout
  callout: { backgroundColor: tealLight, borderLeftWidth: 3, borderLeftColor: teal, borderRadius: 8, padding: 14, marginVertical: 12 },
  calloutText: { fontSize: 10, lineHeight: 1.6, color: gray[700] },
  calloutLabel: { fontWeight: 700, color: teal },
  // Table
  tableHeader: { flexDirection: "row", backgroundColor: teal, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  tableHeaderCell: { color: "white", fontWeight: 600, fontSize: 9, paddingVertical: 8, paddingHorizontal: 12 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: gray[100] },
  tableRowAlt: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: gray[100], backgroundColor: gray[50] },
  tableCell: { fontSize: 9, paddingVertical: 7, paddingHorizontal: 12, color: gray[700] },
  tableCellBold: { fontSize: 9, paddingVertical: 7, paddingHorizontal: 12, color: gray[800], fontWeight: 600 },
  // CTA box
  ctaBox: { borderRadius: 14, paddingVertical: 28, paddingHorizontal: 20, alignItems: "center", marginVertical: 20 },
  ctaTitle: { fontSize: 16, fontWeight: 700, color: "white", marginBottom: 6, textAlign: "center" },
  ctaSub: { fontSize: 10, color: "#b2dfdb", marginBottom: 14, textAlign: "center" },
  ctaBtn: { backgroundColor: "white", borderRadius: 20, paddingVertical: 10, paddingHorizontal: 28 },
  ctaBtnText: { color: teal, fontWeight: 700, fontSize: 11 },
  // Author card
  authorCard: { flexDirection: "row", gap: 14, backgroundColor: gray[50], borderRadius: 14, padding: 14, marginBottom: 28, alignItems: "center" },
  authorImg: { width: 48, height: 48, borderRadius: 24 },
  authorName: { fontSize: 11, fontWeight: 700, color: gray[800] },
  authorRole: { fontSize: 9, color: gray[500] },
  // TOC
  tocRow: { flexDirection: "row", gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: gray[100], alignItems: "center" },
  tocNum: { fontWeight: 700, fontSize: 10, color: teal, width: 24 },
  tocText: { fontSize: 10, color: gray[800], flex: 1 },
  // Tip
  tipRow: { flexDirection: "row", gap: 8, alignItems: "flex-start", marginBottom: 4 },
  tipBadge: { width: 24, height: 24, borderRadius: 6, backgroundColor: teal, justifyContent: "center", alignItems: "center" },
  tipBadgeText: { color: "white", fontWeight: 700, fontSize: 10 },
  tipTitle: { fontSize: 11, fontWeight: 700, color: gray[800], marginTop: 3 },
  tipText: { fontSize: 10, lineHeight: 1.6, color: gray[700], marginLeft: 32, marginBottom: 14 },
});

/* ── Components ── */
const Footer = ({ num }) => h(View, { style: s.footer, fixed: true },
  h(Text, null, "tierarzt-telefonbot.de — DSGVO-Leitfaden"),
  h(Text, { render: ({ pageNumber }) => `Seite ${pageNumber}` })
);

const SectionHeader = ({ num, title, subtitle }) => h(View, { wrap: false },
  h(View, { style: s.sectionRow },
    h(View, { style: s.sectionBadge }, h(Text, { style: s.sectionBadgeText }, num)),
    h(View, null,
      h(Text, { style: s.sectionTitle }, title),
      h(Text, { style: s.sectionSub }, subtitle),
    ),
  ),
  h(View, { style: s.hr }),
);

const CheckItem = ({ children, color = teal }) => h(View, { style: s.checkRow, wrap: false },
  h(View, { style: [s.checkDot, { backgroundColor: color }] }, h(Text, { style: s.checkMark }, "✓")),
  h(Text, { style: s.checkText }, children),
);

const Callout = ({ label, children, borderColor = teal }) => h(View, { style: [s.callout, { borderLeftColor: borderColor }], wrap: false },
  h(Text, { style: s.calloutText },
    h(Text, { style: s.calloutLabel }, `${label} `),
    children,
  ),
);

const Block = ({ children }) => h(View, { wrap: false }, children);

const PHOTO = resolve(import.meta.dirname, "../public/images/kamil-gawlik.jpg");

/* ── Document ── */
const MyDoc = () => h(Document, { title: "DSGVO-Leitfaden — KI-Telefonie in der Tierarztpraxis", author: "DigiRift GmbH" },

  /* ── Cover ── */
  h(Page, { size: "A4", style: s.cover },
    h(View, { style: { alignItems: "center" } },
      h(Text, { style: s.coverBadge }, "KOSTENLOSER LEITFADEN"),
      h(Text, { style: s.coverTitle }, "KI-Telefonie in der\nTierarztpraxis"),
      h(Text, { style: s.coverSubtitle }, "Der DSGVO-Leitfaden"),
      h(Text, { style: s.coverDesc }, "Alles was Sie über Datenschutz, AV-Verträge und den EU-AI-Act wissen müssen — verständlich erklärt, mit konkreten Checklisten."),
    ),
    h(View, { style: s.coverFooter },
      h(Text, { style: s.coverFooterBold }, "tierarzt-telefonbot.de"),
      h(Text, { style: s.coverFooterSub }, "Ein Service der DigiRift GmbH, Hamburg"),
    ),
  ),

  /* ── Über + Inhalt ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(View, { style: s.authorCard },
      h(Image, { src: PHOTO, style: s.authorImg }),
      h(View, null,
        h(Text, { style: s.authorName }, "Kamil Gawlik"),
        h(Text, { style: s.authorRole }, "Geschäftsführer, DigiRift GmbH"),
        h(Text, { style: s.authorRole }, "info@digirift.com"),
      ),
    ),
    h(Text, { style: { fontSize: 20, fontWeight: 700, color: teal, marginBottom: 10 } }, "Über diesen Leitfaden"),
    h(Text, { style: s.p }, "KI-Telefonbots revolutionieren den Praxisalltag: Terminbuchungen, Notfall-Triage, Rezeptbestellungen — alles automatisiert. Doch mit großer Technologie kommt große Verantwortung. Datenschutz in der Tierarztpraxis ist ein sensibles Thema, und die rechtlichen Anforderungen an KI-Telefonie sind komplex."),
    h(Text, { style: [s.p, { marginBottom: 24 }] }, "Dieser Leitfaden bringt Klarheit. Kein Juristendeutsch, sondern verständliche Erklärungen mit konkreten Checklisten, die Sie sofort in Ihrer Praxis anwenden können."),
    h(Text, { style: { fontSize: 14, fontWeight: 700, color: gray[800], marginBottom: 12 } }, "Inhalt"),
    ...[
      ["01", "Was darf ein KI-Telefonbot?", "Rechtlicher Rahmen und Grenzen"],
      ["02", "DSGVO-Anforderungen", "Schritt für Schritt erklärt"],
      ["03", "Der AV-Vertrag", "Checkliste für Ihre Praxis"],
      ["04", "EU-AI-Act", "Was bedeutet das konkret?"],
      ["05", "5 Praxis-Tipps", "Sofort umsetzbar"],
    ].map(([num, title, sub]) =>
      h(View, { key: num, style: s.tocRow },
        h(Text, { style: s.tocNum }, num),
        h(Text, { style: s.tocText }, h(Text, { style: s.bold }, title), ` — ${sub}`),
      ),
    ),
    h(Callout, { label: "Hinweis:" }, "Dieser Leitfaden dient der allgemeinen Information und ersetzt keine Rechtsberatung. Bei konkreten rechtlichen Fragen wenden Sie sich bitte an einen spezialisierten Anwalt."),
  ),

  /* ── Kapitel 1 ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(SectionHeader, { num: "1", title: "Was darf ein KI-Telefonbot?", subtitle: "Rechtlicher Rahmen und Grenzen" }),
    h(Text, { style: s.p }, "Ein KI-Telefonbot in der Tierarztpraxis bewegt sich in einem klar definierten rechtlichen Rahmen. Die gute Nachricht: Vieles ist erlaubt. Aber es gibt wichtige Grenzen."),
    h(Text, { style: s.h3 }, "Das darf der Bot"),
    h(CheckItem, null, "Anrufe entgegennehmen und Informationen geben (Öffnungszeiten, Adresse, Anfahrt)"),
    h(CheckItem, null, "Termine vereinbaren und in den Praxiskalender eintragen"),
    h(CheckItem, null, "Rezeptbestellungen aufnehmen und an die Praxis weiterleiten"),
    h(CheckItem, null, "Notfälle erkennen und an den diensthabenden Tierarzt weiterleiten"),
    h(CheckItem, null, "Standardfragen beantworten (Kosten, Behandlungsangebote, Parkplätze)"),
    h(CheckItem, null, "Erinnerungen für Impfungen und Entwurmungen versenden"),
    h(Text, { style: [s.h3, { marginTop: 20 }] }, "Das darf der Bot nicht"),
    h(CheckItem, { color: red }, "Medizinische Diagnosen stellen oder Behandlungsempfehlungen geben"),
    h(CheckItem, { color: red }, "Medikamente verschreiben oder Dosierungen ändern"),
    h(CheckItem, { color: red }, "Gesundheitsdaten ohne Einwilligung speichern oder weitergeben"),
    h(CheckItem, { color: red }, "Anrufer täuschen — der Bot muss sich als KI identifizieren"),
    h(Callout, { label: "Wichtig:" }, "Bei Notfällen darf der Bot keine medizinische Einschätzung abgeben. Er darf aber Symptome erfassen und den Anruf priorisiert weiterleiten. Das ist der entscheidende Unterschied."),
  ),

  /* ── Kapitel 2 ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(SectionHeader, { num: "2", title: "DSGVO-Anforderungen", subtitle: "Schritt für Schritt erklärt" }),
    h(Text, { style: s.p }, "Die DSGVO stellt klare Anforderungen an den Einsatz von KI-Telefonie. Hier sind die wichtigsten Punkte, die Sie als Praxisinhaber kennen müssen."),

    h(Block, null,
      h(Text, { style: s.h3 }, "1. Transparenzpflicht (Art. 13/14 DSGVO)"),
      h(Text, { style: s.p }, "Anrufer müssen zu Beginn des Gesprächs darüber informiert werden, dass sie mit einer KI sprechen. Das muss klar und verständlich geschehen — nicht versteckt in einem langen Disclaimer."),
    ),
    h(Callout, { label: "Beispiel:" }, "\u201ETierarztpraxis am Stadtpark, guten Tag! Mein Name ist Mia, ich bin die KI-Telefonassistentin der Praxis. Wie kann ich Ihnen helfen?\u201C"),

    h(Block, null,
      h(Text, { style: s.h3 }, "2. Rechtsgrundlage (Art. 6 DSGVO)"),
      h(Text, { style: s.p }, "Die Verarbeitung der Anrufdaten stützt sich auf das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO) an einer effizienten Praxisorganisation. Für besonders sensible Daten (z.B. Gesundheitsdaten des Tieres in Verbindung mit dem Halter) kann eine explizite Einwilligung erforderlich sein."),
    ),

    h(Block, null,
      h(Text, { style: s.h3 }, "3. Datensparsamkeit (Art. 5 DSGVO)"),
      h(Text, { style: s.p }, "Der Bot darf nur die Daten erfassen, die für den jeweiligen Zweck notwendig sind. Für eine Terminbuchung: Name, Tierart, Grund des Besuchs, gewünschter Zeitraum. Nicht: Geburtsdatum des Halters, Krankengeschichte des Tieres, Zahlungsinformationen."),
    ),

    h(Block, null,
      h(Text, { style: s.h3 }, "4. Speicherbegrenzung (Art. 5 DSGVO)"),
      h(Text, { style: s.p }, "Anrufdaten dürfen nicht unbegrenzt gespeichert werden. Definieren Sie klare Löschfristen:"),
      h(View, { style: s.tableHeader },
        h(Text, { style: [s.tableHeaderCell, { width: "50%" }] }, "Datentyp"),
        h(Text, { style: [s.tableHeaderCell, { width: "50%" }] }, "Empfohlene Löschfrist"),
      ),
      ...[
        ["Gesprächsprotokolle", "30 Tage"],
        ["Terminbuchungen", "Bis zur Durchführung + 7 Tage"],
        ["Rezeptanfragen", "Bis zur Bearbeitung + 30 Tage"],
        ["Notfall-Dokumentation", "90 Tage (Haftungsgründe)"],
      ].map(([typ, frist], i) =>
        h(View, { key: i, style: i % 2 === 0 ? s.tableRowAlt : s.tableRow },
          h(Text, { style: [s.tableCell, { width: "50%" }] }, typ),
          h(Text, { style: [s.tableCell, { width: "50%" }] }, frist),
        ),
      ),
    ),

    h(Block, null,
      h(Text, { style: s.h3 }, "5. Hosting in Deutschland (Art. 44-49 DSGVO)"),
      h(Text, { style: s.p }, "Alle Daten müssen auf Servern in der EU, idealerweise in Deutschland, verarbeitet werden. Ein Datentransfer in Drittländer (z.B. USA) ist für Gesundheitsdaten besonders kritisch und sollte vermieden werden."),
    ),
  ),

  /* ── Kapitel 3 ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(SectionHeader, { num: "3", title: "Der AV-Vertrag", subtitle: "Checkliste für Ihre Praxis" }),
    h(Text, { style: s.p }, "Wenn ein externer Dienstleister (wie DigiRift) den KI-Telefonbot für Ihre Praxis betreibt, ist ein Auftragsverarbeitungsvertrag (AV-Vertrag) gemäß Art. 28 DSGVO Pflicht. Hier ist Ihre Checkliste — prüfen Sie jeden Punkt bevor Sie unterschreiben."),
    h(Text, { style: s.h3 }, "AV-Vertrag Checkliste"),
    ...[
      ["Gegenstand und Dauer", "Was wird verarbeitet? Wie lange?"],
      ["Art der Daten", "Welche personenbezogenen Daten genau? (Name, Telefonnummer, Anliegen)"],
      ["Kreis der Betroffenen", "Wer ist betroffen? (Anrufer = Tierbesitzer)"],
      ["Weisungsgebundenheit", "Der Dienstleister handelt nur nach Ihrer Weisung"],
      ["Vertraulichkeit", "Mitarbeiter des Dienstleisters sind zur Vertraulichkeit verpflichtet"],
      ["Technische Maßnahmen", "Verschlüsselung, Zugriffskontrollen, Backup-Konzept"],
      ["Unterauftragnehmer", "Wer ist sonst noch beteiligt? (Cloud-Provider, TTS-Anbieter)"],
      ["Löschpflichten", "Was passiert mit den Daten nach Vertragsende?"],
      ["Audit-Recht", "Sie dürfen die Einhaltung überprüfen (lassen)"],
      ["Meldepflicht", "Bei Datenpannen: Benachrichtigung innerhalb von 24-72 Stunden"],
    ].map(([title, desc], i) =>
      h(CheckItem, { key: i }, h(Text, { style: s.bold }, title), ` — ${desc}`),
    ),
    h(Callout, { label: "Bei DigiRift:" }, "Der AV-Vertrag ist Teil unseres Full-Service-Pakets. Sie erhalten ihn fertig vorbereitet — Sie müssen ihn nur noch unterschreiben. Alle oben genannten Punkte sind standardmäßig enthalten."),
    h(View, { style: [s.ctaBox, { backgroundColor: teal }], wrap: false },
      h(Text, { style: s.ctaTitle }, "Fragen zum AV-Vertrag?"),
      h(Text, { style: s.ctaSub }, "Wir erklären Ihnen jeden Punkt im kostenlosen Erstgespräch."),
      h(View, { style: s.ctaBtn }, h(Text, { style: s.ctaBtnText }, "info@digirift.com")),
    ),
  ),

  /* ── Kapitel 4 ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(SectionHeader, { num: "4", title: "EU-AI-Act", subtitle: "Was bedeutet das konkret für Ihre Praxis?" }),
    h(Text, { style: s.p }, "Der EU-AI-Act ist seit 2024 in Kraft und regelt den Einsatz von KI-Systemen in der EU. Für KI-Telefonbots in Tierarztpraxen gelten spezifische Anforderungen."),

    h(Block, null,
      h(Text, { style: s.h3 }, "Risikoklassifizierung"),
      h(Text, { style: s.p }, "KI-Telefonbots in Tierarztpraxen fallen in die Kategorie \u201Ebegrenztes Risiko\u201C. Das bedeutet: Es gelten Transparenzpflichten, aber keine Zulassungspflicht."),
    ),

    h(View, { wrap: false },
      h(View, { style: s.tableHeader },
        h(Text, { style: [s.tableHeaderCell, { width: "28%" }] }, "Anforderung"),
        h(Text, { style: [s.tableHeaderCell, { width: "40%" }] }, "Was das bedeutet"),
        h(Text, { style: [s.tableHeaderCell, { width: "32%" }] }, "Wer ist zuständig?"),
      ),
      ...[
        ["Transparenz", "Anrufer wissen, dass sie mit KI sprechen", "Der Bot (automatisch)"],
        ["Dokumentation", "Funktionsweise des Bots ist dokumentiert", "Der Anbieter (DigiRift)"],
        ["Menschliche Aufsicht", "Ein Mensch kann jederzeit eingreifen", "Ihre Praxis + DigiRift"],
        ["Datenqualität", "Training mit korrekten, aktuellen Daten", "Der Anbieter (DigiRift)"],
      ].map(([a, b, c], i) =>
        h(View, { key: i, style: i % 2 === 0 ? s.tableRowAlt : s.tableRow },
          h(Text, { style: [s.tableCellBold, { width: "28%" }] }, a),
          h(Text, { style: [s.tableCell, { width: "40%" }] }, b),
          h(Text, { style: [s.tableCell, { width: "32%" }] }, c),
        ),
      ),
    ),

    h(Block, null,
      h(Text, { style: s.h3 }, "Was müssen SIE tun?"),
      h(Text, { style: s.p }, h(Text, null, "Kurze Antwort: "), h(Text, { style: s.bold }, "Nichts.")),
      h(Text, { style: s.p }, "Die Transparenzpflicht wird vom Bot selbst erfüllt (er stellt sich als KI vor). Die Dokumentationspflicht liegt beim Anbieter. Die technischen Anforderungen werden von der Infrastruktur erfüllt. Sie als Praxisinhaber müssen lediglich sicherstellen, dass ein Mensch (Sie oder Ihr Team) bei Bedarf erreichbar ist — was ohnehin der Fall ist."),
    ),
    h(Callout, { label: "Achtung bei anderen Anbietern:", borderColor: red }, "Nicht alle KI-Telefonbot-Anbieter erfüllen den EU-AI-Act. Fragen Sie nach der Dokumentation zur Risikoklassifizierung und den technischen Maßnahmen. Wenn Ihr Anbieter keine Antwort hat, ist das ein Warnsignal."),
  ),

  /* ── Kapitel 5 ── */
  h(Page, { size: "A4", style: s.page },
    h(Footer, null),
    h(SectionHeader, { num: "5", title: "5 Praxis-Tipps", subtitle: "Sofort umsetzbar" }),
    h(Text, { style: s.p }, "Diese fünf konkreten Tipps können Sie sofort umsetzen — unabhängig davon, ob Sie bereits einen KI-Telefonbot einsetzen oder erst planen."),
    ...[
      ["1", "Datenschutzerklärung aktualisieren", "Ergänzen Sie Ihre Datenschutzerklärung um einen Abschnitt zur KI-Telefonie. Nennen Sie den Anbieter, den Zweck der Datenverarbeitung und die Rechtsgrundlage. Wir liefern Ihnen den Text fertig formuliert."],
      ["2", "Verarbeitungsverzeichnis ergänzen", "Die KI-Telefonie gehört in Ihr Verarbeitungsverzeichnis nach Art. 30 DSGVO. Dokumentieren Sie: welche Daten, warum, wie lange, und an wen sie weitergegeben werden."],
      ["3", "Team informieren", "Schulen Sie Ihr Praxisteam zum Thema KI-Telefonie. Jeder sollte wissen: Was macht der Bot? Was macht er nicht? An wen werden Anrufe weitergeleitet? Wie können Anrufer einen Menschen erreichen?"],
      ["4", "Notfall-Prozess definieren", "Definieren Sie klar, wie der Bot mit Notfällen umgeht. Wer ist der diensthabende Tierarzt? Wie erreicht der Bot ihn? Was passiert, wenn niemand erreichbar ist? Diese Prozesse müssen vorher stehen."],
      ["5", "Regelmäßig überprüfen", "Planen Sie eine vierteljährliche Überprüfung: Stimmen die Öffnungszeiten noch? Sind die richtigen Telefonnummern hinterlegt? Gibt es neue Behandlungen, die der Bot kennen sollte?"],
    ].map(([num, title, text]) =>
      h(View, { key: num, wrap: false },
        h(View, { style: s.tipRow },
          h(View, { style: s.tipBadge }, h(Text, { style: s.tipBadgeText }, num)),
          h(Text, { style: s.tipTitle }, title),
        ),
        h(Text, { style: s.tipText }, text),
      ),
    ),
    h(Callout, { label: "Unser Angebot:" }, "Als DigiRift-Kunde müssen Sie sich um die Punkte 1-4 nicht selbst kümmern. Wir liefern alle Dokumente, schulen Ihr Team und definieren die Prozesse gemeinsam mit Ihnen. Punkt 5 übernehmen wir ebenfalls — als Teil unserer laufenden Betreuung."),
  ),

  /* ── Abschluss ── */
  h(Page, { size: "A4", style: [s.page, { justifyContent: "center", alignItems: "center" }] },
    h(Text, { style: { fontSize: 24, fontWeight: 800, color: gray[800], textAlign: "center", marginBottom: 16 } }, "Bereit für datenschutzkonforme\nKI-Telefonie?"),
    h(Text, { style: { fontSize: 12, color: gray[500], textAlign: "center", maxWidth: 340, lineHeight: 1.6, marginBottom: 30 } }, "Im kostenlosen Erstgespräch klären wir alle Ihre Fragen — zu Datenschutz, Technik und Kosten. Unverbindlich, in 30 Minuten."),
    h(View, { style: [s.ctaBox, { backgroundColor: teal, width: 320 }] },
      h(Text, { style: s.ctaTitle }, "Erstgespräch vereinbaren"),
      h(View, { style: s.ctaBtn }, h(Text, { style: s.ctaBtnText }, "info@digirift.com")),
      h(Text, { style: { fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 10 } }, "oder besuchen Sie tierarzt-telefonbot.de/kontakt"),
    ),
    h(View, { style: { alignItems: "center", marginTop: 30 } },
      h(Text, { style: { fontSize: 11, fontWeight: 700, color: gray[700] } }, "DigiRift GmbH"),
      h(Text, { style: { fontSize: 10, color: gray[500] } }, "Kamil Gawlik, Geschäftsführer"),
      h(Text, { style: { fontSize: 10, color: gray[500] } }, "Hamburg, Deutschland"),
      h(Text, { style: { fontSize: 10, color: gray[500] } }, "info@digirift.com"),
      h(Text, { style: { fontSize: 11, fontWeight: 600, color: teal, marginTop: 12 } }, "tierarzt-telefonbot.de"),
    ),
  ),
);

console.log("Generating PDF...");
await ReactPDF.render(h(MyDoc), OUT);
console.log(`Done: ${OUT}`);
