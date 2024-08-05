var express = require('express');
const { commonPath,htmlSellCrmPath } = require('../../app/constant.js')
var router = express.Router();
// 增加用户
// D:\youfanJava\takeout-git\takeout-admin\src\main\webapp\html\sellcrm\customer_management.html
router.get('/crmHtml', function (req, res, next) {
  fs.readFile(path.join(__dirname ,commonPath +htmlSellCrmPath +  '/customer_management.html'), 'utf8', async (err, data) => {
    console.log('data: ', data);
  })
});

exports.module = router