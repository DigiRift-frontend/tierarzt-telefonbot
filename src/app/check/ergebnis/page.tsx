"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { sendLead } from "@/lib/send-lead";

interface QuizResult {
  email: string;
  praxisName?: string;
  quizAnswers: Record<string, number>;
  quizScore: number;
}

interface CalcResult {
  missedCallsPerDay: number;
  missedCallsPerMonth: number;
  lostRevenuePerMonth: number;
  lostCustomersPerMonth: number;
  afterHoursLoss: number;
  totalLossPerMonth: number;
  severity: "low" | "medium" | "high";
}

function calculate(answers: Record<string, number>): CalcResult {
  const callsPerDay = answers.calls || 35;
  const missedPct = (answers.missed || 17) / 100;
  const treatmentValue = answers.treatment_value || 100;
  const afterHoursExtra = answers.after_hours || 10;

  const missedCallsPerDay = Math.round(callsPerDay * missedPct);
  const missedCallsPerMonth = missedCallsPerDay * 22;
  const conversionRate = 0.3;
  const lostCustomersPerMonth = Math.round(missedCallsPerMonth * conversionRate);
  const lostRevenuePerMonth = lostCustomersPerMonth * treatmentValue;
  const afterHoursLoss = afterHoursExtra * treatmentValue * 4;
  const totalLossPerMonth = lostRevenuePerMonth + afterHoursLoss;

  let severity: "low" | "medium" | "high" = "low";
  if (totalLossPerMonth >= 5000) severity = "high";
  else if (totalLossPerMonth >= 2000) severity = "medium";

  return {
    missedCallsPerDay,
    missedCallsPerMonth,
    lostRevenuePerMonth,
    lostCustomersPerMonth,
    afterHoursLoss,
    totalLossPerMonth,
    severity,
  };
}

function formatEuro(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function ResultContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const [data, setData] = useState<QuizResult | null>(null);
  const [error, setError] = useState(false);
  const [crmSent, setCrmSent] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(true);
      return;
    }

    // Verify token via API
    fetch("/api/quiz-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(true);
        } else {
          setData(result);
        }
      })
      .catch(() => setError(true));
  }, [token]);

  // Send to CRM once data is loaded (email is verified at this point)
  useEffect(() => {
    if (!data || crmSent) return;
    setCrmSent(true);

    sendLead({
      type: "quiz",
      email: data.email,
      praxisName: data.praxisName,
      quizAnswers: data.quizAnswers,
      quizScore: data.quizScore,
    }).catch(() => {});
  }, [data, crmSent]);

  if (error) {
    return (
      <section className="min-h-screen bg-surface flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-6">error_outline</span>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
            Link ungültig oder abgelaufen
          </h1>
          <p className="text-on-surface-variant mb-8">
            Dieser Link ist nicht mehr gültig. Bitte machen Sie den Kosten-Rechner erneut.
          </p>
          <Link
            href="/check"
            className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Kosten-Rechner starten
          </Link>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Ihre Auswertung wird geladen...</p>
        </div>
      </section>
    );
  }

  const result = calculate(data.quizAnswers);
  const severityColor = result.severity === "high" ? "#ef4444" : result.severity === "medium" ? "#f97316" : "#22c55e";

  return (
    <section className="min-h-screen bg-surface py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Confirmed badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            E-Mail bestätigt — Ihre persönliche Auswertung
          </div>
        </div>

        {/* Hero Number */}
        <div className="text-center mb-12">
          <p className="text-on-surface-variant text-sm mb-2 uppercase tracking-wider font-semibold">
            Geschätzter monatlicher Umsatzverlust
          </p>
          <div className="text-5xl md:text-7xl font-[family-name:var(--font-headline)] font-extrabold mb-4" style={{ color: severityColor }}>
            {formatEuro(result.totalLossPerMonth)}
          </div>
          <p className="text-on-surface-variant">
            pro Monat durch verpasste Anrufe
            {data.praxisName && <> — <strong className="text-on-surface">{data.praxisName}</strong></>}
          </p>
        </div>

        {/* Breakdown */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 mb-6">
          <h2 className="font-[family-name:var(--font-headline)] font-bold text-lg text-on-surface mb-6">
            So setzt sich der Verlust zusammen
          </h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">phone_missed</span>
                <span className="text-on-surface-variant">Verpasste Anrufe pro Tag</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">~{result.missedCallsPerDay}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">event_busy</span>
                <span className="text-on-surface-variant">Verpasste Anrufe pro Monat</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">~{result.missedCallsPerMonth}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person_off</span>
                <span className="text-on-surface-variant">Verlorene Neukunden pro Monat</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">~{result.lostCustomersPerMonth}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">money_off</span>
                <span className="text-on-surface-variant">Umsatzverlust (Sprechzeiten)</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">{formatEuro(result.lostRevenuePerMonth)}</span>
            </div>
            {result.afterHoursLoss > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">nightlight</span>
                  <span className="text-on-surface-variant">Verlust außerhalb der Sprechzeiten</span>
                </div>
                <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">{formatEuro(result.afterHoursLoss)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-4">
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface">Gesamtverlust pro Monat</span>
              <span className="font-[family-name:var(--font-headline)] font-extrabold text-2xl" style={{ color: severityColor }}>{formatEuro(result.totalLossPerMonth)}</span>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 mb-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-2xl mt-1">info</span>
            <div>
              <h3 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">Was bedeutet das?</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {result.severity === "high"
                  ? `Ihre Praxis verliert schätzungsweise ${formatEuro(result.totalLossPerMonth * 12)} pro Jahr. Das sind ${result.lostCustomersPerMonth} Tierbesitzer jeden Monat, die nie wiederkommen — weil sie Sie einfach nicht erreicht haben.`
                  : result.severity === "medium"
                    ? `${formatEuro(result.totalLossPerMonth * 12)} pro Jahr sind ${result.lostCustomersPerMonth} verlorene Kunden jeden Monat. Jeder einzelne davon hätte ein treuer Stammkunde werden können.`
                    : `Auch ${formatEuro(result.totalLossPerMonth * 12)} pro Jahr sind Geld, das auf dem Tisch liegen bleibt. Mit besserer Erreichbarkeit könnten Sie ${result.lostCustomersPerMonth} zusätzliche Kunden pro Monat gewinnen.`}
              </p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-primary/5 rounded-3xl p-8 mb-12">
          <h3 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
            Die Lösung: Ein KI-Telefonbot, der keinen Anruf verpasst
          </h3>
          <ul className="space-y-3">
            {[
              "Nimmt jeden Anruf an — auch während OPs, Stoßzeiten und nach Feierabend",
              "Bucht Termine direkt in Ihren Kalender",
              "Erkennt Notfälle und leitet sofort an Sie weiter",
              "Wir richten alles ein — Sie müssen sich um nichts kümmern",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                <span className="text-on-surface-variant">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="space-y-4 text-center">
          <Link
            href="/kontakt"
            className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-[family-name:var(--font-headline)] font-bold text-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Kostenloses Erstgespräch vereinbaren
          </Link>
          <br />
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-primary font-[family-name:var(--font-headline)] font-bold hover:gap-4 transition-all mt-4"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Hören Sie wie Ihr Bot klingen würde
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ErgebnisPage() {
  return (
    <Suspense fallback={
      <section className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    }>
      <ResultContent />
    </Suspense>
  );
}
