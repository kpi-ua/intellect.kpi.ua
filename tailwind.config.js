/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            xs: '450px',
            sm: '920px',
        },
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
                    900: '#40414d',
                },
                brand: {
                    100: '#3c88cd',
                },
            },
            borderWidth: {
                1: '1px',
            },
            margin: {
                72: '72px',
                140: '140px',
            },
            width: {
                '80%': '80%',
                '1px': '1px',
                '2px': '2px',
                '5px': '5px',
                90: '90px',
                170: '170px',
                200: '200px',
                500: '300px',
            },
            minWidth: {
                9: '2.25rem',
                100: '100px',
                140: '140px',
                200: '200px',
                700: '700px',
            },
            height: {
                100: '100px',
                200: '200px',
                40: '40px',
                225: '225px',
                '5px': '5px',
                '95vh': '95vh',
            },
            minHeight: {
                220: '220px',
                42: '42px',
            },
            maxHeight: {
                550: '550px',
                200: '200px',
            },
            maxWidth: {
                120: '120px',
                160: '160px',
                170: '170px',
                200: '200px',
                350: '350px',
                480: '480px',
                500: '500px',
                600: '600px',
                700: '700px',
                1200: '1200px',
            },
            lineHeight: {
                100: '100px',
            },
            padding: {
                18: '4.5rem',
                160: '160px',
                110: '110px',
                '10px': '10px',
                '7px': '7px',
            },
            borderRadius: {
                8: '8px',
                24: '24px',
            },
            translate: {
                50: '50px',
                '2/5': '40%',
            },
            gap: {
                17: '3.25rem',
                120: '120px',
            },
            gridTemplateColumns: {
                teachers: 'repeat(auto-fill, minmax(140px, 1fr))',
            },
        },
    },
    plugins: [],
};
