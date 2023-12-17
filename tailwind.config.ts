import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,mdx,css,scss,sass}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", ...fontFamily.sans],
        mono: ["var(--font-ibm-plex-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config;
