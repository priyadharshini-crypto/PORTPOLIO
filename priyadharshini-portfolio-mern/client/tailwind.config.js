/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { 950: '#05050f', 900: '#0a0a1f', 800: '#111133' },
        violet: { electric: '#8b5cf6' },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        cube: { from: { transform: 'rotateX(-20deg) rotateY(0deg)' }, to: { transform: 'rotateX(-20deg) rotateY(360deg)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        gradient: 'gradient 8s ease infinite',
        cube: 'cube 16s linear infinite',
      },
    },
  },
  plugins: [],
};
