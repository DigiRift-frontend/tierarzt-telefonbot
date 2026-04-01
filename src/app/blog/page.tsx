import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — KI-Telefonie für Tierärzte",
  description:
    "Artikel, Insights und Praxis-Tipps rund um KI-Telefonbots in der Tierarztpraxis.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs tracking-widest rounded-full mb-6 uppercase">
            Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            Insights & <span className="text-primary">Praxis-Tipps</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Artikel rund um KI-Telefonie, Praxismanagement und die digitale Zukunft der Tiermedizin.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-12 md:p-20 text-center">
            <span className="material-symbols-outlined text-primary text-6xl mb-6">edit_note</span>
            <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
              Blog-Artikel sind in Vorbereitung
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto mb-8">
              In Kürze finden Sie hier Fachartikel zu Themen wie Notfall-Triage, DSGVO in der Tierarztpraxis,
              und wie KI-Telefonbots den Praxisalltag verändern.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Benachrichtigt werden
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
