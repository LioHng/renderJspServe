const commonPath ='D:/youfanJava/takeout-git/takeout-admin/src/main/webapp';
const htmlSellCrmPath = `/html/sellcrm`
const jspPath = '/WEB-INF/views/jsp';
const baseUrl = '/yfApi'
const PORT = 9090
// const listenerFilePath = jspPath + '/bill/wait_admin_confirm.jsp'
// const listenerFilePath = jspPath + '/user/login.jsp' 
// const listenerFilePath = jspPath + '/complaint/new_list.jsp'
const listenerFilePath = htmlSellCrmPath + '/customer_management.html'
module.exports = {
  commonPath,
  jspPath,
  baseUrl,
  listenerFilePath,
  htmlSellCrmPath,
  PORT
}
