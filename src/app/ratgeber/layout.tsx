import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSGVO-Leitfaden — Kostenloser Ratgeber fuer Tierarztpraxen",
  description:
    "Kostenloser DSGVO-Leitfaden fuer KI-Telefonie in der Tierarztpraxis. Datenschutz, AV-Vertraege, EU-AI-Act — verstaendlich erklaert mit Checklisten.",
  openGraph: {
    title: "DSGVO-Leitfaden — Kostenloser Ratgeber fuer Tierarztpraxen",
    description: "Alles was Sie ueber Datenschutz und KI-Telefonie wissen muessen. Kostenloser PDF-Download.",
  },
};

export default function RatgeberLayout({ children }: { children: React.ReactNode }) {
  return children;
}
