/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#0A0B0C",
        light: "#A7A0AC",
        lightDark: "#1C2128",
        grey: "#585964",
        blue: "#007AFF",
        darkBlue: "#0032FD",
      },
    },
  },
  plugins: [],
};
