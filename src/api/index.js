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

/**
 * 初始化
 *
 * @returns {*}
 */
export function init() {
    return request({
        url: '/init',
        method: 'get'
    })
}


/**
 * 搜索
 *
 * @param requestData
 * @returns {*}
 */
export function search(requestData) {
    let data = stringify(requestData);
    return request({
        url: '/search',
        method: 'post',
        data
    })
}

/**
 * 投票
 *
 * @param requestData
 * @returns {*}
 */
export function vote(requestData) {
    let data = stringify(requestData);
    return request({
        url: '/vote',
        method: 'post',
        data
    })
}
