module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // Make sure to use the new postcss plugin
    require('autoprefixer'), // Make sure this is also included
  ],
};