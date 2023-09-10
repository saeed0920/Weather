/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./index.html"],
  theme: {
    screens: {
      800: { max: "800px" },
      1000: { max: "1000px" },
      1200: { max: "1200px" },
    },
    extend: {
      colors: {
        primaryColor: "#9b59b6",
      },
    },
  },
  plugins: [],
});
