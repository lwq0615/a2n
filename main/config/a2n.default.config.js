/**
 * 默认的a2n配置
 */
module.exports = {
  // 全局接口前缀
  baseUrl: '',
  // 组件扫描路径，该路径下的js,ts文件将会被容器扫描
  componentScan: 'src',
  // 服务启动端口号
  port: 8080,
  // 隐藏启动时的文件扫描信息
  hideScanFile: true,
  // 禁止自动注入node_modules的依赖
  disabledScanNodeModules: false,
  // webpack配置，会与默认webpack配置进行合并
  webpack: {},
}