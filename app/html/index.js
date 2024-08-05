const express = require('express');
const fs = require('fs');
const { commonPath,htmlSellCrmPath } = require('../constant.js')
const path = require('path');
const {
  socketScript
} = require('../utils');
const router = express.Router();

const readHtmlFile = (fileName) => {
  return fs.readFileSync(commonPath +htmlSellCrmPath +  `/${fileName}.html`, {encoding: 'UTF-8'}) + socketScript()
};
const sendMiddleWare = (res,fileName) =>  {
  console.log('代理到了', fileName);
  res.send(readHtmlFile(fileName))
};
router.get('/index', (req, res, next) => sendMiddleWare(res, 'index'))
router.get('/customer_management.html', (req, res, next) => sendMiddleWare(res, 'customer_management'));
router.get('/customer_event.html', (req, res, next) => sendMiddleWare(res, 'customer_event'));
router.get('/customer_details.html', (req, res, next) => sendMiddleWare(res, 'customer_details'));
router.get('/customer_approval.html', (req, res, next) => sendMiddleWare(res, 'customer_approval'));
router.get('/customer_analysis.html', (req, res, next) => sendMiddleWare(res, 'customer_analysis'));
router.get('/followUp_record.html', (req, res, next) => sendMiddleWare(res, 'followUp_record'));

module.exports = router;