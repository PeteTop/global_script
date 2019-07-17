const childProcess = require('child_process')
const packageJson = require('../../package.json')
const {
    version
} = packageJson
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const printMessage = require('print-message')
class UpdateSpec {
    static run(argv) {
        childProcess.execSync('sudo npm install PeteTop/global_script -g',{stdio: 'inherit'})
        printMessage([`Update Successful`],{color:'green',borderColor:'green'})
        printMessage([`version: ${version}`],{color:'green',borderColor:'green'})
        printMessage([`Path:${rootPath}`],{color:'green',borderColor:'green'})
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec