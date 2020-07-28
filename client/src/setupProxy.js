const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'http://localhost:7000',
      changeOrigin: true,
    })
  );
  app.use(
    '/app/*',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
 // "proxy": "h