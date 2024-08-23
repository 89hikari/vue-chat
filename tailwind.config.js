/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    fontFamily: {
      sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
