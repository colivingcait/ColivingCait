import type { Config } from "tailwindcss";

// Coliving Cait brand design system — v2 (May 2026)
// Tokens mirror Section 3 of the playbook so utilities map 1:1 to the HTML
// design files. See globals.css for component-level helpers (.btn-*, .eyebrow,
// .reveal) that are shared across pages.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1C1917",
          soft: "#2A2725",
        },
        gold: {
          DEFAULT: "#C4955A",
          light: "#E8D5B5",
          dark: "#8B6535",
        },
        cream: "#FAF7F2",
        blush: "#F0E8E0",
        warmgray: {
          DEFAULT: "#6B6560",
          light: "#A09A94",
        },
      },
      borderColor: {
        // Card / divider borders
        brand: "rgba(196,149,90,0.15)",
        soft: "rgba(28,25,23,0.06)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
        button: "0.12em",
      },
      lineHeight: {
        heading: "1.08",
        body: "1.8",
      },
      fontSize: {
        eyebrow: ["0.625rem", { letterSpacing: "0.2em", lineHeight: "1.2" }],
      },
      borderRadius: {
        none: "0",
      },
      boxShadow: {
        card: "0 12px 32px rgba(28,25,23,0.04)",
        cardGold: "0 16px 40px rgba(196,149,90,0.08)",
        btnGold: "0 16px 40px rgba(196,149,90,0.2)",
        photo: "0 12px 40px rgba(28,25,23,0.08)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        heroReveal: "heroReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        heroReveal: {
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
