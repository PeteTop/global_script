const childProcess = require('child_process')
const chalk = require('chalk')
class GitSpec {
 static run (argv) {
    childProcess.execSync(`git add . && git commit -m 'PeteTop ${new Date().toLocaleString()}' && git push`,{
        encoding:'utf-8',
        stdio: 'inherit'
    })
    console.log(chalk.bold.green(`push Success`))
 }
}
Object.freeze(GitSpec)
module.exports = GitSpec