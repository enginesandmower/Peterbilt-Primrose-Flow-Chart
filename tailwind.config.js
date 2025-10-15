// @ts-check
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#2563EB',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeOut: { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
        'fade-in-out': 'fadeIn 0.3s ease-in, fadeOut 0.3s ease-out'
      }
    },
  },
  plugins: [],
};