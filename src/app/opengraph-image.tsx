import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "tierarzt-telefonbot.de — KI-Telefonbot für Tierarztpraxen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a7a6d 0%, #135c53 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "30px",
              padding: "8px 24px",
              color: "white",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            KI-TELEFONBOT
          </div>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Nie wieder einen Anruf verpassen
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "40px",
          }}
        >
          Der KI-Telefonbot für Ihre Tierarztpraxis. Notfall-Triage,
          Terminbuchung, Rezeptbestellungen.
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "white",
          }}
        >
          tierarzt-telefonbot.de
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "8px",
          }}
        >
          Ein Service der DigiRift GmbH, Hamburg
        </div>
      </div>
    ),
    { ...size }
  );
}
