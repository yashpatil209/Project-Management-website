/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1a237e',
          800: '#0d1b3c',
          900: '#070d1f'
        }
    },
  },
  plugins: [],
}
}
