/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // 이 부분이 올바르게 되어 있어야 함!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};