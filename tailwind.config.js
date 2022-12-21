/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/**/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
