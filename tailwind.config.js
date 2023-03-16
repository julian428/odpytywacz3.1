/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "60": "#0E1014",
        "30": "#323232",
        "10": "#6BCAF7",
      },
      colors: {
        "60": "#0E1014",
        "30": "#E8E3DC",
        "10": "#6DCEFC",
      }
    },
  },
  plugins: [],
}
