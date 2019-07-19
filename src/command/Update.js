const childProcess = require('child_process')
const chalk = require('chalk')
const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const {info,error,warn} = require('@hfs/print')
const os = require('os')
class UpdateSpec {
    static run(argv) {
        childProcess.execSync(`${os.type()=== 'Darwin'? 'sudo ' : null}npm i PeteTop/global_script -g`,{stdio: 'inherit'})
        info([`Update Successful`]) 
        info([`version: ${require('../../package.json').version}`])
        if(os.type()=== 'Darwin')info([`Path:${rootPath}`])
    }
}

Object.freeze(UpdateSpec)
module.exports = UpdateSpec 