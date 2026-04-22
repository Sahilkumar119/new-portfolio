const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/api/assistant',
    createProxyMiddleware({
      target: process.env.ASSISTANT_PROXY_TARGET || 'http://127.0.0.1:8000',
      changeOrigin: true,
    })
  );
};
