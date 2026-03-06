const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
      },
      colors: {
        primary: '#4A90E2', // Customize as per your branding
        secondary: '#7ED321', // Customize as per your branding
        accent: '#F5A623', // Customize as per your branding
        background: '#F7F7F7', // Customize as per your branding
        text: '#333333', // Customize as per your branding
      },
    },
  },
  plugins: [],
};