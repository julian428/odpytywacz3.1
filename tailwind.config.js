/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "60": "#555555",
        "30": "#e4e4e4",
        "10": "#1DA1F2",
      },
      colors: {
        "60": "#555555",
        "30": "#e4e4e4",
        "10": "#1DA1F2",
      }
    },
  },
  plugins: [],
}
