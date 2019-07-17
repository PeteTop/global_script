const childProcess = require('child_process')
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const printMessage = require('print-message')
const os = require('os')
class UpdateSpec {
    static run(argv) {
        if(os.type()=== 'Darwin')childProcess.execSync('sudo npm install PeteTop/global_script -g',{stdio: 'inherit'})
        if(os.type()=== 'Windows_NT')childProcess.execSync('npm install PeteTop/global_script -g',{stdio: 'inherit'})
        printMessage([`Update Successful`],{color:'green',borderColor:'green'})
        printMessage([`version: ${require('../../package.json').version}`],{color:'green',borderColor:'green'})
        printMessage([`Path:${rootPath}`],{color:'green',borderColor:'green'})
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec