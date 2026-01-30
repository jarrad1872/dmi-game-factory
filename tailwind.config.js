/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dmi: {
          orange: '#FF6B00',
          blue: '#4FC3F7',
          dark: '#0a1628',
          darker: '#060d18',
        }
      }
    },
  },
  plugins: [],
}
