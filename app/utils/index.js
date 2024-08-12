const path = require("path")
const { adminAccount }  = require('../constant.js')
function getPath(p) {
  return path.join(__dirname, p)
}

function getLoginStr() {
  const { account, password } = adminAccount
  return `
    $.ajax({
      url: "/login.do?account=${account}&password=${password}",
      type: "post",
      dataType: "json",
      success: function (result) {
        console.log("result: ", result)
        layer.msg("node服务器已帮您自动登录")
      },
      error: function () {
        layer.msg("系统异常")
      },
    })
  `
}

function sellLogin() {
  function setCookie(name, value, domain, expires){
    domain = domain || document.domain;
    if (typeof (expires) == 'undefined' || expires == null || expires == '') {
      document.cookie = name + "=" + encodeURIComponent(value)
          + "; path=" + "/" + "; domain=" + domain ;
    } else {
      var expTimes = expires * 1000;
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + expTimes);
      document.cookie = name + "=" + encodeURIComponent(value)
          + ";expires=" + expDate.toGMTString() + "; path=" + "/"
          + "; domain=" + domain ;
    }
  } 
  $.post(
		 "/login.do",{
			'account':'fd2013',
			'password':'a111111',
		},
		function (data){
			var res = data.errormsg;
      setCookie("logFail",0,null,3*60*60*1000);
			
		}
	);
}

module.exports = {
  getPath,
  getLoginStr
}
