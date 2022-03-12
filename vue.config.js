// vue.config.js
module.exports = {
    // 配置代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://zwzx.vote.com/',
                ws: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    },

    // 关闭eslint代码检测
    lintOnSave: false,
    // 输出路径 - 你的html文件引用时的资源前缀
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    // 打包后的输出目录
    // outputDir: process.env.VUE_APP_CURRENTMODE === 'test' ? '../../website/webstatic/dev-appcustomer' : '../../website/webstatic/appcustomer',
    // // 静态资源打包后的输出路径
    // assetsDir: 'static',
    // // 打包后index的目录 可以是一个绝对路径

    //indexPath: process.env.VUE_APP_CURRENTMODE === 'test' ? '../../../agent/www_webroot/dev-appcustomer/index.html' : '../../../agent/www_webroot/appcustomer/index.html'

    // publicPath: './',
    // 打包后的输出目录
    outputDir: 'dist'
    // // 静态资源打包后的输出路径
}
