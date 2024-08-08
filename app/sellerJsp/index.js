const express = require('express');
const fs = require('fs');
const { commonPath, jspPath, sellerBaseUrl, PlatformEnum } = require('../constant.js')
const {
  commonUrlScript,
  jspHtmlString,
  socketScript,
  insertScriptAfterHtmlTag
} = require('../compile');
const path = require('path');
const router = express.Router();

/**
 *  该路由前缀为: /seller
 *  即访问首页接口为：/page/index
 */

const genPageHtml = (filePath, globalParams = {}) => {
  const fileName = path.basename(filePath);
  const htmlStr = insertScriptAfterHtmlTag(
    jspHtmlString(filePath, { adminUrl: sellerBaseUrl, ...globalParams }, PlatformEnum.seller), 
    commonUrlScript({},PlatformEnum.seller)
  )
  return  htmlStr + socketScript(fileName)
};

const readHtmlFile = (fileName) => {
  return fs.readFileSync(commonPath +jspPath +  `/${fileName}`, {encoding: 'UTF-8'}) + socketScript(fileName)
};
const sendMiddleWare = (res,fileName) =>  {
  res.send(readHtmlFile(fileName))
};
// router.get('/', (req, res) =>  res.redirect('/login'));
router.get('/login', (req, res) => {
  const html = genPageHtml('/user/login.jsp')
  res.send(html);
});
router.get('/index', (req, res, next) => {
  const html = genPageHtml('/bill/recently_all.jsp')
  res.send(html);
})

module.exports = router;