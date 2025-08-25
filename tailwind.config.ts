import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#E7F8FF',
        cyanNeon: '#00E6FF',
        cyanSoft: '#6FEAFF',
        violetNeon: '#9A6CFF',
        navyDeep: '#0b1220',
      },
      boxShadow: {
        skeuo: '8px 8px 20px rgba(0,0,0,0.5), -8px -8px 20px rgba(255,255,255,0.04), 0 0 24px rgba(0,230,255,0.08)',
        skeuoInset: 'inset 8px 8px 16px rgba(0,0,0,0.5), inset -8px -8px 16px rgba(255,255,255,0.04)'
      },
      backgroundImage: {
        leather: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 60%)",
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
