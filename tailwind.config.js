/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'steel-blue': '#4682B4',
        'electric-orange': '#ff5a1f',
      },
    },
  },
  plugins: [],
};
