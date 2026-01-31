/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#020408',
                'secondary-dark': '#0a111a',
                'accent-cyan': '#00f2ff',
                'accent-blue': '#0051ff',
                'glass-bg': 'rgba(255, 255, 255, 0.03)',
                'glass-border': 'rgba(255, 255, 255, 0.08)',
                'text-main': '#f0f4f8',
                'text-muted': '#94a3b8',
            },
            fontFamily: {
                heading: ['Montserrat', 'sans-serif'],
                body: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
