const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://freewheel-emmm.onrender.com',
      changeOrigin: true,
      onProxyReq: function(proxyReq, req, res) {
        proxyReq.setHeader('Connection', 'keep-alive');
      },
      timeout: 5000, // 5 seconds
      proxyTimeout: 5000 // 5 seconds
    })
  );
};
