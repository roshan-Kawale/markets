/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f7f7f7',
          200: '#e5e5e5',
          300: '#ccc',
          400: '#aaa',
          500: '#666',
          600: '#444',
          700: '#333',
          800: '#222',
        },
      },
    },
  },
  plugins: [],
}