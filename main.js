const http = require("http")
const socketIo = require("socket.io")
const app = require("./app/index.js")
const { PORT } = require("./app/constant.js")
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

server.listen(PORT, () => {
  console.log(chalk.red(`started on ${PORT}...`))
  console.log(chalk.green(`\nServer is fucking running!\n`));
  console.log(chalk.blue(`> Local:`) + `\t\thttp://localhost:${PORT}/login`);
  console.log(chalk.blue(`> Network:`) + `\t\thttp://${getLocalNetworkAddress()}:${PORT}/login`);
  console.log('\nPress ' + chalk.yellow('Ctrl+C') + ' to stop the server.\n');
  console.log(chalk.red(`=======切割======\n`))
  // openBrowserUrl(`http://localhost:${PORT}/login`)
})
