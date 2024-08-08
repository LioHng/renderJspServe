const http = require("http")
const socketIo = require("socket.io")
const app = require("./app/index.js")
const { PORT} = require("./app/constant.js")
const { openBrowserUrl, getLocalNetworkAddress }  = require('./app/utils/nodeUtils.js')
const { listenFilesChange } = require('./app/watch.js')
const chalk = require("chalk");
chalk.level = 1;

const server = http.createServer(app)
const io = socketIo(server)

io.on("connection", (socket) => {
  socket.on("disconnect", () => {})
  socket.on("chat message", (msg) => {})
})

listenFilesChange({ io, server })

function handleServeListen(serverIns, port) {
  serverIns.listen(port, () => {
    console.log(chalk.red(`started on ${port}...`))
    console.log(chalk.green(`\nServer is fucking running!\n`));
    console.log(chalk.blue(`> Local:`) + `\t\thttp://localhost:${port}/login`);
    console.log(chalk.blue(`> Network:`) + `\t\thttp://${getLocalNetworkAddress()}:${port}/login`);
    console.log('\nPress ' + chalk.yellow('Ctrl+C') + ' to stop the server.\n');
    console.log(chalk.red(`=======切割======\n`))
    // openBrowserUrl(`http://localhost:${port}/login`)
  })
}

handleServeListen(server, PORT)


// 是否启动商家后台服务
const isActivateSeller = false
if(isActivateSeller) {
  require('./runningSeller.js')
}