import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticles, getArticleBySlug } from "@/lib/digimedia";

// Revalidate every 30 minutes
export const revalidate = 1800;

const BASE = "https://tierarzt-telefonbot.de";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel nicht gefunden" };

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.summary,
    keywords: article.keywords?.length ? article.keywords : undefined,
    authors: [{ name: "Kamil Gawlik", url: "https://digirift.com" }],
    openGraph: {
      title: article.meta_tags?.["og:title"] || article.title,
      description: article.meta_tags?.["og:description"] || article.summary,
      url: `${BASE}/blog/${slug}`,
      images: article.featured_image_url
        ? [
            {
              url: article.featured_image_url,
              width: article.featured_image_width,
              height: article.featured_image_height,
              alt: article.featured_image_alt,
            },
          ]
        : [],
      type: "article",
      locale: "de_DE",
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at || undefined,
      authors: ["Kamil Gawlik"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_tags?.["twitter:title"] || article.title,
      description:
        article.meta_tags?.["twitter:description"] || article.summary,
      images: article.featured_image_url ? [article.featured_image_url] : [],
      creator: "@digirift",
    },
    alternates: {
      canonical: article.canonical_url || `${BASE}/blog/${slug}`,
    },
    robots: article.robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  };
}

export async function generateStaticParams() {
  try {
    const { articles } = await getArticles(1, 100);
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

function buildBreadcrumbSchema(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE}/blog/${slug}` },
    ],
  };
}

function buildArticleSchema(article: {
  title: string;
  slug: string;
  summary: string;
  meta_description: string;
  featured_image_url: string;
  published_at: string | null;
  updated_at: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.meta_description || article.summary,
    image: article.featured_image_url || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || undefined,
    url: `${BASE}/blog/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${article.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Kamil Gawlik",
      jobTitle: "Geschaeftsfuehrer",
      url: "https://digirift.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "DigiRift GmbH",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/icon.svg`,
      },
    },
    keywords: article.keywords?.join(", ") || undefined,
    inLanguage: "de-DE",
  };
}

function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // Use API-provided schemas if available, otherwise generate fallback
  const hasApiSchemas = article.structured_data && article.structured_data.length > 0;

  return (
    <>
      {/* JSON-LD: API-provided schemas */}
      {hasApiSchemas && article.structured_data.map((schema, i) => (
        <script
          key={`api-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* JSON-LD: BlogPosting fallback (only if API doesn't provide) */}
      {!hasApiSchemas && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(article)) }}
        />
      )}

      {/* JSON-LD: BreadcrumbList (always) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(article.title, slug)) }}
      />

      {/* JSON-LD: FAQPage (if FAQ data exists) */}
      {article.faq && article.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(article.faq)) }}
        />
      )}

      {/* Hero */}
      <article className="pt-28 md:pt-40 pb-20 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-outline mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Start
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-on-surface-variant truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          {/* Category, Author & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.categories.length > 0 && (
              <span className="px-3 py-1 bg-primary-container/10 text-primary text-xs font-semibold rounded-full">
                {article.categories[0]}
              </span>
            )}
            <span className="text-sm text-outline">
              Von <strong className="text-on-surface-variant">Kamil Gawlik</strong>
            </span>
            {article.published_at && (
              <time
                className="text-sm text-outline"
                dateTime={article.published_at}
              >
                {new Date(article.published_at).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold text-on-surface tracking-tight leading-[1.15] mb-6">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-lg text-on-surface-variant leading-relaxed mb-10">
              {article.summary}
            </p>
          )}

          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
              <img
                src={article.featured_image_url}
                alt={article.featured_image_alt || article.title}
                width={article.featured_image_width}
                height={article.featured_image_height}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-[family-name:var(--font-headline)] prose-headings:font-bold prose-headings:text-on-surface prose-headings:tracking-tight
              prose-p:text-on-surface-variant prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-on-surface
              prose-img:rounded-xl prose-img:shadow-md
              prose-blockquote:border-primary prose-blockquote:text-on-surface-variant
              prose-li:text-on-surface-variant"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-16 pt-10 border-t border-outline-variant/20">
              <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-8">
                Haeufig gestellte Fragen
              </h2>
              <div className="space-y-6">
                {article.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-[family-name:var(--font-headline)] font-semibold text-on-surface hover:text-primary transition-colors">
                      {item.question}
                      <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform ml-4 shrink-0">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-on-surface-variant leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          {article.contact_cta && (
            <div className="mt-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-primary mb-4">
                Interesse geweckt?
              </h3>
              <p className="text-on-primary/80 mb-6 max-w-lg mx-auto">
                Erfahren Sie, wie ein KI-Telefonbot Ihre Tierarztpraxis
                entlasten kann — kostenlos und unverbindlich.
              </p>
              <Link
                href={article.contact_cta.url}
                className="inline-flex bg-white text-primary px-8 py-4 rounded-full font-[family-name:var(--font-headline)] font-bold shadow-xl hover:scale-105 transition-transform"
              >
                {article.contact_cta.text}
              </Link>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-[family-name:var(--font-headline)] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Alle Artikel
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
