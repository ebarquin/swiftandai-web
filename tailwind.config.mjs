/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    darkMode: 'class',    
	theme: {
		extend: {
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
				mono: ['"SF Mono"', 'Monaco', 'Menlo', 'monospace'],
			},
			borderRadius: {
				card: '2rem',
				'card-inner': '1.5rem',
			},
			colors: {
				primary: '#0071e3',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}