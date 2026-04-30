import type { Config } from "tailwindcss";

// Coliving Cait brand design system
// Colors, typography, and spacing tokens are mapped here so every component
// can reference the brand directly via Tailwind utility classes.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary dark background
        charcoal: "#1C1917",
        // Primary accent
        gold: {
          DEFAULT: "#C4955A",
          light: "#E8D5B5", // italic emphasis on dark backgrounds
          dark: "#8B6535",  // links on cream backgrounds
        },
        // Light backgrounds — pulled cooler/paler so they read as off-white
        // instead of tan. Cream is the page default, blush is the secondary.
        cream: "#F8F5EF",
        blush: "#F2EDE4",
        // Body text
        warmgray: "#6B6560",
      },
      borderColor: {
        // Card / divider border (gold @ 25% opacity)
        brand: "rgba(196,149,90,0.25)",
      },
      fontFamily: {
        // Headings — Cormorant Garamond (weight 500, italic for emphasis)
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        // Body — DM Sans (weight 300 body, 500 labels)
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Eyebrow labels: 0.18em uppercase gold
        eyebrow: "0.18em",
        // Buttons: uppercase 0.09em
        button: "0.09em",
      },
      lineHeight: {
        // Heading tight 1.1, body open 1.8
        heading: "1.1",
        body: "1.8",
      },
      fontSize: {
        // Eyebrow labels are 9–10px
        eyebrow: ["0.625rem", { letterSpacing: "0.18em", lineHeight: "1.2" }],
      },
      borderRadius: {
        // Buttons are square corners — keep "none" available explicitly
        none: "0",
      },
    },
  },
  plugins: [],
};

export default config;
