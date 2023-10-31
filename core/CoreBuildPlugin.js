const fs = require('fs')

/**
 * 生成a2n.core.d.ts类型声明文件
 */
class CoreBuildPlugin {

  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options = {}) {
    // 在应用默认选项前，先应用用户指定选项
    // 合并后的选项暴露给插件方法
    // 记得在这里校验所有选项
    this.options = { ...options };
  }

  apply(compiler) {
    const pluginName = CoreBuildPlugin.name;
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const filename = compiler.options.output.filename.split(".").slice(0, -1).join(".") + '.d.ts'
      fs.readFile('core/src/index.d.ts', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        // data 是二进制类型，需要转换成字符串
        const content = data.toString().replace("./", "../src/")
        fs.writeFile('core/dist/' + filename, content, {
          flag: 'w'
        }, (err) => {
          if (err) {
            console.error(err)
          }
          callback()
        })
      })
    });
  }
}

module.exports = { CoreBuildPlugin };