import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosten-Rechner — Was kosten Sie verpasste Anrufe?",
  description:
    "Berechnen Sie in 2 Minuten, wie viel Umsatz Ihrer Tierarztpraxis durch verpasste Anrufe verloren geht. Kostenloser Kosten-Rechner.",
  openGraph: {
    title: "Kosten-Rechner — Was kosten Sie verpasste Anrufe?",
    description: "Berechnen Sie in 2 Minuten, wie viel Umsatz durch verpasste Anrufe verloren geht.",
  },
};

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
