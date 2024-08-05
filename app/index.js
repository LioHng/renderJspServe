const path = require('path');
const express = require('express');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {
  baseUrl,
  commonPath,
  jspPath
} = require('./constant')

const {
  getPath,
  commonUrlScript,
  jspHtmlString,
  socketScript
} = require('./utils');

const app = express();

app.use(`${baseUrl}/css`, express.static(commonPath + '/css'));
app.use(`${baseUrl}/js`, express.static(commonPath + '/js'));
app.use(`${baseUrl}/images`, express.static(commonPath + '/images'));
app.use(`${baseUrl}/static`, express.static(commonPath + '/static'));
app.use(`${baseUrl}/fonts`, express.static(commonPath + '/fonts'));
app.get('/login', (req, res) => {
  const html = jspHtmlString('/user/login.jsp', { adminUrl: baseUrl }) + commonUrlScript() + socketScript()
  // fs.writeFile(
  //     path.join(__dirname, '..', './dist', 'index.html'),
  //     html,
  //     e => e ? console.error(e) : console.log('pages.json 配置文件更新成功')
  // )
  res.send(html);
});

app.get('/baseInfo', (req, res) => {
  var scriptStr = commonUrlScript({ companyId: 592 });
  const html = scriptStr + jspHtmlString('/company/baseInfo.jsp', { adminUrl: baseUrl, }) + socketScript()
  res.send(html);
});

app.get('/wait_admin_confirm', (req, res) => {
  var scriptStr = commonUrlScript();
  const html = scriptStr + jspHtmlString('/bill/wait_admin_confirm.jsp', { 
    adminUrl: baseUrl,
    companyId: -1,
    merchantStoreId: -1
   }) + socketScript()
    // fs.writeFile(
    //     path.join(__dirname, '..', './dist', 'index.html'),
    //     html,
    //     e => e ? console.error(e) : console.log('pages.json 配置文件更新成功')
    // )
  res.send(html);
})

// /complaint/new_lis
app.get('/complaintPage', (req, res) => {
  var scriptStr = commonUrlScript({ companyId: 592 });
  const html = scriptStr + jspHtmlString('/complaint/new_list.jsp', { 
    adminUrl: baseUrl,
   }) + socketScript()
//   fs.writeFile(
//     path.join(__dirname, '..', './dist', 'index.html'),
//     html,
//     e => e ? console.error(e) : console.log('pages.json 配置文件更新成功')
// )
  res.send(html);
});

// 代理 /qqMap 前缀的请求到 www.qq.map.com
const fun = createProxyMiddleware({
    target: 'http://hfadmin.ubox-takeout.cn',
    changeOrigin: true,
    // pathRewrite: {
    //   [`^/${baseUrl}`]: '', // 去掉 /qqMap 前缀
    // },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    },
})

console.log('fun', fun);

app.use('/', (req, res, next) => {
    console.log('req.url', req.url);
    if (!req.url.startsWith('/socket.io')) {
      console.log('代理了');
        return fun(req, res, next);
    }
    next();
});


module.exports = app