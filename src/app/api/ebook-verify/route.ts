import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.QUIZ_JWT_SECRET;
if (!JWT_SECRET) throw new Error("QUIZ_JWT_SECRET environment variable is required");

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token fehlt" }, { status: 400 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      praxisName?: string;
      type: string;
    };

    if (decoded.type !== "ebook") {
      return NextResponse.json({ error: "Ungueltiger Token-Typ" }, { status: 400 });
    }

    return NextResponse.json({
      email: decoded.email,
      praxisName: decoded.praxisName,
    });
  } catch {
    return NextResponse.json({ error: "Token ungueltig oder abgelaufen" }, { status: 400 });
  }
}
