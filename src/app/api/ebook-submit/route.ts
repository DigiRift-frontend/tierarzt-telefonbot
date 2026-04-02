import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const DIGILETTER_URL = "https://newsletter.wirbauensoftware.de/api/v1/subscribe";
const DIGILETTER_API_KEY = process.env.DIGILETTER_API_KEY || "";
const DIGILETTER_LIST_ID = "cmnh9n50l0001qc01x4ol27vo";
function getJwtSecret() {
  const secret = process.env.QUIZ_JWT_SECRET;
  if (!secret) throw new Error("QUIZ_JWT_SECRET environment variable is required");
  return secret;
}
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
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    const token = jwt.sign(
      {
        email: body.email,
        praxisName: body.praxisName,
        type: "ebook",
      },
      getJwtSecret(),
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
            listId: DIGILETTER_LIST_ID,
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
