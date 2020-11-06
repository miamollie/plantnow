const withPWA = require("next-pwa");

module.exports = withPWA({
  target: "serverless",
  pwa: {
    dest: "public",
  },
});
