// DigiMedia Syndication API Client

const API_URL = process.env.DIGIMEDIA_API_URL!;
const SITE_TOKEN = process.env.DIGIMEDIA_SITE_TOKEN!;

export type SyndicatedArticle = {
  id: number;
  article_id: number;
  title: string;
  slug: string;
  content_html: string;
  content_markdown?: string;
  summary: string;
  meta_title: string;
  meta_description: string;
  featured_image_url: string;
  featured_image_alt: string;
  featured_image_width: number;
  featured_image_height: number;
  faq: { question: string; answer: string }[];
  keywords: string[];
  categories: string[];
  canonical_url: string;
  robots: string;
  status: "approved" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  original_digirift_url?: string;
  meta_tags: Record<string, string>;
  structured_data: Record<string, unknown>[];
  contact_cta: { text: string; url: string } | null;
  newsletter_cta: { text: string; url: string } | null;
};

type ArticlesResponse = {
  articles: SyndicatedArticle[];
  meta: { total: number; page: number; limit: number; pages: number };
};

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${SITE_TOKEN}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`DigiMedia API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getArticles(
  page = 1,
  limit = 20
): Promise<ArticlesResponse> {
  return fetchAPI<ArticlesResponse>(
    `/articles?page=${page}&limit=${limit}`
  );
}

export async function getArticleById(
  id: number
): Promise<SyndicatedArticle> {
  return fetchAPI<SyndicatedArticle>(`/articles/${id}`);
}

export async function getArticleBySlug(
  slug: string
): Promise<SyndicatedArticle | null> {
  const { articles } = await getArticles(1, 100);
  return articles.find((a) => a.slug === slug) ?? null;
}

export async function confirmPublication(id: number): Promise<void> {
  await fetchAPI(`/articles/${id}/confirm`, { method: "POST" });
}
