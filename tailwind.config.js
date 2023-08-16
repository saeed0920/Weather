/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#9b59b6",
      },
    },
  },
  plugins: [],
});
