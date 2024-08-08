const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { sellerBaseUrl, sellerCommonPath, sellerProxyTargetDomain } = require('./constant')
const sellerRouter = require('./sellerJsp')
const { getLocalNetworkAddress } = require('./utils/nodeUtils.js')

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', sellerRouter)
function setStaticResource(baseUrl, commonPath) {
  app.use(`${baseUrl}/css`, express.static(commonPath + '/css'));
  app.use(`${baseUrl}/js`, express.static(commonPath + '/js'));
  app.use(`${baseUrl}/images`, express.static(commonPath + '/images'));
  app.use(`${baseUrl}/static`, express.static(commonPath + '/static'));
  app.use(`${baseUrl}/fonts`, express.static(commonPath + '/fonts'));
}
setStaticResource(sellerBaseUrl, sellerCommonPath)


const fun = createProxyMiddleware({
    target: sellerProxyTargetDomain,
    changeOrigin: true,
    cookieDomainRewrite: getLocalNetworkAddress(),
    onProxyReq: (proxyReq, req, res) => {
        console.log('ProxyIng request:', req.url);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    },
})

const consoleProxyInfo = true
app.use('/', (req, res, next) => {
  let isProxy = false;
  if (!req.url.startsWith('/socket.io')) {
    isProxy = true
    consoleProxyInfo && console.log('req.url1', req.url, 'isProxy', isProxy);
    return fun(req, res, next);
  }
  consoleProxyInfo && console.log('req.url', req.url, 'isProxy', isProxy);
  next();
});

module.exports = app