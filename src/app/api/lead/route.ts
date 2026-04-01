import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  type: "quiz" | "ebook" | "contact" | "demo-gate";
  email: string;
  praxisName?: string;
  name?: string;
  message?: string;
  quizAnswers?: Record<string, number>;
  quizScore?: number;
  newsletterOptIn?: boolean;
  userAgent?: string;
  screenSize?: string;
  referrer?: string;
}

function parseUserAgent(ua: string): { browser: string; os: string } {
  let browser = "Unbekannt";
  let os = "Unbekannt";

  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome/") && ua.includes("Safari/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X") || ua.includes("Macintosh")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  return { browser, os };
}

/* ------------------------------------------------------------------ */
/* DigiLetter (Newsletter)                                             */
/* ------------------------------------------------------------------ */

const DIGILETTER_URL = "https://newsletter.wirbauensoftware.de/api/v1/subscribe";
const DIGILETTER_API_KEY = process.env.DIGILETTER_API_KEY || "";

async function subscribeToDigiLetter(body: LeadPayload) {
  if (!DIGILETTER_API_KEY) {
    console.warn("[DIGILETTER] No API key configured — skipping");
    return;
  }

  const tags: string[] = ["tierarzt-telefonbot"];
  switch (body.type) {
    case "quiz": tags.push("quelle-kostenrechner"); break;
    case "ebook": tags.push("quelle-ebook"); break;
    case "contact": tags.push("quelle-kontaktformular"); break;
    case "demo-gate": tags.push("quelle-demo"); break;
  }

  const nameParts = (body.name || "").trim().split(" ");
  const firstName = nameParts[0] || undefined;
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  try {
    const res = await fetch(DIGILETTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIGILETTER_API_KEY}`,
      },
      body: JSON.stringify({ email: body.email, firstName, lastName, tags }),
    });
    const data = await res.json();
    console.log("[DIGILETTER]", res.status, JSON.stringify(data));
  } catch (err) {
    console.error("[DIGILETTER] Error:", err);
  }
}

/* ------------------------------------------------------------------ */
/* DigiCRM (Lead-Management)                                           */
/* ------------------------------------------------------------------ */

const DIGICRM_URL = "https://digicrm.wirbauensoftware.de/api/leads/inbound";
const DIGICRM_API_KEY = process.env.DIGICRM_API_KEY || "";

function buildCrmDescription(body: LeadPayload, ip: string): string {
  const lines: string[] = [];
  lines.push(`[tierarzt-telefonbot.de] ${body.type.toUpperCase()}`);
  lines.push("");

  if (body.praxisName) lines.push(`Praxis: ${body.praxisName}`);
  if (body.message) lines.push(`Nachricht: ${body.message}`);

  if (body.type === "quiz" && body.quizScore != null) {
    lines.push(`Kostenrechner-Ergebnis: ~${body.quizScore.toLocaleString("de-DE")} € Umsatzverlust/Monat`);
    if (body.quizAnswers) {
      const a = body.quizAnswers;
      if (a.calls) lines.push(`Anrufe/Tag: ${a.calls}`);
      if (a.missed) lines.push(`Verpasst: ~${a.missed}%`);
      if (a.treatment_value) lines.push(`Ø Behandlungswert: ${a.treatment_value} €`);
    }
  }

  if (body.newsletterOptIn) lines.push("Newsletter: Ja");

  // Client-Infos
  lines.push("");
  lines.push("--- Technische Infos ---");
  lines.push(`IP: ${ip}`);
  if (body.userAgent) {
    const { browser, os } = parseUserAgent(body.userAgent);
    lines.push(`Browser: ${browser}`);
    lines.push(`Betriebssystem: ${os}`);
  }
  if (body.screenSize) lines.push(`Bildschirm: ${body.screenSize}`);
  if (body.referrer) lines.push(`Referrer: ${body.referrer}`);

  return lines.join("\n");
}

function getCrmTags(body: LeadPayload): string[] {
  const tags: string[] = ["tierarzt-telefonbot.de"];

  switch (body.type) {
    case "quiz": tags.push("Kostenrechner"); break;
    case "ebook": tags.push("E-Book Download"); break;
    case "contact": tags.push("Kontaktformular"); break;
    case "demo-gate": tags.push("Demo angehört"); break;
  }

  if (body.newsletterOptIn) tags.push("Newsletter");

  return tags;
}

function getCrmCategory(type: LeadPayload["type"]): string {
  switch (type) {
    case "quiz": return "KI-Status-Check";
    case "ebook": return "Infomaterial Download";
    case "contact": return "Website Kontaktformular";
    case "demo-gate": return "Website Kontaktformular";
  }
}

async function createCrmLead(body: LeadPayload, ip: string) {
  if (!DIGICRM_API_KEY) {
    console.warn("[DIGICRM] No API key configured — skipping");
    return;
  }

  const nameParts = (body.name || "").trim().split(" ");
  const firstName = nameParts[0] || "Unbekannt";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "(tierarzt-telefonbot)";

  try {
    const res = await fetch(DIGICRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIGICRM_API_KEY}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: body.email,
        company: body.praxisName || "",
        category: getCrmCategory(body.type),
        description: buildCrmDescription(body, ip),
        tags: getCrmTags(body),
      }),
    });
    const data = await res.json();
    console.log("[DIGICRM]", res.status, JSON.stringify(data));
  } catch (err) {
    console.error("[DIGICRM] Error:", err);
  }
}

/* ------------------------------------------------------------------ */
/* API Route                                                           */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unbekannt";

    // User-Agent vom Header falls nicht im Body
    if (!body.userAgent) {
      body.userAgent = request.headers.get("user-agent") || undefined;
    }

    console.log("[LEAD]", JSON.stringify({
      timestamp: new Date().toISOString(),
      type: body.type,
      email: body.email,
      praxisName: body.praxisName,
      name: body.name,
      quizScore: body.quizScore,
      newsletterOptIn: body.newsletterOptIn,
      ip,
    }));

    // CRM: immer
    // DigiLetter: nur bei Quiz-Ergebnis und E-Book — NICHT bei Kontaktformular
    const tasks: Promise<void>[] = [createCrmLead(body, ip)];
    if (body.type !== "contact") {
      tasks.push(subscribeToDigiLetter(body));
    }
    await Promise.all(tasks);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
