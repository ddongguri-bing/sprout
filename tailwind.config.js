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
        hoverGray: "#414141",
        hoverRed: "#D92B2B",
      },
      aspectRatio: {
        "688/450": "688 / 450",
        "339/450": "339 / 450",
        "339/300": "339 / 300"
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
