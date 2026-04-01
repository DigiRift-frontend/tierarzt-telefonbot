import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.QUIZ_JWT_SECRET || "tierarzt-telefonbot-quiz-secret-2026";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token fehlt" }, { status: 400 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
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
