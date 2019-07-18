const packageJson = require('../../package.json')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const os = require('os')

const {
    info,
    error,
    warn
} = require('../printing_style/Print')
const {
    version
} = packageJson

class InfoSpec {
    static run(argv) {
        console.log(argv)
            info([`Operating system: ${InfoSpec.system(os.type())}`])
            info([`version: ${version}`])
            if(os.type() === 'Darwin')info([`Path:${rootPath}`])
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