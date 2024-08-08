const path = require("path")
const JSPJs = require("../jsp-js").Renderer
const { takeoutWeb,sellerTakeoutWeb,commonPath, jspPath, sellerCommonPath, PlatformEnum } = require("./constant.js")
const { getPath }  = require ('./utils/index.js')
const adminJspIns = new genJspIns()
const sellerJspIns = new genJspIns(PlatformEnum.seller)

function  genJspIns(platformType = 1) {
  return new JSPJs({
    root: [platformType === 1 ? commonPath : sellerCommonPath],
    tags: {
      include: {
        bar() {
          return "<h2>Baz</h2>"
        },
      },
    },
    globals: {
      name: "John Doe",
      currentYear: new Date().getFullYear(),
    },
    hook: {
      // <jsp:include page="/WEB-INF/views/jsp/common/commonUrl.jsp"></jsp:include>
      beforeProcessPageText(pageText) {
        pageText = pageText.replace(/<jsp:include\s*page="\/WEB-INF\/views\/jsp\/common\/commonUrl.jsp"\s*><\/jsp:include>/g, '')
        return pageText.replace(/<jsp:include page="([^"]+)"><\/jsp:include>/g, '<%@ include file="$1" %>');
      }
    }
  })
}

function insertScriptAfterHtmlTag(str, scriptContent) {
  // 查找 <html> 标签的结束位置
  const htmlTagEndIndex = str.indexOf('>', str.indexOf('<html'));
  if (htmlTagEndIndex === -1) {
    return console.log(chalk.red('Error: 没有识别到html的位置'));
  }
  // 检查 <html> 标签后面是否有其他标签，如果有，则需要在这些标签之后插入
  let nextTagStartIndex = str.indexOf('<', htmlTagEndIndex + 1);
  let insertIndex = nextTagStartIndex;
  // 如果没有其他标签紧随其后，则直接在 <html> 标签后插入
  if (insertIndex === -1 || insertIndex > htmlTagEndIndex) {
    insertIndex = htmlTagEndIndex + 1;
  }
  // 插入 <script> 标签
  const result = str.slice(0, insertIndex) + scriptContent + str.slice(insertIndex);
  return result;
}

function commonUrlScript(obj = {}, platform = 1) {
  let str = ""
  for (let k in obj) {
    let oriVal = obj[k];
    let valStr = typeof oriVal === 'string' ? `'${oriVal}'` : oriVal
    str += `var ${k} = ${valStr};\n`
  }
  console.log('str',str);
  const takeWeb = PlatformEnum.admin === platform ? takeoutWeb : sellerTakeoutWeb
  return `
    <script type="text/javascript">
      var takeoutWeb ='${takeWeb}';
      var qiniuyunWeb = 'http://img.ubox-takeout.cn/';
      var mallQiniuyunWeb = 'http://img.mall.ubox-takeout.cn/';
      var mobileUrl = 'http://hefan.ubox-takeout.cn';
      ${str}
    </script>
  `
}

function socketScript(pagePage = 'individual') {
  return `
    <script src="/socket.io/socket.io.js"></script>
    <script>
      const clh_serve_page = '${pagePage}';
      const socket = io();
      socket.on('fileChanged', (val) => {
        if(clh_serve_page === val) {
          location.reload();
          console.log('thisPageName:' + clh_serve_page + 'ws需要更新')
        }
      });
    </script>
    `
}

// 修正js
function amendJs(str) {
  const clearStringArr = [
    'PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"',
  ]
  clearStringArr.forEach((item) => {
    str = str.replaceAll(item, "")
  })
  return str
}

function jspHtmlString(path, opt, platformType = 1) {
  const JspIns = platformType === 1 ? adminJspIns : sellerJspIns
  const jspHtml = JspIns.render(jspPath + path, opt)
  return amendJs(jspHtml)
}

module.exports = {
  commonUrlScript,
  jspHtmlString,
  socketScript,
  insertScriptAfterHtmlTag
}
