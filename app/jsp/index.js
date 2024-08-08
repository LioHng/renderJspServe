const express = require('express');
const {
  commonUrlScript,
  jspHtmlString,
  socketScript,
  insertScriptAfterHtmlTag
} = require('../compile');
const { baseUrl } = require('../constant')
const path = require('path');
const router = express.Router();


const genPageHtml = (filePath, globalParams = {}) => {
  const fileName = path.basename(filePath);
  const htmlStr = insertScriptAfterHtmlTag(jspHtmlString(filePath, { adminUrl: baseUrl, ...globalParams }), commonUrlScript())
  return  htmlStr + socketScript(fileName)
};
router.get('/', (req, res) =>  res.redirect('/login'));
router.get('/login', (req, res) => {
  const html = genPageHtml('/user/login.jsp')
  res.send(html);
});

router.get('/baseInfo', (req, res) => {
  const html = genPageHtml('/company/baseInfo.jsp', { companyId: 592 })
  res.send(html);
});

router.get('/wait_admin_confirm', (req, res) => {
  const html = genPageHtml('/bill/wait_admin_confirm.jsp', { 
    adminUrl: baseUrl,
    companyId: -1,
    merchantStoreId: -1
  })
  res.send(html);
})

// /complaint/new_lis
router.get('/complaintPage', (req, res) => {
  const html = genPageHtml('/complaint/new_list.jsp',{ mslist: [], plist: [],clist: [] })
  res.send(html);
});
// /mobileCanteen/canteenManagerPage
router.get('/canteenManagerPage', (req, res) => {
  const html = genPageHtml('/mobileCanteen/canteen_manager.jsp')
  res.send(html);
});

module.exports = router;