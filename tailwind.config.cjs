/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bright-pink': '#f91880'
      }
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
