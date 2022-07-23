/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        current: "currentColor",
        "secondary-dark": "#0A0B0E",
        "secondary-light": "#D0D2D8",
      },
      gridTemplateColumns: {
        "main-aside": "minmax(0,10fr) minmax(300px,2fr)",
      },
      gridTemplateRows: {
        "main-aside": "minmax(160px,260px) minmax(0,8fr)",
      },
      height: {
        "nav-height": "var(--nav-height)",
        "changable_height": "var(--height-top)",

      },

      width: {
        "modal-side": "var(--modal-side)",
      },

      fontFamily: {
        'sans': ['Raleway', 'sans-serif']
      },
      fontSize: {
        sm: ["clamp(0.97rem, calc(0.87rem + 0.37vw),1.20rem)", "1.2"],
        base: ["clamp(1.13rem, calc(0.98rem + 0.73vw),1.50rem)", "1.5"],
        lg: ["clamp(1.27rem, calc(1.03rem + 1.19vw),1.88rem)", "1.4"],
        xl: ["clamp(1.42rem, calc(1.06rem + 1.80vw),2.34rem)", "1.4"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  important: true,
}
