/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 95%)',
        accent: 'hsl(160 70% 45%)',
        primary: 'hsl(240 80% 50%)',
        surface: 'hsl(0 0% 100%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(220 15% 12%, 0.12)',
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px',
      },
      fontSize: {
        display: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
      },
    },
  },
  plugins: [],
}