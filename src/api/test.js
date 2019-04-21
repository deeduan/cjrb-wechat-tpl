import request from '../http/request';


export function tLogin(requestData) {
    return request({
        url: '/user/login',
        method: 'post',
        data:requestData
    })
}
