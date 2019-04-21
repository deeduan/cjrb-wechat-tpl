import request from '../http/request';

import stringify from './stringify';

export function login(requestData) {
    let data = stringify(requestData);
    return request({
        url: '/agent/user/SMSVerifyCode',
        method: 'post',
        data
    })
}

export function dataList(requestData) {
    let data = stringify(requestData);
    return request({
        url: '/mock/vote1.php',
        method: 'post',
        data
    })
}
