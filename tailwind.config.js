/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "linear-gradient(180deg, rgba(143, 118, 76, 0.40) 0%, rgba(80, 61, 31, 0.90) 100%), url('/assets/images/home-background-blur.svg')",
        'gradient-1': 'linear-gradient(180deg, #907A48 0%, #3A4928 100%);',
        'gradient-2': 'linear-gradient(180deg, #EEE8CE 62.5%, #D4BF88 100%);',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#D4BF88',
        accent: '#A87F22',
        neutral: {
          20: '#F5F5F5',
          60: '#575757',
          50: '#7A7A7A',
        },
        forest: {
          a: '#4B6B3C',
          b: '#3A4928',
          c: '#3B2E1E',
          d: '#907A48',
          e: '#D4BF88',
          f: '#E6DEB9',
          g: '#EEE8CE',
        },
      },
      boxShadow: {
        bantuan: '0px 10px 0px 0px #3A4928;',
      },
      keyframes: {
        loading: {
          '0%': { height: '100%' },
          '45%': { height: '0%' },
          '90%': { height: '100%' },
        },
      },
      animation: {
        'loading-page': 'loading 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
