const childProcess = require('child_process')
const path = require('path')
const os = require('os')
const {
    info,
    error,
    warn
} = require('@hfs/print')
console.log(path.resolve(os.homedir(), 'hfs_config/console.json'))
const cons = require(path.resolve(os.homedir(), 'hfs_config/console.json'))

class OpenSpec {
    static run(argv) {
        let notMatchAry = []
        if (argv.json) childProcess.execSync(`${os.type() === 'Darwin'? 'open':'start'} ${path.resolve(os.homedir(), 'hfs_config/console.json')}`)
        for (let key = 1; key < argv._.length; key++) {
            const ysKey = argv._[key]
            if (cons[ysKey]) {
                childProcess.execSync(`${os.type() === 'Darwin' ? 'open':'start'} ${cons[ysKey]}`)
            } else {
                notMatchAry.push(ysKey)
            }
        }
        if (notMatchAry.length) {
            error([`'${notMatchAry}' has no option in account.json`])
        }
    }
}
Object.freeze(OpenSpec)
module.exports = OpenSpec