import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "header-back-color": "#0c0c0c",
      "header-font-color": "rgb(229, 229, 229)",
      "body-back-color": "rgb(17 24 39)",
      "card-back-color": "rgb(63 63 70)",
      "content-white": "#ffffff",
      "input-back": "rgb(39 39 42)",
      primary: "#0d6efd",
    },
  },
  plugins: [],
};
export default config;
