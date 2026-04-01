"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Questions                                                           */
/* ------------------------------------------------------------------ */

interface Option {
  label: string;
  value: number;
  icon: string;
}

interface Question {
  id: string;
  question: string;
  hint?: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "calls",
    question: "Wie viele Anrufe erhält Ihre Praxis pro Tag?",
    hint: "Schätzen Sie ruhig — eine grobe Zahl reicht.",
    options: [
      { label: "Unter 20", value: 15, icon: "phone_in_talk" },
      { label: "20–50", value: 35, icon: "ring_volume" },
      { label: "50–100", value: 75, icon: "phone_callback" },
      { label: "Über 100", value: 120, icon: "phonelink_ring" },
    ],
  },
  {
    id: "missed",
    question: "Wie viel Prozent der Anrufe werden nicht angenommen?",
    hint: "Denken Sie an Stoßzeiten, OPs, Mittagspause.",
    options: [
      { label: "Unter 10%", value: 5, icon: "sentiment_satisfied" },
      { label: "10–25%", value: 17, icon: "sentiment_neutral" },
      { label: "25–40%", value: 32, icon: "sentiment_dissatisfied" },
      { label: "Über 40%", value: 50, icon: "sentiment_very_dissatisfied" },
    ],
  },
  {
    id: "treatment_value",
    question: "Was ist der durchschnittliche Wert einer Behandlung?",
    hint: "Über alle Behandlungen hinweg — Impfung bis OP.",
    options: [
      { label: "~50 €", value: 50, icon: "savings" },
      { label: "~100 €", value: 100, icon: "account_balance" },
      { label: "~200 €", value: 200, icon: "paid" },
      { label: "~350 €+", value: 350, icon: "diamond" },
    ],
  },
  {
    id: "after_hours",
    question: "Sind Sie außerhalb der Sprechzeiten erreichbar?",
    hint: "Abends, Wochenende, Feiertage.",
    options: [
      { label: "Ja, eigener Notdienst", value: 0, icon: "local_hospital" },
      { label: "Weiterleitung an Notdienst", value: 5, icon: "alt_route" },
      { label: "Nur Anrufbeantworter", value: 15, icon: "voicemail" },
      { label: "Gar nicht erreichbar", value: 25, icon: "phone_locked" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Calculation                                                         */
/* ------------------------------------------------------------------ */

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
  const missedCallsPerMonth = missedCallsPerDay * 22; // Werktage
  // ~30% der verpassten Anrufe wären ein Termin geworden
  const conversionRate = 0.3;
  const lostCustomersPerMonth = Math.round(missedCallsPerMonth * conversionRate);
  const lostRevenuePerMonth = lostCustomersPerMonth * treatmentValue;
  // After-Hours: zusätzlich verlorene Anrufe am Wochenende/Abend
  const afterHoursLoss = afterHoursExtra * treatmentValue * 4; // 4 Wochen
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

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

type Phase = "quiz" | "email" | "result";

export default function CheckPage() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [praxisName, setPraxisName] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const result = calculate(answers);

  const selectOption = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("email");
    }
  };

  const submitEmail = async () => {
    if (!email || !email.includes("@")) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          email,
          praxisName,
          quizAnswers: answers,
          quizScore: result.totalLossPerMonth,
          newsletterOptIn: newsletter,
        }),
      });
    } catch {
      // Show result even if API fails
    }

    setSubmitting(false);
    setPhase("result");
  };

  const formatEuro = (n: number) =>
    n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  /* --- Quiz Phase --- */
  if (phase === "quiz") {
    const q = questions[step];
    return (
      <section className="min-h-screen bg-surface flex flex-col">
        {/* Progress */}
        <div className="fixed top-0 left-0 w-full h-1 bg-surface-container-high z-50">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-2">
              <span className="text-sm text-on-surface-variant font-medium">
                Frage {step + 1} von {questions.length}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-[family-name:var(--font-headline)] font-bold text-on-surface text-center mb-3 leading-tight">
              {q.question}
            </h1>

            {q.hint && (
              <p className="text-center text-on-surface-variant text-sm mb-12">{q.hint}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => selectOption(q.id, opt.value)}
                  className="group bg-surface-container-lowest p-6 rounded-2xl border-2 border-outline-variant/20 hover:border-primary hover:shadow-lg transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
                    </div>
                    <span className="font-[family-name:var(--font-headline)] font-semibold text-on-surface">
                      {opt.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => {
                  const prevQ = questions[step - 1];
                  const next = { ...answers };
                  delete next[prevQ.id];
                  setAnswers(next);
                  setStep(step - 1);
                }}
                className="mt-8 mx-auto flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span className="text-sm">Zurück</span>
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* --- Email Gate --- */
  if (phase === "email") {
    return (
      <section className="min-h-screen bg-surface flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">calculate</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Ihre Berechnung ist fertig!
            </h1>
            <p className="text-on-surface-variant">
              Wohin dürfen wir Ihre persönliche Kostenanalyse senden?
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                  placeholder="praxis@tierarzt-beispiel.de"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Praxisname
                </label>
                <input
                  type="text"
                  value={praxisName}
                  onChange={(e) => setPraxisName(e.target.value)}
                  className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                  placeholder="Tierarztpraxis Mustermann"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-1 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span className="text-sm text-on-surface-variant">
                  Ja, ich möchte gelegentlich Praxis-Tipps zu KI-Telefonie erhalten.
                </span>
              </label>

              {error && <p className="text-sm text-error">{error}</p>}

              <button
                type="button"
                onClick={submitEmail}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Wird berechnet..." : "Ergebnis anzeigen"}
              </button>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant text-center mt-4">
            Ihre Daten werden vertraulich behandelt.{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
          </p>
        </div>
      </section>
    );
  }

  /* --- Result Phase --- */
  const severityColor =
    result.severity === "high"
      ? "#ef4444"
      : result.severity === "medium"
        ? "#f97316"
        : "#22c55e";

  const severityLabel =
    result.severity === "high"
      ? "Hoher Umsatzverlust"
      : result.severity === "medium"
        ? "Spürbarer Umsatzverlust"
        : "Moderates Potenzial";

  return (
    <section className="min-h-screen bg-surface py-20 px-6">
      <div className="max-w-2xl mx-auto">
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
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">
                ~{result.missedCallsPerDay}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">event_busy</span>
                <span className="text-on-surface-variant">Verpasste Anrufe pro Monat</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">
                ~{result.missedCallsPerMonth}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person_off</span>
                <span className="text-on-surface-variant">Verlorene Neukunden pro Monat</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">
                ~{result.lostCustomersPerMonth}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">money_off</span>
                <span className="text-on-surface-variant">Umsatzverlust (Sprechzeiten)</span>
              </div>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">
                {formatEuro(result.lostRevenuePerMonth)}
              </span>
            </div>
            {result.afterHoursLoss > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">nightlight</span>
                  <span className="text-on-surface-variant">Verlust außerhalb der Sprechzeiten</span>
                </div>
                <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface text-lg">
                  {formatEuro(result.afterHoursLoss)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-4">
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface">
                Gesamtverlust pro Monat
              </span>
              <span className="font-[family-name:var(--font-headline)] font-extrabold text-2xl" style={{ color: severityColor }}>
                {formatEuro(result.totalLossPerMonth)}
              </span>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 mb-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-2xl mt-1">info</span>
            <div>
              <h3 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
                Was bedeutet das?
              </h3>
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

        {/* Solution Hint */}
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
