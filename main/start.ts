import { start, filepathSymbol, setConfig } from "a2n";
const fs = require('fs');
const path = require('path');
const config = setConfig(process.env.a2nConfig as any);

const scanPath = path.resolve(process.cwd(), config.componentScan);
if (!fs.existsSync(scanPath)) {
  console.log("warning: folder " + scanPath + " not exist!\n")
} else {
  console.info('scan components in folder ' + scanPath);
  const requireComponent = require.context(process.env.cwd + '/' + process.env.componentScan, true, /[\.ts?|\.js?]$/)
  requireComponent.keys().forEach(filepath => {
    console.info("scan file: " + path.resolve(process.env.componentScan, filepath))
    const defaultExport = requireComponent(filepath).default
    if (defaultExport) {
      defaultExport[filepathSymbol] = filepath.substring(1)
    }
  })
}

start({
  callback: () => {
    console.info("======================success======================")
    console.info("          server was start in port: " + config.port)
    console.info("===================================================")
  }
})

if (module.hot) {
  module.hot.accept();
}