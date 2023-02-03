/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    fontFamily: {
      serif: ["Domine", "ui-serif", "Georgia", "Cambria", "Times, serif"],
    },
    boxShadow: {
      DEFAULT: "2px 2px 0px rgba(0, 0, 0, 0.2)",
      md: "6px 6px 0px rgba(0, 0, 0, 0.1)",
    },
    extend: {
      colors: { black: "#5E4810" },
      fontSize: { "2xs": "0.625rem" },
    },
  },
  plugins: [],
}
