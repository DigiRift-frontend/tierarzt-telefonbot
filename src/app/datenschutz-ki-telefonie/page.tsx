import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSGVO & KI-Telefonie — Datenschutz in der Tierarztpraxis",
  description:
    "So schützen wir Ihre Daten und die Ihrer Kunden. Deutsche Server, AV-Vertrag inklusive, EU-AI-Act konform.",
};

const sections = [
  {
    icon: "dns",
    title: "Deutsche Server — ausschließlich",
    text: "Alle Anrufdaten, Gesprächsprotokolle und personenbezogenen Informationen werden ausschließlich auf Servern in Deutschland verarbeitet und gespeichert. Es findet kein Datentransfer in Drittländer statt. Unsere Infrastruktur entspricht den höchsten Sicherheitsstandards und wird regelmäßig auditiert.",
  },
  {
    icon: "description",
    title: "Auftragsverarbeitungsvertrag (AV-Vertrag)",
    text: "Der AV-Vertrag gemäß Art. 28 DSGVO ist fester Bestandteil unseres Service und wird vor dem Start der Zusammenarbeit geschlossen. Er regelt exakt, welche Daten wie verarbeitet werden, welche Sicherheitsmaßnahmen gelten und welche Rechte Sie als Auftraggeber haben. Sie müssen sich um nichts kümmern — wir liefern den Vertrag fertig vorbereitet.",
  },
  {
    icon: "record_voice_over",
    title: "KI-Transparenzhinweis",
    text: "Gemäß EU-AI-Act und deutschen Datenschutzbestimmungen werden Anrufer zu Beginn jedes Gespräches darauf hingewiesen, dass sie mit einer künstlichen Intelligenz sprechen. Dieser Hinweis ist in der Begrüßung integriert und wird natürlich und professionell gesprochen — kein störender Roboter-Disclaimer.",
  },
  {
    icon: "lock",
    title: "Verschlüsselte Datenübertragung",
    text: "Alle Kommunikation zwischen den Telefonsystemen und unseren Servern ist Ende-zu-Ende verschlüsselt. Die Anrufdaten werden während der Übertragung und im Ruhezustand verschlüsselt gespeichert. Wir verwenden aktuelle Verschlüsselungsstandards (TLS 1.3, AES-256).",
  },
  {
    icon: "delete_sweep",
    title: "Automatische Datenlöschung",
    text: "Anrufdaten werden nach den mit Ihnen vereinbarten Fristen automatisch gelöscht. Sie bestimmen, wie lange Daten aufbewahrt werden — wir setzen die Fristen technisch um. Standardmäßig werden Gesprächsprotokolle nach 30 Tagen gelöscht, Terminbuchungen bleiben bis zur Durchführung erhalten.",
  },
  {
    icon: "policy",
    title: "Datenschutzfolgenabschätzung (DSFA)",
    text: "Für den Einsatz von KI-Telefonie in medizinischen Einrichtungen empfiehlt die DSGVO eine Datenschutzfolgenabschätzung. Wir erstellen diese für Sie als Teil unseres Service — Sie erhalten ein fertiges Dokument, das Sie Ihrer Aufsichtsbehörde vorlegen können.",
  },
  {
    icon: "gavel",
    title: "EU-AI-Act Konformität",
    text: "Unser KI-Telefonbot erfüllt die Anforderungen des EU-AI-Acts. Die vollständige Dokumentation zu Risikoklassifizierung, Transparenzpflichten und technischen Maßnahmen ist Teil unseres Service. Sie müssen sich nicht selbst mit der Regulierung beschäftigen.",
  },
  {
    icon: "no_accounts",
    title: "Keine Weitergabe an Dritte",
    text: "Anrufdaten werden ausschließlich für den vereinbarten Zweck verarbeitet und niemals an Dritte weitergegeben, verkauft oder für andere Zwecke verwendet. Unsere KI wird nicht mit Ihren Anrufdaten trainiert — Ihre Gespräche bleiben Ihre Gespräche.",
  },
];

export default function DatenschutzKiTelefoniePage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            DSGVO & Compliance
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            Datenschutz, den Sie{" "}
            <span className="text-primary">nicht managen müssen</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            KI-Telefonie in der Tierarztpraxis bringt besondere Datenschutz-Anforderungen mit sich.
            Wir übernehmen die komplette Compliance — Sie müssen sich um nichts kümmern.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-8 md:p-10"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-3">
                    {s.title}
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
            Fragen zum Datenschutz?
          </h2>
          <p className="text-on-surface-variant mb-8">
            Im Erstgespräch klären wir alle Datenschutz-Fragen — und liefern Ihnen die komplette
            Dokumentation als Teil unseres Service.
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
