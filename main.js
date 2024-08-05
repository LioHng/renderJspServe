const http = require("http")
const socketIo = require("socket.io")
const app = require("./app/index.js")
const path = require("path")
const chokidar = require("chokidar")
const fs = require("fs")
const { baseUrl, commonPath, jspPath, listenerFilePath } = require("./app/constant.js")
// fs.readFile(path.join(__dirname ,jspPath + '/user/login.jsp'), 'utf8', async (err, data) => {
//     console.log('data: ', data);
// })

const server = http.createServer(app)
const io = socketIo(server)

io.on("connection", (socket) => {
  console.log("~~connected~~")
  socket.on("disconnect", () => {})
  socket.on("chat message", (msg) => {})
})

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

server.listen("9001")

console.log("started on 9001...")
