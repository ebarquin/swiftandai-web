/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    darkMode: 'class',    
	theme: {
		extend: {
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', '"Inter"', 'system-ui', 'sans-serif'],
				mono: ['"SF Mono"', 'Monaco', 'Menlo', 'monospace'],
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