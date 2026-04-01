import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const DIGILETTER_URL = "https://newsletter.wirbauensoftware.de/api/v1/subscribe";
const DIGILETTER_API_KEY = process.env.DIGILETTER_API_KEY || "";
const JWT_SECRET = process.env.QUIZ_JWT_SECRET || "tierarzt-telefonbot-quiz-secret-2026";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tierarzt-telefonbot.de";

interface EbookSubmitPayload {
  email: string;
  praxisName?: string;
  newsletterOptIn?: boolean;
}

export async function POST(request: Request) {
  try {
    const body: EbookSubmitPayload = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ungueltige E-Mail-Adresse" }, { status: 400 });
    }

    const token = jwt.sign(
      {
        email: body.email,
        praxisName: body.praxisName,
        type: "ebook",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const downloadUrl = `${SITE_URL}/ratgeber/download?t=${token}`;

    let alreadyConfirmed = false;

    if (DIGILETTER_API_KEY) {
      try {
        const res = await fetch(DIGILETTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DIGILETTER_API_KEY}`,
          },
          body: JSON.stringify({
            email: body.email,
            tags: ["tierarzt-telefonbot", "quelle-ebook"],
            redirectUrl: downloadUrl,
          }),
        });
        const data = await res.json();
        console.log("[EBOOK-DIGILETTER]", res.status, JSON.stringify(data));

        if (data.status === "confirmed") {
          alreadyConfirmed = true;
        }
      } catch (err) {
        console.error("[EBOOK-DIGILETTER] Error:", err);
      }
    }

    console.log("[EBOOK-SUBMIT]", JSON.stringify({
      timestamp: new Date().toISOString(),
      email: body.email,
      praxisName: body.praxisName,
      alreadyConfirmed,
    }));

    return NextResponse.json({
      success: true,
      alreadyConfirmed,
      downloadUrl: alreadyConfirmed ? downloadUrl : undefined,
    });
  } catch {
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
