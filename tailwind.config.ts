import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hitachi-inspired color palette
        // Primary: Black
        primary: {
          DEFAULT: '#000000',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0A0A0A',
          950: '#000000',
        },
        // Accent: Golden/Mustard Yellow
        accent: {
          DEFAULT: '#D4A84B',
          50: '#FDF8E8',
          100: '#FCF0C8',
          200: '#F9E49E',
          300: '#F5D36E',
          400: '#EDBC3E',
          500: '#D4A84B',
          600: '#B8923F',
          700: '#956F2F',
          800: '#7A5A27',
          900: '#5C4420',
        },
        // Secondary: Slate Gray
        secondary: {
          DEFAULT: '#64748B',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
        },
        // Background colors - Clean whites and light grays
        background: {
          DEFAULT: '#F5F5F5',
          white: '#FFFFFF',
          soft: '#F5F5F5',
          surface: '#FAFAFA',
        },
        // Surface / Card
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
        },
        // Border / Divider
        border: {
          DEFAULT: '#E5E5E5',
          divider: '#E5E5E5',
          light: '#F0F0F0',
        },
        // Text colors
        text: {
          DEFAULT: '#000000',
          primary: '#000000',
          secondary: '#525252',
          muted: '#737373',
          light: '#A3A3A3',
        },
        // Keep brand for backward compatibility (now maps to accent golden)
        brand: {
          50: '#FDF8E8',
          100: '#FCF0C8',
          200: '#F9E49E',
          300: '#F5D36E',
          400: '#EDBC3E',
          500: '#D4A84B',
          600: '#B8923F',
          700: '#956F2F',
          800: '#7A5A27',
          900: '#5C4420',
          950: '#3D2E15',
        },
        // Neutral colors
        neutral: {
          white: '#FFFFFF',
          'off-white': '#F5F5F5',
          surface: '#FAFAFA',
          border: '#E5E5E5',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          charcoal: '#171717',
          black: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.1)',
        subtle: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
