const childProcess = require('child_process')
const chalk = require('chalk')
const {
    info,
    error,
    warn
} = require('@hfs/print')
const os = require('os')
const Update = require('./Update')
class GitSpec {
    static run(argv) {
        let cmd = `${os.hostname()} ${new Date().toLocaleString()}` 
        childProcess.execSync(`git add . && git commit -m '${argv.m||cmd}' && git push`, {
            encoding: 'utf-8',
            stdio: 'inherit'
        })
        info([chalk.bold.green(`push Success`)])
        if (argv.update) {
            Update.run()
        }
    }
}
Object.freeze(GitSpec)
module.exports = GitSpec