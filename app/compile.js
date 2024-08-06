const path = require("path")
const JSPJs = require("../jsp-js").Renderer
const { commonPath, jspPath, baseUrl } = require("./constant.js")
const { getPath }  = require ('./utils/index.js')

const JspIns = new JSPJs({
  root: [commonPath],
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

function commonUrlScript(obj = {}) {
  let str = ""
  for (let k in obj) {
    let oriVal = obj[k];
    let valStr = typeof oriVal === 'string' ? `'${oriVal}'` : oriVal
    str += `var ${k} = ${valStr};\n`
  }
  console.log('str',str);
  return `
    <script type="text/javascript">
      var takeoutWeb ='http://hfadmin.ubox-takeout.cn';
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

function jspHtmlString(path, opt) {
  const jspHtml = JspIns.render(jspPath + path, opt)
  return amendJs(jspHtml)
}

module.exports = {
  commonUrlScript,
  jspHtmlString,
  socketScript,
}
