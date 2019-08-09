const childProcess = require('child_process')
const path = require('path')
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
        const item = argv._[1]
        const option = ['r','s']
       if(option.indexOf(item) !== -1){
         execSync(`shutdown -${item} -t 0`)
       }
        
    }
}
Object.freeze(RestartUpSpec)
module.exports = RestartUpSpec