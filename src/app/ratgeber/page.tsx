"use client";

import { useState } from "react";
import Link from "next/link";

export default function RatgeberPage() {
  const [email, setEmail] = useState("");
  const [praxisName, setPraxisName] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState<"form" | "confirm" | "redirect">("form");
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const submit = async () => {
    if (!email || !email.includes("@")) {
      setError("Bitte geben Sie eine gueltige E-Mail-Adresse ein.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/ebook-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, praxisName, newsletterOptIn: newsletter }),
      });
      const data = await res.json();

      if (data.alreadyConfirmed && data.downloadUrl) {
        setRedirectUrl(data.downloadUrl);
        setPhase("redirect");
        // Auto-redirect after short delay
        setTimeout(() => {
          window.location.href = data.downloadUrl;
        }, 2000);
      } else {
        setPhase("confirm");
      }
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }

    setSubmitting(false);
  };

  const chapters = [
    { icon: "gavel", title: "Was darf ein KI-Telefonbot in der Tierarztpraxis? Was nicht?" },
    { icon: "checklist", title: "DSGVO-Anforderungen Schritt fuer Schritt erklaert" },
    { icon: "description", title: "AV-Vertrag Checkliste — worauf Sie achten muessen" },
    { icon: "policy", title: "EU-AI-Act: Was bedeutet das konkret fuer Ihre Praxis?" },
    { icon: "lightbulb", title: "5 Praxis-Tipps fuer den datenschutzkonformen Einsatz" },
  ];

  return (
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Kostenloser Ratgeber
          </span>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            DSGVO-Leitfaden fuer{" "}
            <span className="text-primary">KI-Telefonie in der Tierarztpraxis</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Alles was Sie ueber Datenschutz, AV-Vertraege und den EU-AI-Act wissen muessen —
            verstaendlich erklaert, mit konkreten Checklisten.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content Preview */}
            <div>
              <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 text-on-primary">
                  <span className="material-symbols-outlined text-5xl mb-4 opacity-80">menu_book</span>
                  <h3 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-2">
                    DSGVO-Leitfaden
                  </h3>
                  <p className="text-primary-fixed-dim opacity-80 text-sm">
                    KI-Telefonie in der Tierarztpraxis
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm opacity-70">
                    <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                    PDF · 8 Seiten · Kostenlos
                  </div>
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-headline)] font-bold text-lg text-on-surface mb-6">
                Das erwartet Sie:
              </h3>
              <div className="space-y-4">
                {chapters.map((ch, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">{ch.icon}</span>
                    </div>
                    <p className="text-on-surface-variant pt-2">{ch.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form / Confirmation */}
            <div className="lg:sticky lg:top-28">
              {phase === "confirm" ? (
                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-outline-variant/10 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
                    Bitte E-Mail bestaetigen
                  </h3>
                  <p className="text-on-surface-variant mb-2">
                    Wir haben Ihnen eine E-Mail an <strong className="text-on-surface">{email}</strong> gesendet.
                  </p>
                  <p className="text-on-surface-variant mb-6">
                    Klicken Sie auf den Bestaetigungslink, um den Leitfaden herunterzuladen.
                  </p>
                  <div className="bg-surface-container-low rounded-2xl p-4 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base align-middle mr-1">info</span>
                    Keine E-Mail erhalten? Pruefen Sie Ihren Spam-Ordner.
                  </div>
                </div>
              ) : phase === "redirect" ? (
                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-outline-variant/10 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <span className="material-symbols-outlined text-3xl">download</span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
                    E-Mail bereits bestaetigt!
                  </h3>
                  <p className="text-on-surface-variant mb-6">
                    Sie werden zum Download weitergeleitet...
                  </p>
                  <a
                    href={redirectUrl}
                    className="inline-flex items-center gap-2 text-primary font-[family-name:var(--font-headline)] font-bold hover:underline"
                  >
                    Falls nicht, hier klicken
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </a>
                </div>
              ) : (
                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-outline-variant/10">
                  <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
                    Jetzt kostenlos herunterladen
                  </h3>
                  <p className="text-sm text-on-surface-variant mb-8">
                    Kein Spam, kein Abo — nur der Leitfaden.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-2">E-Mail-Adresse *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                        placeholder="praxis@tierarzt-beispiel.de"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-2">Praxisname</label>
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
                        Ja, ich moechte gelegentlich Praxis-Tipps zu KI-Telefonie erhalten.
                      </span>
                    </label>

                    {error && <p className="text-sm text-error">{error}</p>}

                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? "Wird vorbereitet..." : "Leitfaden anfordern"}
                    </button>
                  </div>

                  <p className="text-xs text-on-surface-variant text-center mt-4">
                    Ihre Daten werden vertraulich behandelt.{" "}
                    <Link href="/datenschutz" className="text-primary hover:underline">
                      Datenschutzerklaerung
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
