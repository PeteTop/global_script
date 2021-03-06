const childProcess = require('child_process')
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const printPath = path.resolve(rootPath,'config/Print.js')
const {info,error,warn} = require(printPath) 
const os = require('os')
class UpdateSpec {
    static run(argv) {
        childProcess.execSync(`${os.type()=== 'Darwin'? 'sudo ' : ''}npm i PeteTop/global_script -g --unsafe-perm`,{stdio: 'inherit'})
        info([`Update Successful`]) 
        info([`version: ${require('../../package.json').version}`])
        if(os.type()=== 'Darwin')info([`Path:${rootPath}`])
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec 