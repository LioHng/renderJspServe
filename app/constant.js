// 运营后台
const commonPath ='D:/youfanJava/takeout-git/takeout-admin/src/main/webapp';
const htmlSellCrmPath = `/html/sellcrm`
const jspPath = '/WEB-INF/views/jsp';
const baseUrl = '/yfApi'
const proxyTargetDomain = 'http://hfadmin.ubox-takeout.cn'
const takeoutWeb = 'http://hfadmin.ubox-takeout.cn'
const PORT = 9090

// 商家后台
// D:\youfanJava\takeout-git\takeout-seller\src\main\webapp\WEB-INF\views\jsp\bill\all.jsp
const sellerCommonPath ='D:/youfanJava/takeout-git/takeout-seller/src/main/webapp';
const sellerProxyTargetDomain = 'http://hfseller.ubox-takeout.cn'
const sellerTakeoutWeb = 'http://hfseller.ubox-takeout.cn'
const sellerBaseUrl = '/sellerYfApi'
const sellerPORT = 9091



const PlatformEnum = {
  admin:1,
  seller: 2
}

module.exports = {
  commonPath,
  jspPath,
  baseUrl,
  sellerBaseUrl,
  htmlSellCrmPath,
  PORT,
  sellerPORT,
  proxyTargetDomain,
  sellerProxyTargetDomain,
  sellerCommonPath,
  PlatformEnum,
  takeoutWeb,
  sellerTakeoutWeb
}
