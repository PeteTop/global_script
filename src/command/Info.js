const packageJson = require('../../package.json')
const printMessage = require('print-message')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const os = require('os')

const {
    version
} = packageJson

class InfoSpec {
    static run(argv) {
        if (argv._.length < 1) {
            
            printMessage([`Operating system: ${InfoSpec.system(os.type())}`], {
                color: 'green',borderColor:'green'
            })
            printMessage([`version: ${version}`], {
                color: 'green',borderColor:'green'
            })
            printMessage([`Path:${rootPath}`],{color:'green',borderColor:'green'})
        }
    }
    static system(val) {
        switch (val) {
            case 'Darwin':
                return "macOS"
                break;
            case 'Windows_NT':
                return "Windows"
                break;
            default:
                break;
        }
    }
}

Object.freeze(InfoSpec)
module.exports = InfoSpec