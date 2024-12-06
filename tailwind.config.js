/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1a1a1a",
        main: "#91c788",
        whiteDark: "#dbdbdb",
        white: "#fefefe",
        gray: "#4d4d4d",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
