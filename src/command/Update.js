const childProcess = require('child_process')
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const {info,error,warn} = require('../printing_style/Print')
const os = require('os')
class UpdateSpec {
    static run(argv) {
        if(os.type()=== 'Darwin')childProcess.execSync('sudo npm install PeteTop/global_script -g',{stdio: 'inherit'})
        if(os.type()=== 'Windows_NT')childProcess.execSync('npm install PeteTop/global_script -g',{stdio: 'inherit'})
        info([`Update Successful`]) 
        info([`version: ${require('../../package.json').version}`])
        info([`Path:${rootPath}`])
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec