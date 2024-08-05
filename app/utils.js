const path = require("path")
const JSPJs = require("../jsp-js").Renderer
const { commonPath, jspPath, baseUrl } = require("./constant")

function getPath(p) {
  return path.join(__dirname, p)
}

function getCommonUrlScript(obj = {}) {
  let str = ""
  for (let k in obj) {
    str += `var ${k} = ${obj[k]};`
  }
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

function commonUrlScript(obj = {}) {
  let str = ""
  for (let k in obj) {
    str += `var ${k} = ${obj[k]};`
  }
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

function socketScript() {
  return `
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        socket.on('fileChanged', () => {
            console.log('File changed, reloading page...');
            location.reload();
        });
    </script>
    `
}

const jsp = new JSPJs({
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
  const jspHtml = jsp.render(jspPath + path, opt)
  return amendJs(jspHtml)
}

function login() {
  $.ajax({
    url: "/login.do?account=ubox_waimai&password=2020403",
    type: "post",
    dataType: "json",
    success: function (result) {
      console.log("result: ", result)
      layer.msg("登录成功")
    },
    error: function () {
      layer.msg("系统异常")
    },
  })
}

module.exports = {
  getPath,
  commonUrlScript,
  jsp,
  amendJs,
  jspHtmlString,
  socketScript,
}
