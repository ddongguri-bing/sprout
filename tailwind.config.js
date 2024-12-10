/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1a1a1a",
        main: "#91c788",
        whiteDark: "#dbdbdb",
        white: "#fefefe",
        gray: "#4d4d4d",
        grayDark: "#333",
        red: "#FF3333",
        hoverMain: "#7BA974",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
