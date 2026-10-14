/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003B8E',
          50: '#E6F0FB',
          100: '#CCE1F7',
          200: '#99C3EF',
          300: '#66A5E7',
          400: '#3387DF',
          500: '#0069D7',
          600: '#0055AE',
          700: '#003B8E',
          800: '#002D6B',
          900: '#001F4D',
        },
        orange: {
          DEFAULT: '#FF6B00',
          400: '#FF8533',
          500: '#FF6B00',
          600: '#E65F00',
        },
        ink: '#111827',
        cloud: '#F8FAFC',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #003B8E 0%, #002D6B 100%)',
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)',
        'hero-radial': 'radial-gradient(ellipse at top right, rgba(0,59,142,0.12), transparent 60%)',
      },
      boxShadow: {
        'glow-orange': '0 0 0 1px rgba(255,107,0,0.25), 0 12px 40px -8px rgba(255,107,0,0.35)',
        'glow-navy': '0 0 0 1px rgba(0,59,142,0.18), 0 18px 50px -12px rgba(0,59,142,0.30)',
        'premium': '0 30px 60px -20px rgba(0,30,80,0.18)',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(2deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'wa-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'wa-pulse': 'wa-pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}