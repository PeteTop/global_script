const childProcess = require('child_process')
const chalk = require('chalk')
const rootPath = path.resolve(__dirname, '../../')
const printPath = path.resolve(rootPath,'config/Print.js')
const {
    info,
    error,
    warn
} = require(printPath)
const os = require('os')
const Update = require('./Update')
class GitSpec {
    static run(argv) {
        // ${new Date().toLocaleString()}
        let cmd = `${os.hostname()}` 
        childProcess.execSync(`git add . && git commit -m ${argv.m||cmd} && git push`, {
            encoding: 'utf-8',
            stdio: 'inherit'
        })
        info([chalk.bold.green(`push Success `)])
        if (argv.update) {
            Update.run()
        }
        
    }
}

Object.freeze(GitSpec)
module.exports = GitSpec