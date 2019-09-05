const axios = require('axios')
const QS = require('qs')
const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'

const get = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}
const post = (params={}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}
module.exports = {
    get,
    post
}