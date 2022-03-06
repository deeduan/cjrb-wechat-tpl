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
    }
}
