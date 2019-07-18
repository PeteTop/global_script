const childProcess = require('child_process')
const path = require('path')
const os = require('os')
const printMessage = require('print-message')
console.log(path.resolve(os.homedir(), 'hfs_config/console.json'))
const {
    cons
} = require(path.resolve(os.homedir(), 'hfs_config/console.json'))

class OpenSpec {
    static run(argv) {
        let cmd = ''
        let notMatchAry = []
        for (let key = 1; key < argv._.length; key++) {
            const ysKey = argv._[key]
            if (cons[ysKey]) {
                    if(os.type()=== 'Darwin'){
                        childProcess.execSync(`open ${cons[ysKey]}`)
                    }
                    if (os.type()=== 'Windows_NT') {
                        childProcess.execSync(`start ${cons[ysKey]}`)
                    }
                //cmd += `${cons[ysKey]} `
            } else {
                notMatchAry.push(ysKey)
            }
        }
        if (notMatchAry.length) {
            printMessage([`'${notMatchAry}' has no option in account.json`])
        }
    }
}
Object.freeze(OpenSpec)
module.exports = OpenSpec