import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#eae7dc',
        slateInk: '#2b2f3a',
        brass: '#b8996c',
      },
      boxShadow: {
        skeuo: '8px 8px 20px rgba(0,0,0,0.35), -8px -8px 20px rgba(255,255,255,0.08)',
        skeuoInset: 'inset 8px 8px 16px rgba(0,0,0,0.35), inset -8px -8px 16px rgba(255,255,255,0.08)'
      },
      backgroundImage: {
        leather: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 60%)",
      },
      borderRadius: {
        soft: '22px',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
export default config
