"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type Phase = "quiz" | "email" | "confirm";

export default function CheckPage() {
  const router = useRouter();
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
      const res = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          praxisName,
          quizAnswers: answers,
          quizScore: result.totalLossPerMonth,
        }),
      });
      const data = await res.json();

      // If email already confirmed in DigiLetter, go directly to results
      if (data.alreadyConfirmed && data.resultUrl) {
        setSubmitting(false);
        router.push(data.resultUrl);
        return;
      }
    } catch {
      // Continue to confirmation even if API fails
    }

    setSubmitting(false);
    setPhase("confirm");
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

  /* --- Confirm Phase (check your email) --- */
  return (
    <section className="min-h-screen bg-surface flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">mark_email_read</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
          Prüfen Sie Ihr Postfach
        </h1>
        <p className="text-on-surface-variant mb-2">
          Wir haben eine E-Mail an <strong className="text-on-surface">{email}</strong> gesendet.
        </p>
        <p className="text-on-surface-variant mb-8">
          Klicken Sie auf den Bestätigungslink in der E-Mail, um Ihre persönliche Kostenanalyse zu sehen.
        </p>

        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 text-left">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <div className="text-sm text-on-surface-variant">
              <p className="mb-2"><strong className="text-on-surface">Keine E-Mail erhalten?</strong></p>
              <ul className="space-y-1">
                <li>Prüfen Sie Ihren Spam-Ordner</li>
                <li>Die E-Mail kommt von <strong>newsletter@digirift.com</strong></li>
                <li>Der Link ist 48 Stunden gültig</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
