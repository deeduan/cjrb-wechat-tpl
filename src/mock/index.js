// 开发环境下的请求,全部由mock来拦截
import Mock from 'mockjs';

// 非生产环境下加载mock服务
if (process.env.NODE_ENV !== 'production') {
    // let data = Mock.mock({
    //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    //     'list|1-10': [{
    //         // 属性 id 是一个自增数，起始值为 1，每次增 1
    //         'id|+1': 1,
    //         'name': 'test_' + Math.floor(Math.random() * 10 + 1)
    //     }]
    // });
    // // 输出结果
    // console.log(JSON.stringify(data, null, 4))

    require('./services/login');

    Mock.setup({
        timeout: 800
    })
}
