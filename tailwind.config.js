/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        bilbo: ["Bilbo", "cursive"],
      },
      colors: {
        primary: "#F2C94C",
        secondary: "#2F80ED",
      },
    },
  },
  plugins: [],
};
