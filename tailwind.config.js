/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'light', 
    'dark', 
    'colorful' 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
