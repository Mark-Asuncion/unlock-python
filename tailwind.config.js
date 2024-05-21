/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: '#2C6999',
                secondary: '#FFD944',
            }
        },
    },
    plugins: [],
}

