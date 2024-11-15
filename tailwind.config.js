/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['monserrat', 'monserrat'],
      },
      textStroke: {
        '1': '1px',
        '2': '2px',
      },
      colors: {
        marronClaro: '#CDB28A', // Marrón claro
        fondo: '#F9F4E3', // Color de fondo. Beige
        verdeClaro: '#D4DDB1', // Verde claro
        verdeOscuro: '#B1BA8E', // Verde mas oscuro
        marronOscuro: '#7A6448', // Marrón oscuro
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1': {
          '-webkit-text-stroke': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

