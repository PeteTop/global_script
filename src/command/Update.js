const childProcess = require('child_process')
const packageJson = require('../../package.json')
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const printMessage = require('print-message')
class UpdateSpec {
    static run(argv) {
        childProcess.execSync('sudo npm install TracelessLK/global_script -g',{stdio: 'inherit'})
        printMessage([`version: ${packageJson.version}`],{color:'yellow'})
        printMessage([`Path:${rootPath}`],{color:'yellow'})
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec