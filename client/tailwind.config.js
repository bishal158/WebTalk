/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "modal-backdrop": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
