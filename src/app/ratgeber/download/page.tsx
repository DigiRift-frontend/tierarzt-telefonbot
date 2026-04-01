"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendLead } from "@/lib/send-lead";

export default function EbookDownloadPage() {
  return (
    <Suspense fallback={
      <section className="pt-32 pb-24 md:pt-44 bg-surface min-h-screen">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="material-symbols-outlined text-3xl">hourglass_top</span>
          </div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
            Wird geladen...
          </h1>
        </div>
      </section>
    }>
      <EbookDownloadContent />
    </Suspense>
  );
}

function EbookDownloadContent() {
  const params = useSearchParams();
  const token = params.get("t");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState("");
  const [crmSent, setCrmSent] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/ebook-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
        } else {
          setEmail(data.email);
          setStatus("success");

          // Register lead in CRM (fire-and-forget)
          if (!crmSent) {
            setCrmSent(true);
            sendLead({
              type: "ebook",
              email: data.email,
              praxisName: data.praxisName,
            }).catch(() => {});
          }
        }
      })
      .catch(() => setStatus("error"));
  }, [token, crmSent]);

  return (
    <section className="pt-32 pb-24 md:pt-44 bg-surface min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        {status === "loading" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="material-symbols-outlined text-3xl">hourglass_top</span>
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              Wird geladen...
            </h1>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">error</span>
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Link ungueltig oder abgelaufen
            </h1>
            <p className="text-on-surface-variant mb-8">
              Dieser Download-Link ist nicht mehr gueltig. Bitte fordern Sie den Leitfaden erneut an.
            </p>
            <Link
              href="/ratgeber"
              className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Erneut anfordern
            </Link>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">download_done</span>
            </div>
            <h1 className="text-3xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface mb-4">
              Ihr Leitfaden ist bereit!
            </h1>
            <p className="text-on-surface-variant mb-8">
              Vielen Dank fuer Ihr Interesse. Klicken Sie auf den Button, um den
              DSGVO-Leitfaden herunterzuladen.
            </p>

            <a
              href="/downloads/dsgvo-leitfaden-tierarzt.pdf"
              download
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-[family-name:var(--font-headline)] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform mb-8"
            >
              <span className="material-symbols-outlined text-2xl">download</span>
              PDF herunterladen
            </a>

            <p className="text-sm text-on-surface-variant mb-12">
              Der Download startet automatisch. Falls nicht,{" "}
              <a
                href="/downloads/dsgvo-leitfaden-tierarzt.pdf"
                download
                className="text-primary hover:underline"
              >
                klicken Sie hier
              </a>
              .
            </p>

            <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-8">
              <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-3">
                Naechster Schritt?
              </h2>
              <p className="text-on-surface-variant mb-6">
                Im kostenlosen Erstgespraech klaeren wir alle Ihre Fragen — zu Datenschutz,
                Technik und Kosten. Unverbindlich, in 30 Minuten.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-primary font-[family-name:var(--font-headline)] font-bold hover:underline"
              >
                Erstgespraech vereinbaren
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
