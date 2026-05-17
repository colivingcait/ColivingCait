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
          backgroundColor: "#1C1917",
          color: "#FAF7F2",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Left content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "72px 60px",
            width: "65%",
          }}
        >
          {/* Subtle gold rule along the top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 60,
              width: 400,
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
              fontSize: 62,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#FAF7F2",
              maxWidth: 600,
              display: "flex",
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 22,
                lineHeight: 1.4,
                color: "rgba(250,247,242,0.7)",
                fontFamily: "system-ui, sans-serif",
                maxWidth: 560,
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          ) : null}

          {/* Bottom row — wordmark */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingTop: 24,
              borderTop: "1px solid rgba(232,213,181,0.18)",
            }}
          >
            <div
              style={{
                fontSize: 28,
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
                fontSize: 14,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(232,213,181,0.5)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Investor · Coach · Realtor
            </div>
          </div>
        </div>

        {/* Right side — photo */}
        <div
          style={{
            width: "35%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Diagonal overlay to blend photo into dark background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 120,
              background: "linear-gradient(90deg, #1C1917 0%, transparent 100%)",
              zIndex: 1,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.colivingcait.com/og-image.png"
            alt=""
            width={420}
            height={630}
            style={{
              objectFit: "cover",
              objectPosition: "right center",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
