/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A8D6EB",
        secondary: "#5088A1",
        tertiary: "#C9E1EC",
        quarter: "#0B3649",
        penta:"#a8d6eb61"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

// npm install -D tailwindcss@3 postcss autoprefixer
// npx tailwindcss init -p
