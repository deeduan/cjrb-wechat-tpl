/**
 *  HTTP库请求封装..只在请求接口的时候加载
 *
 *  @author duanyou@huishoubao.com.cn
 */
import axios from 'axios';



/**
 * 创建一个请求server
 *
 * @type {AxiosInstance}
 */
const service = axios.create({
    // api的基础部分
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: '/api',
    // 请求超时
    timeout: 30000,
    // 请求头的设置
    // headers:{
    //     'Content-Type':'application/x-www-form-urlencoded'
    // }
});

/**
 * 临时的跨域凭证是否携带
 * @type {boolean}
 */
service.defaults.withCredentials = false;

/**
 * http请求拦截器
 */
service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * http响应拦截器,处理统一异常
 */
service.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});


export default service
