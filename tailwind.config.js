/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-pink": "#f9c0ff",
        "my-blue": "#6c97ab",
        "my-orange": "#ffdec0",
      }
    },
  },
  plugins: [],
};
