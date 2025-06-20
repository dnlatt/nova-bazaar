// tailwind.config.ts
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Work Sans'", "sans-serif"],
      },
      maxWidth: {
        screen: "1440px", // custom max width
      },
      fontSize: {
        h1: ["67px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["51px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["38px", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["28px", { lineHeight: "1.4", fontWeight: "500" }],
        h5: ["22px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
    },
  },
  plugins: [
    require("tw-animate-css"),
    plugin(function ({ addBase }) {
      addBase({
        body: {
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "'Work Sans', sans-serif",
        },
        h1: { fontSize: "67px" },
        h2: { fontSize: "51px" },
        h3: { fontSize: "38px" },
        h4: { fontSize: "28px" },
        h5: { fontSize: "22px" },
        p: { fontSize: "16px" },
      });
    }),
  ],
};

export default config;
