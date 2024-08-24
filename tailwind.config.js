const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: colors.blue,
        purple: colors.purple,
        green: colors.green,
        red: colors.red,
        yellow: colors.yellow,
        indigo: colors.indigo,
        gray: colors.gray,
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(blue|purple|green|red|yellow|indigo|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
}