module.exports = {
  purge: [
      './resources/**/*.blade.php',
     './resources/**/*.js',
     './resources/**/*.jsx',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
