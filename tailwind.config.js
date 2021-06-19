module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '0px',
      
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
