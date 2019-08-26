const config = {
    taobao:'npm config set registry https://registry.npm.taobao.org && npm config get registry',
    npmjs:'npm config set registry http://registry.npmjs.org && npm config get registry',
    getNpm:'npm config get registry',
    admin:{
            url:'https://129.211.10.130/',
            name:'admin',
            pwd:'adminadmin'
    }
}
Object.freeze(config)
module.exports = config