/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary, #1A3A5C)',   // Deep navy — brand primary
        accent:    'var(--color-accent, #C49A22)',   // Gold — CTAs, highlights
        light:     '#EEF3F9',   // Navy tint — subtle backgrounds
        surface:   '#F5F7FA',   // Page background
        admin:     '#0E2234',   // Admin panel dark navy
        'primary-dark': '#0F2238', // Footer / darker navy
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
