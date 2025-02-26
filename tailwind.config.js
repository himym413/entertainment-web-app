/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        bodyS: "0.8125rem",
        bodyM: "0.9375rem",
        headingXS: "1.125rem",
        headingSM: "1.5rem",
        headingL: "2rem",
      },
      colors: {
        accentColor: "#FC4747",
        primaryColor: "#161d2f",
        iconsColor: "#5a698f",
        bgAppColor: "#10141e",
      },
      spacing: {
        paddingM: "18px",
      },
      maxHeight: {
        heightNavigationDesktop: "960px",
      },
      screens: {
        customMD: "600px",
      },
    },
  },
  plugins: [],
};
