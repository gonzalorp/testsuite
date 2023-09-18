// webpack.config.js

module.exports = {
    entry: "./cypress/e2e/spec.js", // Specify the entry point of your Cypress test script
    mode: "development", // Set the mode to development or production
    output: {
      filename: "bundle.js", // Specify the output bundle filename
    },
  };