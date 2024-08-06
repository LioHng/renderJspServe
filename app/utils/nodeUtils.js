const {exec} = require("child_process");
//传入url
function openBrowserUrl(url) {
  // 拿到当前系统的参数
  switch (process.platform) {
      //mac系统使用 一下命令打开url在浏览器
      case "darwin":
          exec(`open ${url}`);
      //win系统使用 一下命令打开url在浏览器
      case "win32":
          exec(`start ${url}`);
          // 默认mac系统
      default:
          exec(`open ${url}`);
  }
}

// 获取本地网络地址的函数
function getLocalNetworkAddress() {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[interfaceName]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// fs.readFile(path.join(__dirname ,jspPath + '/user/login.jsp'), 'utf8', async (err, data) => {
//     console.log('data: ', data);
// })

module.exports = {
  openBrowserUrl,
  getLocalNetworkAddress
}
