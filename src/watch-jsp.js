// watch-jsp.js
const chokidar = require('chokidar');
const path = require('path');
const { exec } = require('child_process');
const compileJSP = require('./compile-jsp');

// 路径
const jspDir = path.resolve(__dirname, 'src');
const outputDir = path.resolve(__dirname, 'dist');

// 初始编译
compileJSP(path.join(jspDir, 'index.jsp'), outputDir);

// 监听文件变化
chokidar.watch(jspDir, { ignored: /(^|[\/\\])\../ }).on('all', (event, path) => {
  if (event === 'change' && path.endsWith('.jsp')) {
    compileJSP(path, outputDir);
    exec('npx vite preview', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  }
});
