/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    fontFamily: {
      serif: ["Lora", "ui-serif", "Georgia", "Cambria", "Times, serif"],
    },
    boxShadow: {
      DEFAULT: "2px 2px 0px rgba(0, 0, 0, 0.2)",
      md: "6px 6px 0px rgba(0, 0, 0, 0.1)",
    },
    extend: {},
  },
  plugins: [],
}
