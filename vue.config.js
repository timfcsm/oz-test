module.exports = {
  css: {
    loaderOptions: {
      // передача настроек в sass-loader
      sass: {
        prependData: '@import "@/styles/_index.scss";',
      },
    },
  },
};
