/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
        },
        crimson: {
          DEFAULT: "#e11d48",
          dark: "#be123c",
          deeper: "#9f1239",
        },
        amber: {
          DEFAULT: "#f59e0b",
        },
        chrome: {
          light: "#f1f5f9",
          DEFAULT: "#94a3b8",
          dark: "#64748b",
        },
      },
      fontFamily: {
        boogaloo: ["Boogaloo", "cursive"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
