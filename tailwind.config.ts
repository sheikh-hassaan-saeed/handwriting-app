import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        caveat: ["var(--font-caveat)", "cursive"],
        "homemade-apple": ["var(--font-homemade-apple)", "cursive"],
        "patrick-hand": ["var(--font-patrick-hand)", "cursive"],
        "dancing-script": ["var(--font-dancing-script)", "cursive"],
        "architects-daughter": ["var(--font-architects-daughter)", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
