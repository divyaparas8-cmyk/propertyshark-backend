/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F7F7F5',
          text: '#202020',
          dark: '#20252A',
          accent: '#EF4050',
          'accent-hover': '#d93342',
          card: '#FFFFFF',
          muted: '#6B7280',
          border: '#E5E7EB',
          'dark-card': '#2A3038',
          'dark-border': '#374151'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
