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
        url: '/campaign',
        method: 'get',
        params: {
            ci: 1
        },
    })
}

/**
 * 排名
 *
 * @returns {*}
 */
export function range(param) {
    console.log(param);
    return request({
        url: '/top',
        method: 'get',
        params: param,
    })
}

/**
 * 获取单个用户
 *
 * @param u_id
 * @returns {*}
 */
export function user(u_id) {
    return request({
        url: '/item',
        method: 'get',
        params: {
            ii: u_id
        },
    })
}

/**
 * 搜索
 *
 * @param requestData
 * @returns {*}
 */
export function search(requestData) {
    return request({
        url: '/search',
        method: 'get',
        params:requestData
    })
}

/**
 * 投票
 *  /api/item?code={wx_user_code}&ci={campaign_id}
 * @param requestData
 * @returns {*}
 */
export function vote(requestData, c_id) {
    // let data = stringify(requestData);
    return request({
        url: '/item?ci='+c_id,
        method: 'post',
        data: requestData
    })
}

/**
 * 发送短信
 *
 * @param requestData
 * @returns {*}
 */
export function sms(requestData) {
    // let data = stringify(requestData);
    // console.log(requestData);
    return request({
        url: '/verify/sms',
        method: 'post',
        data: requestData
    })
}


// http://voteme.joycegrils.com/api/verify/sms
// http://voteme.joycegrils.com/api/item?ci=1