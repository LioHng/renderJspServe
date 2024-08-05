// compile-jsp.js
const fs = require('fs');
const path = require('path');
const JSPJs = require('../jsp-js').Renderer;
const commonPath ='/webapp';
const jspPath = '/WEB-INF/views/jsp';


function getPath(p) {
  return path.join(__dirname,'..', p);
}


console.log('path.join(__dirname,13212111111111111 ', path.join(__dirname,'..'));
const jsp = new JSPJs({
  root: [
      path.join(__dirname,'..'),
  ],
  tags: {
    jsp: {
        include() {
            return '<h2>include</h2>';
        }
    }
  },
  globals: {
      name: 'John Doe',
      qiniuyunWeb: '123132132',
      currentYear: new Date().getFullYear()
  }
});
const compileJSP = (jspFilePath, outputDir) => {
  // const jspContent = fs.readFileSync(jspFilePath, 'utf-8');
  const htmlContent = jsp.render(jspFilePath, {
    adminUrl: '',
    qiniuyunWeb: 'ceshi'
});
  const resolvePath = getPath(jspFilePath)
  console.log('resolvePath: ', resolvePath);
  const outputFilePath = path.join(outputDir, path.basename(resolvePath, '.jsp') + '.html');
  fs.writeFileSync(outputFilePath, htmlContent, 'utf-8');
  console.log(`Compiled ${jspFilePath} to ${outputFilePath}`);
};

// Usage
const jspFilePath = commonPath + jspPath + '/user/login.jsp';
console.log('jspFilePath: ', jspFilePath);
const outputDir = path.resolve(__dirname, 'dist');
compileJSP(jspFilePath, outputDir);
