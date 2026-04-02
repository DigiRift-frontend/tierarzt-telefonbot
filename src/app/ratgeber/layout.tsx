import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSGVO-Leitfaden — Kostenloser Ratgeber für Tierarztpraxen",
  description:
    "Kostenloser DSGVO-Leitfaden für KI-Telefonie in der Tierarztpraxis. Datenschutz, AV-Verträge, EU-AI-Act — verständlich erklärt mit Checklisten.",
  openGraph: {
    title: "DSGVO-Leitfaden — Kostenloser Ratgeber für Tierarztpraxen",
    description: "Alles was Sie über Datenschutz und KI-Telefonie wissen müssen. Kostenloser PDF-Download.",
  },
};

export default function RatgeberLayout({ children }: { children: React.ReactNode }) {
  return children;
}
