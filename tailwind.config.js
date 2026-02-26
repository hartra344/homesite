/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm backgrounds
        cream: '#FDFCFA',
        paper: '#F9F8F5',
        stone: '#F3F2EF',
        // Sage greens - primary accent
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e4',
          200: '#c7d0c9',
          300: '#a3b1a6',
          400: '#7c9082',
          500: '#5f7563',
          600: '#4a5d4d',
          700: '#3d4c40',
          800: '#333f35',
          900: '#2b342d',
        },
        // Olive greens - secondary accent
        olive: {
          50: '#f7f8f4',
          100: '#ebefe3',
          200: '#d6dec8',
          300: '#b8c5a3',
          400: '#96a97d',
          500: '#5c6b4d',
          600: '#4a5640',
          700: '#3b4434',
          800: '#31382c',
          900: '#282d25',
        },
        // Warm charcoal - text colors
        charcoal: {
          50: '#f5f6f5',
          100: '#e6e9e6',
          200: '#cfd4d0',
          300: '#adb5ae',
          400: '#838e85',
          500: '#68736a',
          600: '#525c53',
          700: '#434b44',
          800: '#393f3a',
          900: '#2d3a2e',
        },
      },
      fontSize: {
        'display-1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-1': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-3': ['1.25rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section-sm': '3rem',
        'section-md': '4.5rem',
        'section-lg': '6rem',
      },
      maxWidth: {
        'content': '65ch',
        'prose': '72ch',
        'container': '1140px',
      },
      fontDisplay: ['swap'],
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      transitionDuration: {
        DEFAULT: '200ms',
        'fast': '150ms',
        'slow': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
