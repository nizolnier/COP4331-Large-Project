/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "slay-sm": "6px 6px 6px 2px rgba(62, 54, 54, 0.23)",
      }
    },
  },
  plugins: [],
}

