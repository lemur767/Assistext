/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#67e8f9',
          500: '#06b6d4',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        blue: {
          950: '#172554',
        },
      },
      boxShadow: {
        'purple-500/30': '0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.15)',
      },
    },
  },
  plugins: [],
}
