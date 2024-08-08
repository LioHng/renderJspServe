const path = require("path")
const chokidar = require("chokidar")
const { commonPath, sellerCommonPath, PlatformEnum } = require("./constant.js")

const needRefreshExtPage = ['.html', '.jsp']
const needRefreshExtTheirPage = ['.js', '.css']
function listenFilesChange(opt) {
  const { io, server, platformType } = opt
  // 监听 HTML 文件变化
  const watchFileDir = platformType === PlatformEnum.admin ? commonPath : sellerCommonPath
  const watcher = chokidar.watch(watchFileDir, {
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
}

module.exports = {
  listenFilesChange,
}