const {exec} = require("child_process");
const path = require("path")
const chokidar = require("chokidar")
const { commonPath, jspPath, listenerFilePath } = require("./constant.js")
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

const needRefreshExtPage = ['.html', '.jsp']
const needRefreshExtTheirPage = ['.js', '.css']
function listenFilesChange(opt) {
  const { filePath, io, server } = opt
  // 监听 HTML 文件变化
  const HTML_FILE = path.join(commonPath, listenerFilePath)
  console.log("HTML_FILE: ", HTML_FILE)
  const watcher = chokidar.watch(commonPath, {
    ignored: /(^|[\/\\])\../, // 忽略点文件
    persistent: true
  });
  watcher.on('change', (filePath,stats) => {
    console.log(`File ${path} has been changed`)
    if(!stats) return 
    const extname = path.extname(filePath);
    const fileName = path.basename(filePath);
    if(!extname || !fileName) return
    if(needRefreshExtTheirPage.includes(extname)) return io.emit("fileChanged", fileName)
    if (needRefreshExtPage.includes(extname)) {
      console.log('需要刷新页面: ' + fileName, extname);
      io.emit("fileChanged", fileName)
    } 
  })
  // chokidar.watch(HTML_FILE).on("change", () => {
  //   console.log("HTML file changed. Sending update to clients...")
  //   //   const html =
  //   //     jspHtmlString(jspPagePath, { adminUrl: baseUrl }) +
  //   //     commonUrlScript() +
  //   //     socketScript()
  //   //   fs.writeFile(path.join(__dirname, "./dist", "index.html"), html, (e) =>
  //   //     e ? console.error(e) : console.log("pages.json 配置文件更新成功")
  //   //   )
  //   // io.emit("fileChanged")
  // })
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
  listenFilesChange,
  getLocalNetworkAddress
}
