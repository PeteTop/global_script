const childProcess = require('child_process')
const chalk = require('chalk')
const printMessage = require('print-message')
class GitSpec {
 static run (argv) {
    childProcess.execSync(`git add . && git commit -m 'PeteTop ${new Date().toLocaleString()}' && git push`,{
        encoding:'utf-8',
        stdio: 'inherit'
    })
    printMessage([chalk.bold.green(`push Success`)],{color:'green',borderColor:'green'})  
    console.log(argv) 
 }
}
Object.freeze(GitSpec)
module.exports = GitSpec