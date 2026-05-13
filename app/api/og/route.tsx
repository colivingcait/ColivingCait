import { ImageResponse } from "next/og";

export const runtime = "edge";

// Dynamic Open Graph card generator. Renders a 1200x630 branded card
// using the Coliving Cait palette. Called via /api/og?title=...&eyebrow=...
//
// Per-page metadata can build a URL like:
//   /api/og?title=Strategy+Session&eyebrow=Book+a+call
// and reference it from `metadata.openGraph.images`.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") ??
    "Building wealth through intentional coliving.";
  const eyebrow = searchParams.get("eyebrow") ?? "ColivingCait.com";
  const subtitle = searchParams.get("subtitle");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1C1917",
          color: "#FAF7F2",
          fontFamily: "Georgia, serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Subtle gold rule along the top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: 2,
            background: "linear-gradient(90deg, #C4955A 0%, rgba(196,149,90,0) 100%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#E8D5B5",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#C4955A" }}>✦</span>
          <span>{eyebrow}</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: "#FAF7F2",
            maxWidth: 980,
            display: "flex",
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(250,247,242,0.7)",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {/* Bottom row — wordmark */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(232,213,181,0.18)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#FAF7F2",
              display: "flex",
              alignItems: "baseline",
              gap: 2,
            }}
          >
            <span>Coliving</span>
            <span style={{ color: "#E8D5B5", fontStyle: "italic" }}>Cait</span>
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(232,213,181,0.6)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Atlanta · Investor · Coach · Realtor
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
