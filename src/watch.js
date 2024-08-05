const path = require("path")
const chokidar = require("chokidar")
const { commonPath, jspPath, listenerFilePath } = require("./constant.js")

function listenFilesChange(opt) {
  const { filePath, io, server } = opt
  // 监听 HTML 文件变化
  const jspPagePath = listenerFilePath
  const HTML_FILE = path.join(commonPath, jspPath, jspPagePath)
  console.log("HTML_FILE: ", HTML_FILE)
  chokidar.watch(HTML_FILE).on("change", () => {
    console.log("HTML file changed. Sending update to clients...")
  //   const html =
  //     jspHtmlString(jspPagePath, { adminUrl: baseUrl }) +
  //     commonUrlScript() +
  //     socketScript()
  //   fs.writeFile(path.join(__dirname, "./dist", "index.html"), html, (e) =>
  //     e ? console.error(e) : console.log("pages.json 配置文件更新成功")
  //   )
    io.emit("fileChanged")
  })
}

module.exports = {
  listenFilesChange,
}