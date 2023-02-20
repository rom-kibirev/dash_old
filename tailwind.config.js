/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDelay: {
        '0': '0ms',
      },
      colors: {
        'pult': '#0f1937',
        'pult-dark': '#050019',
        'pult-button': '#2d3750',
        'pult-hover': '#4b4d5a',
      },
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '60%': '60%',
    }
  },
  plugins: [],
}
