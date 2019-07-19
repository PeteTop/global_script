const config = {
    taobao:'npm config set registry https://registry.npm.taobao.org && npm config get registry',
    npmjs:'npm config set registry http://registry.npmjs.org && npm config get registry',
    getNpm:'npm config get registry'
}
Object.freeze(config)
module.exports = config