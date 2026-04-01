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

const DIGILETTER_URL = "https://newsletter.wirbauensoftware.de/api/v1/subscribe";
const DIGILETTER_API_KEY = process.env.DIGILETTER_API_KEY || "";

async function subscribeToDigiLetter(body: LeadPayload) {
  if (!DIGILETTER_API_KEY) {
    console.warn("[DIGILETTER] No API key configured — skipping newsletter subscription");
    return;
  }

  // Build tags for source tracking
  const tags: string[] = ["tierarzt-telefonbot"];

  // Tag by lead source
  switch (body.type) {
    case "quiz":
      tags.push("quelle-kostenrechner");
      break;
    case "ebook":
      tags.push("quelle-ebook");
      break;
    case "contact":
      tags.push("quelle-kontaktformular");
      break;
    case "demo-gate":
      tags.push("quelle-demo");
      break;
  }

  // Parse name
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
      body: JSON.stringify({
        email: body.email,
        firstName,
        lastName,
        tags,
      }),
    });

    const data = await res.json();
    console.log("[DIGILETTER]", res.status, JSON.stringify(data));
  } catch (err) {
    console.error("[DIGILETTER] Error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    // Log the lead
    console.log("[LEAD]", JSON.stringify({
      timestamp: new Date().toISOString(),
      type: body.type,
      email: body.email,
      praxisName: body.praxisName,
      name: body.name,
      quizScore: body.quizScore,
      newsletterOptIn: body.newsletterOptIn,
    }));

    // Subscribe to DigiLetter newsletter (with Double Opt-In)
    // Always subscribe — the newsletter checkbox controls the "newsletter" tag
    // but every lead gets added to DigiLetter for tracking
    if (body.newsletterOptIn) {
      await subscribeToDigiLetter({ ...body });
    } else {
      // Still subscribe but without newsletter tag — just lead tracking
      await subscribeToDigiLetter({ ...body });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
