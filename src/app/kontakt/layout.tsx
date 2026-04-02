import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Kostenloses Erstgespräch vereinbaren",
  description:
    "Vereinbaren Sie ein kostenloses 30-Minuten-Erstgespräch. Wir konfigurieren einen individuellen KI-Telefonbot für Ihre Tierarztpraxis.",
  openGraph: {
    title: "Kontakt — Kostenloses Erstgespräch vereinbaren",
    description: "30 Minuten, kostenlos, unverbindlich. Wir zeigen Ihnen, was ein KI-Telefonbot für Ihre Praxis leisten kann.",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
