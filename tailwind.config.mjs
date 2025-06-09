/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'primary': '#E67A2E', 
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [],
}
