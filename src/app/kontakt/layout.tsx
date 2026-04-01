import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Kostenloses Erstgespraech vereinbaren",
  description:
    "Vereinbaren Sie ein kostenloses 30-Minuten-Erstgespraech. Wir konfigurieren einen individuellen KI-Telefonbot fuer Ihre Tierarztpraxis.",
  openGraph: {
    title: "Kontakt — Kostenloses Erstgespraech vereinbaren",
    description: "30 Minuten, kostenlos, unverbindlich. Wir zeigen Ihnen, was ein KI-Telefonbot fuer Ihre Praxis leisten kann.",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
