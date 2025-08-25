import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1d1b18',        // deep brown-black for text on light panels
        parchment: '#efe6d8',  // warm light base
        clay: '#caa27b',       // warm accent
        terracotta: '#b56b3f', // stronger accent
        cocoa: '#6a4a3c',      // deep accent
        night: '#0f0d0b',      // page bg
      },
      boxShadow: {
        skeuo: '10px 10px 26px rgba(0,0,0,0.35), -8px -8px 22px rgba(255,255,255,0.25)',
        skeuoInset: 'inset 10px 10px 18px rgba(0,0,0,0.25), inset -10px -10px 18px rgba(255,255,255,0.35)'
      },
      borderRadius: {
        soft: '22px',
      },
    },
  },
  plugins: [],
}
export default config
