const express = require('express');
const fs = require('fs');
const { commonPath,htmlSellCrmPath } = require('../constant.js')
const {
  socketScript
} = require('../utils/index.js');

/**
 *  该路由前缀为: /page/sellcrm
 *  即访问首页接口为：/page/sellcrm/index
 */
const router = express.Router();

const readHtmlFile = (fileName) => {
  return fs.readFileSync(commonPath +htmlSellCrmPath +  `/${fileName}`, {encoding: 'UTF-8'}) + socketScript(fileName)
};
const sendMiddleWare = (res,fileName) =>  {
  res.send(readHtmlFile(fileName))
};
router.get('/index', (req, res, next) => sendMiddleWare(res, 'index.html'))
router.get('/customer_management.html', (req, res, next) => sendMiddleWare(res, 'customer_management.html'));
router.get('/customer_event.html', (req, res, next) => sendMiddleWare(res, 'customer_event.html'));
router.get('/customer_details.html', (req, res, next) => sendMiddleWare(res, 'customer_details.html'));
router.get('/customer_approval.html', (req, res, next) => sendMiddleWare(res, 'customer_approval.html'));
router.get('/customer_analysis.html', (req, res, next) => sendMiddleWare(res, 'customer_analysis.html'));
router.get('/followUp_record.html', (req, res, next) => sendMiddleWare(res, 'followUp_record.html'));

module.exports = router;