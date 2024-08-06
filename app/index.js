const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { baseUrl, commonPath, proxyTargetDomain } = require('./constant')
const htmlRouter = require('./html')
const jspRouter = require('./jsp')

const app = express();

app.use('/', jspRouter)
app.use('/page/sellcrm', htmlRouter)

app.use(`${baseUrl}/css`, express.static(commonPath + '/css'));
app.use(`${baseUrl}/js`, express.static(commonPath + '/js'));
app.use(`${baseUrl}/images`, express.static(commonPath + '/images'));
app.use(`${baseUrl}/static`, express.static(commonPath + '/static'));
app.use(`${baseUrl}/fonts`, express.static(commonPath + '/fonts'));

const fun = createProxyMiddleware({
    target: proxyTargetDomain,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log('ProxyIng request:', req.url);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    },
})

const consoleProxyInfo = false
app.use('/', (req, res, next) => {
  let isProxy = false;
  if (!req.url.startsWith('/socket.io')) {
    isProxy = true
    consoleProxyInfo && console.log('req.url', req.url, 'isProxy', isProxy);
    return fun(req, res, next);
  }
  consoleProxyInfo && console.log('req.url', req.url, 'isProxy', isProxy);
  next();
});


module.exports = app