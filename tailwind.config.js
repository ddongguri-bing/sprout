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
        "339/300": "339 / 300",
      },
      screens: {
        md: { max: "1024px" },
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotateX(0)" },
          "12.5%": { transform: "rotateY(90deg)" },
          "25%": { transform: "rotateY(270deg)" },
          "37.5%": { transform: "rotateY(270deg)" },
          "50%": { transform: "rotateY(360deg)" },
          "62.5%": { transform: "rotateX(90deg)" },
          "75%": { transform: "rotateX(180deg)" },
          "87.5%": { transform: "rotateX(270deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 10s ease-in-out infinite",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".side": {
          "@apply absolute w-[200px] h-[200px] bg-[url(/assets/sucoding.jpg)] bg-no-repeat bg-center bg-contain opacity-95":
            "",
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
