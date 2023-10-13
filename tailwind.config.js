/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f4d80',
        neutral: '#afb0be',
        inactive: 'rgba(255, 255, 255, .4)'
      },
      margin: {
        72: '72px'
      },
      width: {
        '80%': '80%',
        90: '90px',
        200: '200px'
      },
      height: {
        100: '100px',
        40: '40px',
      },
      minHeight: {
        220: '220px',
        42: '42px',
      },
      maxWidth: {
        500: '500px',
        1200: '1200px'
      },
      lineHeight: {
        100: '100px'
      },
      padding: {
        18: '4.5rem'
      },
      translate: {
        50: '50px',
      }
    },
  },
  plugins: [],
}

