const packageJson = require('../../package.json')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const os = require('os')

const {
    info,
    error,
    warn
} = require('@hfs/print')
const {
    version
} = packageJson

class InfoSpec {
    static run(argv) {
            info([`Operating system: ${os.type() === 'Darwin' ? 'macOS' : 'Windows'}`])
            info([`version: ${version}`])
            //if(os.type() === 'Darwin')
            info([`Path:${rootPath}`])
    }
}

Object.freeze(InfoSpec)
module.exports = InfoSpec