/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#034EF4",
        primaryDark: "#0841C0",
        primaryLight: "#BFD3FF",
        secondary: "#6D03F4",
        secondaryDark: "#4308C0",
        secondaryLight: "#D0BFFF",
        error: "#F40303",
        warning: "#F4BF03",
        success: "#10BC36",
        primaryText: "#1A1A1A",
        secondaryText: "#767676",
        line: "#E0E0E0",
        background: "#F9F9F9",
      },
      fontFamily: {
        light: ["beVietnamLight"],
        normal: ["beVietnamRegular"],
        medium: ["beVietnamMedium"],
        semibold: ["beVietnamSemiBold"],
        bold: ["beVietnamBold"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
}
