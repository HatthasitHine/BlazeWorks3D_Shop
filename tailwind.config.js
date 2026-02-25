/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Thai Looped"', 'sans-serif'],
        mitr: ['Mitr', 'sans-serif'],
      }
    },
  },
  plugins: [],
}