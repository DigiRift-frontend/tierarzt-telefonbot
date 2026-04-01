import { NextRequest, NextResponse } from "next/server";
import { getArticles, confirmPublication } from "@/lib/digimedia";
import { revalidatePath } from "next/cache";

// This route is called by a cron job to:
// 1. Fetch new articles from DigiMedia syndication API
// 2. Confirm publication of approved articles back to DigiMedia
// 3. Trigger ISR revalidation of blog pages

export async function GET(req: NextRequest) {
  // Simple secret check to prevent unauthorized triggers
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.BLOG_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { articles, meta } = await getArticles(1, 100);

    // Confirm all approved (not yet published) articles
    const confirmed: string[] = [];
    for (const article of articles) {
      if (article.status === "approved") {
        try {
          await confirmPublication(article.id);
          confirmed.push(article.slug);
        } catch (err) {
          console.error(
            `Failed to confirm article ${article.id}:`,
            err
          );
        }
      }
    }

    // Revalidate blog pages so new articles appear
    revalidatePath("/blog");
    for (const article of articles) {
      revalidatePath(`/blog/${article.slug}`);
    }

    return NextResponse.json({
      ok: true,
      total_articles: meta.total,
      newly_confirmed: confirmed,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Blog sync failed:", err);
    return NextResponse.json(
      { error: "Sync failed", details: String(err) },
      { status: 500 }
    );
  }
}
