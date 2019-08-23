const sr = require('screenres')
const config = {
    screenWidth:sr.get()[0],
    screenHeight:sr.get()[1],
    taobao:'npm config set registry https://registry.npm.taobao.org && npm config get registry',
    npmjs:'npm config set registry http://registry.npmjs.org && npm config get registry',
    getNpm:'npm config get registry',
    cos:[
        {
            url:'https://59.110.167.174/',
            name:'admin',
            pwd:'hfsN174'
        },
        {
            url:'https://112.74.43.195/',
            name:'admin',
            pwd:'hfsN195**'
        }
    ]
}
Object.freeze(config)
module.exports = config