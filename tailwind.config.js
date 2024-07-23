/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-dark": "rgb(21, 21, 21)",
      },
    },
  },
  plugins: [],
};

