import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { scopedPreflightStyles, isolateInsideOfContainer } from "tailwindcss-scoped-preflight";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto Slab", "serif"],
      },
      colors: {
        primary: "#2c9f73",
        "dark-primary": "#249168",
      },
      width: {
        140: "35rem",
      },
    },
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".glerk-template"),
    }),
  ],
} satisfies Config;
