/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js",],
  theme: {
    extend: {
      boxShadow: {
        "slay-sm": "6px 6px 6px 2px rgba(62, 54, 54, 0.23)",
      }
    },
  },
  plugins: [],
}

