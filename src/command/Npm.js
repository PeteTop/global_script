const childProcess = require('child_process')
const path = require('path')
const {
    taobao,
    npmjs,
    getNpm
} = require(path.resolve('config/index.js'))

const {
    execSync
} = childProcess
class NpmSpec {
    static run(argv) {
        const {
            t,
            n
        } = argv
        if (t || n) {
            execSync(`${t?taobao:npmjs}`, {
                stdio: 'inherit'
            })
        } else {
            execSync(`${getNpm}`, { 
                stdio: 'inherit'
            })
        }
    }
}
Object.freeze(NpmSpec)
module.exports = NpmSpec