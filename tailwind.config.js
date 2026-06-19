/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-pink": "#f9c0ff",
        "my-blue": "#6c97ab",
        "coffee": "#997d63",
        "brown": "#3b2e23",
      },
      keyframes: {
        "swipe-bob": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.7" },
          "50%": { transform: "translateY(-10px)", opacity: "1" },
        },
      },
      animation: {
        "swipe-bob": "swipe-bob 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
