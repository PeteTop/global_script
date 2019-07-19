const childProcess = require('child_process')
const {
    execSync
} = childProcess
const taobao = 'npm config set registry https://registry.npm.taobao.org && npm config get registry'
const npmjs = 'npm config set registry http://registry.npmjs.org && npm config get registry'
class NpmSpec {
    static run(argv) {
        if (argv.t || argv.n) {
            execSync(`${argv.t?taobao:npmjs}`, {
                stdio: 'inherit'
            })
        } else {
            execSync(`npm config get registry`, {
                stdio: 'inherit'
            })
        }
    }
}
Object.freeze(NpmSpec)
module.exports = NpmSpec