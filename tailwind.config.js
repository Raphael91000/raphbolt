/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00DCD9',
          dark: '#00B8B5',
          light: '#5EFFFC',
        },
        background: {
          DEFAULT: '#000000',
          light: '#121212',
        },
        accent: {
          blue: '#3B82F6',
          purple: '#7C3AED',
          orange: '#FF7D00',
          green: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beam': 'beam 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        beam: {
          '0%': { transform: 'translateY(100%) translateX(-50%)', opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-20%) translateX(50%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};