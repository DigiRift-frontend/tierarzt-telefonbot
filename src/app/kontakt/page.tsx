"use client";

import { useState } from "react";
import Link from "next/link";

export default function KontaktPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", praxisName: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    if (!form.email || !form.email.includes("@")) {
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
          type: "contact",
          email: form.email,
          name: `${form.firstName} ${form.lastName}`.trim(),
          praxisName: form.praxisName,
          message: form.message,
        }),
      });
      setSent(true);
    } catch {
      setError("Es gab einen Fehler. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.");
    }

    setSubmitting(false);
  };

  if (sent) {
    return (
      <section className="min-h-screen bg-surface flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
            Vielen Dank!
          </h1>
          <p className="text-on-surface-variant mb-8">
            Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Link
            href="/"
            className="inline-flex text-primary font-[family-name:var(--font-headline)] font-bold hover:underline"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Kontakt
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            Lassen Sie uns{" "}
            <span className="text-primary">sprechen</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Das Erstgespräch ist kostenlos und unverbindlich. In 30 Minuten zeigen wir Ihnen,
            wie ein KI-Telefonbot Ihre Praxis entlasten kann.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-8 md:p-12">
              <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-8 text-on-surface">
                Erstgespräch anfragen
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Vorname</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Nachname</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">E-Mail *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                    placeholder="praxis@tierarzt-beispiel.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Praxisname</label>
                  <input
                    type="text"
                    value={form.praxisName}
                    onChange={(e) => update("praxisName", e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary"
                    placeholder="Tierarztpraxis Mustermann"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Ihre Nachricht (optional)</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Erzählen Sie uns kurz von Ihrer Praxis und was Sie sich wünschen..."
                  />
                </div>

                {error && <p className="text-sm text-error">{error}</p>}

                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Wird gesendet..." : "Erstgespräch anfragen"}
                </button>
                <p className="text-xs text-on-surface-variant text-center">
                  Ihre Daten werden vertraulich behandelt.{" "}
                  <Link href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </Link>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-8">
                <h3 className="font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">
                  Direkt Kontakt aufnehmen
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">E-Mail</p>
                      <a href="mailto:info@digirift.com" className="text-sm font-semibold text-primary hover:underline">
                        info@digirift.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Telefon</p>
                      <a href="tel:+494074303583" className="text-sm font-semibold text-on-surface">
                        +49 40 74303583
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Standort</p>
                      <p className="text-sm font-semibold text-on-surface">Hamburg, Deutschland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">timer</span>
                <h3 className="font-[family-name:var(--font-headline)] font-bold mb-3 text-on-surface">
                  Was passiert nach Ihrer Anfrage?
                </h3>
                <ol className="space-y-3 text-sm text-on-surface-variant">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Wir melden uns innerhalb von 24 Stunden
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Gemeinsamer Termin für das Erstgespräch (30 Min)
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Sie entscheiden — kostenlos und unverbindlich
                  </li>
                </ol>
              </div>

              {/* Quiz Teaser in Sidebar */}
              <Link
                href="/check"
                className="block bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-8 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl">quiz</span>
                  <h3 className="font-[family-name:var(--font-headline)] font-bold text-on-surface group-hover:text-primary transition-colors">
                    Erreichbarkeits-Check
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant">
                  Finden Sie in 2 Minuten heraus, wie viele Anrufe Ihre Praxis verpasst.
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-bold text-sm mt-3 group-hover:gap-3 transition-all">
                  Jetzt testen <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
