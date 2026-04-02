import Link from "next/link";
import type { Metadata } from "next";
import { getArticles } from "@/lib/digimedia";

export const metadata: Metadata = {
  title: "Blog — KI-Telefonie fuer Tieraerzte",
  description:
    "Artikel, Insights und Praxis-Tipps rund um KI-Telefonbots in der Tierarztpraxis.",
  openGraph: {
    title: "Blog — KI-Telefonie fuer Tieraerzte",
    description: "Artikel, Insights und Praxis-Tipps rund um KI-Telefonbots in der Tierarztpraxis.",
    url: "https://tierarzt-telefonbot.de/blog",
  },
};

// Revalidate every 30 minutes — checks DigiMedia for new articles
export const revalidate = 1800;

export default async function BlogPage() {
  let articles: Awaited<ReturnType<typeof getArticles>>["articles"] = [];
  let error = false;

  try {
    const data = await getArticles(1, 50);
    articles = data.articles;
  } catch {
    error = true;
  }

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
            Artikel rund um KI-Telefonie, Praxismanagement und die digitale
            Zukunft der Tiermedizin.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          {error || articles.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 p-12 md:p-20 text-center">
              <span className="material-symbols-outlined text-primary text-6xl mb-6">
                edit_note
              </span>
              <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
                Blog-Artikel sind in Vorbereitung
              </h2>
              <p className="text-on-surface-variant max-w-lg mx-auto mb-8">
                In Kürze finden Sie hier Fachartikel zu Themen wie
                Notfall-Triage, DSGVO in der Tierarztpraxis, und wie
                KI-Telefonbots den Praxisalltag verändern.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Benachrichtigt werden
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.featured_image_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.featured_image_url}
                        alt={article.featured_image_alt || article.title}
                        width={article.featured_image_width}
                        height={article.featured_image_height}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {article.categories.length > 0 && (
                      <span className="inline-block px-3 py-1 bg-primary-container/10 text-primary text-xs font-semibold rounded-full mb-3">
                        {article.categories[0]}
                      </span>
                    )}
                    <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                      {article.summary || article.meta_description}
                    </p>
                    {article.published_at && (
                      <time className="block mt-4 text-xs text-outline">
                        {new Date(article.published_at).toLocaleDateString(
                          "de-DE",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
