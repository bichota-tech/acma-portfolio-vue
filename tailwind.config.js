/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // Breakpoint personalizados
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      colors: {
        terracotta: {
          0: '#faeded',
          50: '#feeae7',
          100: '#fcd5cf',
          200: '#faaa9e',
          300: '#f7806e',
          400: '#f5563d',
          500: '#f22b0d', // Tu color principal para CTAs
          600: '#c2230a',
          700: '#911a08',
          800: '#611105',
          900: '#300903',
          950: '#0e0200',
        }
      },
      fontFamily: {
        // Redefinimos las utilidades font-sans y font-serif
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'ui-serif', 'Georgia', 'serif'],
      }
    },
    },
  plugins: [],
}
