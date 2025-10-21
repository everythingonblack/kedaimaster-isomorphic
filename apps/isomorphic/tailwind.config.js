/** @type {import('tailwindcss').Config} */
const sharedConfig = require('tailwind-config');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [sharedConfig],
  theme: {},
  plugins: [],
};
