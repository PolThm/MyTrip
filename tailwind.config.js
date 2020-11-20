module.exports = {
  purge: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.jsx",
    "./src/**/*.js",
    './src/**/*.css',
    "./node_modules/**/*.tsx",
    "./node_modules/**/*.ts",
    "./node_modules/**/*.jsx",
    "./node_modules/**/*.js",
    './node_modules/**/*.css',
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
