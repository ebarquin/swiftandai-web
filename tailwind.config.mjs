/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', '"Inter"', 'system-ui', 'sans-serif'],
				mono: ['"SF Mono"', 'Monaco', 'Menlo', 'monospace'],
			},
			colors: {
				primary: '#007aff', 
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}