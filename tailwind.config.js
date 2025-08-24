/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
        luxury: {
          emerald: '#10b981',
          'emerald-dark': '#047857',
          'emerald-light': '#34d399',
          'smoke-light': '#6b7280',
          'smoke': '#4b5563',
          'smoke-dark': '#374151',
          'charcoal': '#1f2937',
          'charcoal-dark': '#111827',
          'platinum': '#e5e7eb',
          'silver': '#d1d5db',
        },
        neon: {
          emerald: '#10b981',
          silver: '#d1d5db',
          platinum: '#f3f4f6',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'emerald-pulse': 'emerald-pulse 4s ease-in-out infinite',
        'luxury-flow': 'luxury-flow 8s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px #10b981' },
          'to': { boxShadow: '0 0 30px #10b981, 0 0 40px #10b981' },
        },
        'emerald-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.8',
            filter: 'hue-rotate(0deg)'
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '1',
            filter: 'hue-rotate(20deg)'
          },
        },
        'luxury-flow': {
          '0%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)'
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(20deg)'
          },
          '100%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)'
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-grid': `
          linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
        `,
        'emerald-glow': `
          radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.05) 0%, transparent 50%)
        `,
        'luxury-gradient': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(26, 26, 26, 0.8) 50%, rgba(4, 120, 87, 0.1) 100%)',
      },
      backgroundSize: {
        'luxury-grid': '50px 50px, 50px 50px, 25px 25px',
        'emerald-glow': '200px 200px, 200px 200px, 100px 100px',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        'luxury': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'emerald': '0 0 50px rgba(16, 185, 129, 0.3)',
        'luxury': '0 0 30px rgba(16, 185, 129, 0.4)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-silver': '0 0 20px rgba(209, 213, 219, 0.5)',
        'inner-emerald': 'inset 0 2px 8px rgba(16, 185, 129, 0.1)',
        'luxury-deep': '0 25px 50px rgba(0, 0, 0, 0.6), 0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)',
      },
      borderColor: {
        'emerald-glow': 'rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
}