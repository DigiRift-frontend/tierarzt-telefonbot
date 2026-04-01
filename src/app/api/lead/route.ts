import { NextResponse } from "next/server";

interface LeadPayload {
  type: "quiz" | "ebook" | "contact" | "demo-gate";
  email: string;
  praxisName?: string;
  name?: string;
  message?: string;
  quizAnswers?: Record<string, number>;
  quizScore?: number;
  newsletterOptIn?: boolean;
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

function buildCrmDescription(body: LeadPayload): string {
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

async function createCrmLead(body: LeadPayload) {
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
        description: buildCrmDescription(body),
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

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    console.log("[LEAD]", JSON.stringify({
      timestamp: new Date().toISOString(),
      type: body.type,
      email: body.email,
      praxisName: body.praxisName,
      name: body.name,
      quizScore: body.quizScore,
      newsletterOptIn: body.newsletterOptIn,
    }));

    // Send to both systems in parallel
    await Promise.all([
      subscribeToDigiLetter(body),
      createCrmLead(body),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
