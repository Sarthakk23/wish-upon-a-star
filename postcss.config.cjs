module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: 'no-2009',
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 13'
      ]
    }
  }
}