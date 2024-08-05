const path = require("path")
const JSPJs = require("../jsp-js").Renderer
const { commonPath, jspPath, baseUrl } = require("./constant.js")

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
const str= `
    function clh_extractFileName(url) {
      // 创建 URL 对象
      const urlObj = new URL(url);
      
      // 获取路径名部分
      const pathname = urlObj.pathname;
      
      // 去掉路径名中的斜杠
      const pathSegments = pathname.split('/').filter(segment => segment);
      
      // 获取路径的最后一部分
      const lastSegment = pathSegments[pathSegments.length - 1];
      
      // 判断是否包含文件扩展名
      const hasExtension = lastSegment.includes('.');

      // 返回带扩展名的文件名或者没有扩展名的文件名
      return hasExtension ? lastSegment : lastSegment;
    }
`
function socketScript() {
  return `
    <script src="/socket.io/socket.io.js"></script>
    <script>
      eval(\`${str}\`)
      const socket = io();
      socket.on('fileChanged', (val) => {
        console.log('val: ', val);
        const thisPageName = clh_extractFileName(window.location.href);
        if(thisPageName === val) {
          location.reload();
         console.log('thisPageName:' + thisPageName + '需要更新')
        }
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
