import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.QUIZ_JWT_SECRET;
  if (!secret) throw new Error("QUIZ_JWT_SECRET environment variable is required");
  return secret;
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token fehlt" }, { status: 400 });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as {
      email: string;
      praxisName?: string;
      quizAnswers: Record<string, number>;
      quizScore: number;
    };

    return NextResponse.json({
      email: decoded.email,
      praxisName: decoded.praxisName,
      quizAnswers: decoded.quizAnswers,
      quizScore: decoded.quizScore,
    });
  } catch {
    return NextResponse.json({ error: "Token ungültig oder abgelaufen" }, { status: 400 });
  }
}
