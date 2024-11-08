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
      colors: {
        marronClaro: '#CDB28A', // Marrón claro
        fondo: '#F9F4E3', // Color de fondo. Beige
        verdeClaro: '#D4DDB1', // Verde claro
        verdeOscuro: '#B1BA8E', // Verde mas oscuro
        marronOscuro: '#7A6448', // Marrón oscuro
      },
    },
  },
  plugins: [],
}

