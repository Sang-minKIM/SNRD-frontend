const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://port-0-backend-fyyf25lbprdhq4.gksl2.cloudtype.app",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
