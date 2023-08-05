/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        dark: "#0A0B0C",
        light: "#A7A0AC",
        lightDark: "#1F1F1F",
        grey: "#585964",
        blue: "#007AFF",
        darkBlue: "#0032FD",
      },
    },
  },
  plugins: [],
};
