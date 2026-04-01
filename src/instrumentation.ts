export async function register() {
  // Only run on the server (not edge runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
    const SYNC_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog-sync?secret=${process.env.BLOG_SYNC_SECRET}`;

    async function runSync() {
      try {
        const res = await fetch(SYNC_URL);
        const data = await res.json();
        console.log("[blog-sync] Sync completed:", JSON.stringify(data));
      } catch (err) {
        console.error("[blog-sync] Sync failed:", err);
      }
    }

    // First sync after 10 seconds (let server fully start)
    setTimeout(runSync, 10_000);

    // Then every 24 hours
    setInterval(runSync, SYNC_INTERVAL_MS);

    console.log("[blog-sync] Scheduled: every 24h, first run in 10s");
  }
}
