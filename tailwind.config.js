/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        invert: {
          css: {
            color: theme("colors.gray.100"),
            a: { color: theme("colors.blue.400") },
            strong: { color: theme("colors.white") },
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.white") },
            code: { backgroundColor: theme("colors.gray.800") },
          },
        },
      }),
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
