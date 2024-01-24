const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: 'Poppins, system-ui, sans-serif',
                inter: 'Inter, system-ui, sans-serif',
                monty: 'Montserrat, system-ui, sans-serif',
                archivo: '`Archivo Black`, system-ui, sans-serif',
            },
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}