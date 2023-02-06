import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://xs979349.xsrv.jp/flask/',
      changeOrigin: true,
    }),
  );
};
