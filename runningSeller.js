const http = require("http")
const socketIo = require("socket.io")
const sellerApp = require("./app/sellerApp.js")
const {  sellerPORT, PlatformEnum } = require("./app/constant.js")
const { openBrowserUrl, getLocalNetworkAddress }  = require('./app/utils/nodeUtils.js')
const { listenFilesChange } = require('./app/watch.js')
const chalk = require("chalk");
chalk.level = 1;

console.log('[[====================================');

const sellerServer = http.createServer(sellerApp)
const sellerIo = socketIo(sellerServer)

listenFilesChange({ io:sellerIo, sellerServer, platformType: PlatformEnum.seller })

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

handleServeListen(sellerServer, sellerPORT)
