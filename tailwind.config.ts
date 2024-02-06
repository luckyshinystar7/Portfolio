import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        portrait: { raw: "(min-aspect-ratio: 1/1)" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base-100": "#FAF9F6",
        "base-200": "#e1e0dd",
        "base-300": "#4b4a49",
        "base-400": "#191818",
        "primary-100": "#60a5fa",
        "primary-200": "#2563eb",
        "secondary-100": "#fb923c",
        "secondary-200": "#ea580c",
      },
      rotate: {
        "270": "270deg",
      },
    },
  },
  plugins: [],
};
export default tailwindConfig;
