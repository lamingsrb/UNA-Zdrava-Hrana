import type { Config } from 'tailwindcss'

const leaf = {
  50: '#EFF8F1',
  100: '#D8EEDD',
  200: '#B5DFC0',
  300: '#8ACB9D',
  400: '#5BB37A',
  500: '#37985D',
  600: '#27814C',
  700: '#20663E',
  800: '#1C5234',
  900: '#17432C',
  950: '#0B2418',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // UNA brand — duboka šuma, krem, list, med
        cream: {
          50: '#FBF8F1',
          100: '#F6F0E3',
          200: '#EDE3CE',
          300: '#E0D2B4',
        },
        // topla "papirna" površina za kartice — umesto čisto bele
        paper: '#FFFDF7',
        forest: {
          600: '#1E4D33',
          700: '#16402A',
          800: '#0F2E1E',
          900: '#0A2316',
          950: '#061A10',
        },
        leaf,
        primary: leaf, // alias, sigurnosna mreža za starije klase
        honey: {
          50: '#FBF5E6',
          100: '#F6E8C5',
          200: '#EDD493',
          300: '#E3BC5F',
          400: '#D9A53C',
          500: '#C98F2B',
          600: '#A87122',
          700: '#86571E',
          800: '#6D461D',
          900: '#5C3B1C',
        },
        ink: '#101B14',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        soft: '0 2px 20px -2px rgb(16 27 20 / 0.08)',
        lift: '0 12px 40px -8px rgb(16 27 20 / 0.16)',
        'glow-leaf': '0 0 60px -12px rgb(55 152 93 / 0.45)',
        'glow-honey': '0 0 60px -12px rgb(217 165 60 / 0.4)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        // CSS ulazna animacija za hero (LCP ne čeka hidrataciju JS-a)
        'hero-in': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.6s ease-in-out infinite',
        'hero-in': 'hero-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        bob: 'bob 2.2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
