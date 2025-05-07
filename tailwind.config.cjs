module.exports = {
  // 1) Hvilke filer Tailwind skal skanne etter klasser
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],

  // 2) Skreddersy temaet med dine fonter og farger
  theme: {
    extend: {
      fontFamily: {
        // Overskrifter
        serif: ['Playfair Display', 'serif'],
        // Brødtekst, knapper osv.
        sans:  ['Poppins', 'sans-serif'],
      },
      colors: {
        // Hovedfarger
        primary:   '#2A624F',  // Green
        secondary: '#F7B500',  // Yellow

        // Accent-farger
        accent: {
          red:         '#E2341C',
          gray:        '#E5E5E5',
          black:       '#000000',
          red50:       '#EF8D89',
          yellowLight: '#FEF3CE',
          yellowDark:  '#9B7A2C',
          blueLink:    '#2B7AEA',
        },

        // Nøytrale gråtoner
        neutral: {
          white:   '#FFFFFF',
          black20: '#E6E6E6',
          black30: '#B3B3B3',
          black60: '#999999',
          black70: '#4D4D4D',
        },
      },
    },
  },

  // 3) Tailwind-spesifikke plugins (f.eks. forms, typography) – hold tomt om du ikke bruker noen
  plugins: [],
}
