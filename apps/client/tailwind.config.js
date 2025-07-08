/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paraguay: {
          red: '#D52B1E',
          blue: '#0038A8', 
          white: '#FFFFFF'
        },
        primary: {
          50: '#eff6ff',
          500: '#0038A8', // Azul Paraguay
          600: '#002c85',
          700: '#002270'
        },
      },
    },
  },
  plugins: [],
} 