/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f4d80',
        inactive: 'rgba(255, 255, 255, .4)',
        gray: '#bbb',
        neutral: {
          100: '#eeeef7',
          200: '#e5e7ef',
          400: '#afb0be',
          500: '#afb0be',
          600: '#808191',
          900: '#40414d'
        },
      },
      borderWidth: {
        1: '1px'
      },
      margin: {
        72: '72px',
        140: '140px'
      },
      width: {
        '80%': '80%',
        '1px': '1px',
        '2px': '2px',
        '5px': '5px',
        90: '90px',
        170: '170px',
        200: '200px'
      },
      minWidth: {
        140: '140px'
      },
      height: {
        100: '100px',
        40: '40px',
        '5px': '5px'
      },
      minHeight: {
        220: '220px',
        42: '42px',
      },
      maxHeight: {
        550: '550px'
      },
      maxWidth: {
        500: '500px',
        1200: '1200px'
      },
      lineHeight: {
        100: '100px'
      },
      padding: {
        18: '4.5rem',
        160: '160px',
        110: '110px'
      },
      translate: {
        50: '50px',
        '2/5': '40%',
      },
      gap: {
        17: '3.25rem'
      }
    },
  },
  plugins: [],
}

