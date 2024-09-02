/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgBody': '#17181f',
        'accent': '#61dafb',
        'bgTask': '#30313d',
      },
    },
  },
  plugins: [],
}

