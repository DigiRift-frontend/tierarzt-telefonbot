"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so the banner slides in smoothly after page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    const prefs: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  }

  function savePreferences() {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/40 z-[998] backdrop-blur-sm transition-opacity" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] animate-slide-up">
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-surface-container-high p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl mt-0.5">cookie</span>
              <div>
                <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-headline)]">
                  Wir respektieren Ihre Privatsphäre
                </h3>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed font-[family-name:var(--font-body)]">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten,
                  den Datenverkehr zu analysieren und unsere Inhalte zu personalisieren.{" "}
                  <Link href="/datenschutz" className="text-primary underline hover:text-primary-container">
                    Datenschutzerklärung
                  </Link>
                </p>
              </div>
            </div>

            {/* Details panel (hidden by default) */}
            {showDetails && (
              <div className="mb-5 space-y-3 border-t border-surface-container-high pt-4">
                {/* Necessary — always on */}
                <label className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-semibold text-on-surface font-[family-name:var(--font-headline)]">
                      Notwendig
                    </span>
                    <p className="text-xs text-on-surface-variant">
                      Für grundlegende Website-Funktionen erforderlich.
                    </p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked disabled className="sr-only peer" />
                    <div className="w-10 h-5 bg-primary rounded-full" />
                    <div className="absolute left-[22px] top-[2px] w-4 h-4 bg-white rounded-full" />
                  </div>
                </label>

                {/* Analytics */}
                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <div>
                    <span className="text-sm font-semibold text-on-surface font-[family-name:var(--font-headline)]">
                      Analyse
                    </span>
                    <p className="text-xs text-on-surface-variant">
                      Hilft uns zu verstehen, wie Besucher die Website nutzen.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.analytics}
                    onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      preferences.analytics ? "bg-primary" : "bg-outline-variant"
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.analytics ? "left-[22px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                </label>

                {/* Marketing */}
                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <div>
                    <span className="text-sm font-semibold text-on-surface font-[family-name:var(--font-headline)]">
                      Marketing
                    </span>
                    <p className="text-xs text-on-surface-variant">
                      Wird verwendet, um relevante Werbung anzuzeigen.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.marketing}
                    onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      preferences.marketing ? "bg-primary" : "bg-outline-variant"
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.marketing ? "left-[22px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                </label>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Primary: Accept All — big, bold, prominent */}
              <button
                onClick={acceptAll}
                className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3.5 rounded-full font-[family-name:var(--font-headline)] font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
              >
                Alle akzeptieren
              </button>

              {showDetails ? (
                /* When details are open: Save button (secondary style) */
                <button
                  onClick={savePreferences}
                  className="px-6 py-3.5 rounded-full text-sm font-medium text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors font-[family-name:var(--font-headline)]"
                >
                  Auswahl speichern
                </button>
              ) : (
                /* When details are closed: small, subtle "Einstellungen" link */
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-3.5 text-xs text-outline hover:text-on-surface-variant transition-colors font-[family-name:var(--font-body)]"
                >
                  Einstellungen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
