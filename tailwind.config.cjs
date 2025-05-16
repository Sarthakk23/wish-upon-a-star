module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.{css,pcss}"
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#f472b6'
        },
        red: {
          300: '#fca5a5'
        },
        purple: {
          300: '#d8b4fe'
        },
        rose: {
          300: '#fda4af'
        },
        fuchsia: {
          400: '#e879f9'
        }
      }
    }
  },
  plugins: [],
}