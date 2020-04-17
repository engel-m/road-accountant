module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      paper2: '#f5f0e6',
    }),
    extend: {            
      fontFamily: {
        'fira': 'Fira Sans'
      },
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {},
  plugins: [],
}
