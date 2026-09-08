/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6B00',
          accent: '#FF7A1A',
          light: '#FFF0E6',
          dark: '#E05D00',
        },
        navy: {
          DEFAULT: '#141416',
          dark: '#0B0B0E',
        },
        gray: {
          bg: '#F8F9FD',
          card: '#F3F4F8',
          border: '#E9ECF2',
          subtext: '#777E90',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'nav': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 10px 25px rgba(255, 107, 0, 0.35)',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
