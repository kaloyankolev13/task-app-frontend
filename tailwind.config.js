/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',"src/components/**/*.vue"],
  media: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        russianland: ['RussianLandCyrillic'],
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
}

