"use client";

import { useState, useEffect } from "react";

interface DemoGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "demo-unlocked";

export function DemoGate({ children }: DemoGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const submit = async () => {
    if (!email || !email.includes("@")) return;
    setSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "demo-gate", email }),
      });
    } catch {
      // Continue even if API fails
    }

    localStorage.setItem(STORAGE_KEY, "true");
    setSubmitting(false);
    setUnlocked(true);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred content behind */}
      <div className="blur-sm pointer-events-none select-none opacity-50">
        {children}
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-sm rounded-2xl">
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-xl border border-outline-variant/20 max-w-sm w-full mx-4 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3">lock_open</span>
          <h3 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
            Alle Demos freischalten
          </h3>
          <p className="text-sm text-on-surface-variant mb-5">
            Geben Sie Ihre E-Mail-Adresse ein, um alle Beispielgespräche anzuhören — kostenlos.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary"
              placeholder="ihre@email.de"
            />
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="shrink-0 bg-primary text-on-primary px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "..." : "Freischalten"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
