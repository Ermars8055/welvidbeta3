/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'light', 
    'dark', 
    'colorful' // Include additional themes if needed
  ],
  darkMode: 'class', // Enables class-based dark mode (required for the dynamic dark mode functionality)
  theme: {
    extend: {
      colors: {
        colorful: {
          50: '#ffebf0', 
          100: '#ffccd5',
          200: '#ffa3b4',
          300: '#ff7894',
          400: '#ff5176',
          500: '#ff2a58', // Custom vibrant color for "colorful" theme
          600: '#e6224e',
          700: '#cc1b44',
          800: '#b3133a',
          900: '#991030',
        },
      },
    },
  },
  plugins: [],
};
