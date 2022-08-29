/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        90: "90%",
        300: "320px",
        200: "200px",
        89: "89%",
        85: "85%",
      },
      width: {
        320: "320px",
        95: "95%",
        90: "90%",
        87: "87%",
        79: "79%",
        70: "70%",
        67: "67%",
        65: "65%",
        47: "47%",
        45: "45%",
        49: "49%",
        30: "30%",
        28: "28%",
        25: "25%",
        "10%": "10%",
      },
      maxWidth: {
        80: "80%",
      },
      animation: {
        succesDivAnimation: " success 3s forwards",
      },
      keyframes: {
        success: {
          " 0%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
