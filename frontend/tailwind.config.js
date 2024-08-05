/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neu: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
      },
    },
  },
  plugins: [],
}