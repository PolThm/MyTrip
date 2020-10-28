const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer"),
        purgecss({
          content: [
            "./src/**/*.tsx",
            "./src/**/*.ts",
            "./src/**/*.jsx",
            "./src/**/*.js",
            "./public/index.html",
          ],
          defaultExtractor: (content) =>
            content.match(/[A-Za-z0-9-_:/]+/g) || [],
        }),
      ],
    },
  },
};
