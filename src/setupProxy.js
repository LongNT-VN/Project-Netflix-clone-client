const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://projectnetflixcloneserver.herokuapp.com/',
      changeOrigin: true,
    })
  );
};