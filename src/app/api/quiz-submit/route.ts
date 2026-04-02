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

interface QuizSubmitPayload {
  email: string;
  praxisName?: string;
  name?: string;
  quizAnswers: Record<string, number>;
  quizScore: number;
}

export async function POST(request: Request) {
  try {
    const body: QuizSubmitPayload = await request.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    // Generate signed JWT with quiz data
    const token = jwt.sign(
      {
        email: body.email,
        praxisName: body.praxisName,
        quizAnswers: body.quizAnswers,
        quizScore: body.quizScore,
      },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    const resultUrl = `${SITE_URL}/check/ergebnis?t=${token}`;

    // Parse name
    const nameParts = (body.name || "").trim().split(" ");
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

    let alreadyConfirmed = false;

    // Subscribe to DigiLetter with redirectUrl
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
            firstName,
            lastName,
            tags: ["tierarzt-telefonbot", "quelle-kostenrechner"],
            listId: DIGILETTER_LIST_ID,
            redirectUrl: resultUrl,
          }),
        });
        const data = await res.json();
        console.log("[QUIZ-DIGILETTER]", res.status, JSON.stringify(data));

        // If already confirmed, skip DOI — redirect directly
        if (data.status === "confirmed") {
          alreadyConfirmed = true;
        }
      } catch (err) {
        console.error("[QUIZ-DIGILETTER] Error:", err);
      }
    }

    console.log("[QUIZ-SUBMIT]", JSON.stringify({
      timestamp: new Date().toISOString(),
      email: body.email,
      praxisName: body.praxisName,
      quizScore: body.quizScore,
      alreadyConfirmed,
    }));

    // Return result URL if already confirmed (no DOI needed)
    return NextResponse.json({
      success: true,
      alreadyConfirmed,
      resultUrl: alreadyConfirmed ? resultUrl : undefined,
    });
  } catch {
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
