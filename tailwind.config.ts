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
        "off-white": "#FAF9F6",
      },
      rotate: {
        "270": "270deg",
      },
    },
  },
  plugins: [],
};
export default tailwindConfig;
