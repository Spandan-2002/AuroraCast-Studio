import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        foreground: "#F2F5FF",
        background: "#05070F",
        border: "#111324",
        white: {
          1: "#F7F9FF",
          2: "rgba(247, 249, 255, 0.78)",
          3: "rgba(247, 249, 255, 0.48)",
          4: "rgba(247, 249, 255, 0.62)",
          5: "rgba(247, 249, 255, 0.86)",
        },
        black: {
          1: "#0B1020",
          2: "#131935",
          3: "#0A0F1C",
          4: "#1C243F",
          5: "#1F2747",
          6: "#151B33",
        },
        orange: {
          1: "#7F5AF0",
        },
        teal: {
          1: "#2CB1BC",
          2: "#1F8A99",
        },
        gray: {
          1: "#8F9BB7",
          2: "#5B6382",
        },
      },
      backgroundImage: {
        "nav-focus":
          "linear-gradient(270deg, rgba(127, 90, 240, 0.18) 0%, rgba(44, 177, 188, 0.00) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
