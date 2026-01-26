export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        dark: "#1a1a2e",
        ivory90: "rgba(245,245,240,0.9)",
        ivory: "#f5f5f0",
        soft: "#faf9f6",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
