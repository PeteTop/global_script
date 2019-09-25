const packageJson = require('../../package.json')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const os = require('os')
const printPath = path.resolve(rootPath,'config/Print.js')

const {
    info,
    error,
    warn
} = require(printPath)
const {
    version
} = packageJson

class InfoSpec {
    static run(argv) {
            info([`Operating system: ${os.type() === 'Darwin' ? 'macOS' : 'Windows'}`])
            info([`version: ${version}`])
            info([`Path:${rootPath}`])  
    }
}

Object.freeze(InfoSpec)
module.exports = InfoSpec