const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,

  webpack: (config) => {
    // Exclude PDF files from being processed
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/[name][ext]",
      },
    });

    // Exclude ZIP files from being processed
    config.module.rules.push({
      test: /\.(zip)$/,
      type: "asset/resource",
      generator: {
        filename: "static/[name][ext]",
      },
    });

    return config;
  },
};
