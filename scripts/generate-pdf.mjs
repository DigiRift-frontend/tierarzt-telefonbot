import puppeteer from "puppeteer";
import { resolve } from "path";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3000";
const OUT_DIR = resolve(import.meta.dirname, "../public/downloads");

mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  // Dismiss cookie banner before page loads
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, marketing: false })
    );
  });

  const url = `${BASE}/ebook/dsgvo-leitfaden`;
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  // Wait for fonts and rendering to settle
  await new Promise((r) => setTimeout(r, 3000));

  // Remove any remaining fixed-position overlays (cookie banner, navbar)
  await page.evaluate(() => {
    document.querySelectorAll("nav, footer, [class*='fixed']").forEach((el) => {
      el.remove();
    });
  });

  const outPath = resolve(OUT_DIR, "dsgvo-leitfaden-tierarzt.pdf");
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: "15mm", right: "0", bottom: "15mm", left: "0" },
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `
      <div style="width:100%; font-size:8px; color:#9ca3af; padding:0 20mm; display:flex; justify-content:space-between;">
        <span>tierarzt-telefonbot.de — DSGVO-Leitfaden</span>
        <span>Seite <span class="pageNumber"></span></span>
      </div>
    `,
  });

  console.log(`Saved: ${outPath}`);
  await page.close();
  await browser.close();
  console.log("Done!");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
