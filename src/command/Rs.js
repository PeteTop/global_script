const childProcess = require('child_process')
const path = require('path')
const os = require('os')
const {
    taobao,
    npmjs,
    getNpm
} = require('../../config/index.js')

const {
    execSync
} = childProcess
class RestartUpSpec {
    static run(argv) {
        const item = Object.keys(argv)[1]
        const option = ['r','s']
       if(option.indexOf(item) !== -1 && os.type() === 'Windows_NT'){
         execSync(`shutdown -${item} -t 0`)
       }else {
           console.log('windows中生效')
       }
        
    }
}
Object.freeze(RestartUpSpec)
module.exports = RestartUpSpec