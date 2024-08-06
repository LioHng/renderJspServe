const path = require("path")
const JSPJs = require("../../jsp-js/index.js").Renderer
const { commonPath, jspPath, baseUrl } = require("../constant.js")

function getPath(p) {
  return path.join(__dirname, p)
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
}
