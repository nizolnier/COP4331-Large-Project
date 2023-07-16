/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./{screens,components}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bgDark': '#1F1D36',
        'bgLight': '#3D3B54',
        'pinkLight': '#E9A6A6',
        'pinkDark': '#9C4A8B',
        'textLight': '#FFF'
      }
    },
  },
  plugins: [],
}

