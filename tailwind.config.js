/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#0A1020',
          dark: '#10182D',
          midnight: '#111C35',
          card: '#16223D',
          border: '#1E2D4A',
        },
        brand: {
          bg: '#F7F8FC',
          text: '#111827',
          muted: '#667085',
          border: '#E5E7EB',
          blue: '#2563EB',
          'royal-blue': '#3B82F6',
          indigo: '#4F46E5',
          purple: '#6D28D9',
          'bright-purple': '#7C3AED',
          lavender: '#A78BFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-blue-indigo': 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #6D28D9 100%)',
        'gradient-indigo-purple': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        'gradient-navy-purple': 'linear-gradient(135deg, #0A1020 0%, #111C35 55%, #312E81 100%)',
      }
    },
  },
  plugins: [],
}

