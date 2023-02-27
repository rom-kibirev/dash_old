/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
      },
      colors: {
        'pult': '#0f1937',
        'pult-dark': '#050019',
        'pult-button': '#2d3750',
        'pult-hover': '#69738c',
        'pult-selected': '#696b82',
        'warning': '#ff9664',
      },
      fontSize: {
        'mm': ['0.8rem', {
          lineHeight: '1.1rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
      }
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '60%': '60%',
    },
  },
  plugins: [],
}
