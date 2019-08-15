const node_ssh = require('node-ssh')
const ssh = new node_ssh()
const path = require('path')
const os = require('os')
const {
    cons
} = require(path.resolve(os.homedir(), '.hfs/console.json'))
const cmd = 'jps'
class RestartSpec {
    static run(argv) {
        ssh.connect({
            host: argv.ip,
            username: 'root',
            port: 22,
            password: argv.pwd  
        }).then(async () => {
            let ary = (await RestartSpec.startCmd(cmd)).split('\n')
            ary.forEach(element => {
                let jiuqi = element.indexOf('com.jiuqi.dna.launcher_1.0.0.jar')
                if (jiuqi !== -1) {
                    const ID = element.substr(0, jiuqi - 1)
                    RestartSpec.startCmd(`kill -9 ${ID}`)
                }
            });
            console.log(await RestartSpec.startCmd(cmd))
            let time = setInterval(async () => {
                let num1 = (await RestartSpec.startCmd('netstat -anp|grep :9801')).length
                let num2 = (await RestartSpec.startCmd('netstat -anp|grep :9802')).length
                let num3 = (await RestartSpec.startCmd('netstat -anp|grep :9803')).length
                if (num1 === 0 && num2 === 0 && num3 === 0) {
                    clearInterval(time)
                    await RestartSpec.startCmd('cd /opt/console/;./startup.sh')
                    console.log('重启控制台成功')
                    console.timeEnd('耗时');
                    process.exit(0)
                }
            }, 3000)
        })
    }
    static startCmd(cmd) {
        return new Promise((resolve, reject) => {
            ssh.execCommand(cmd, {}).then(function (result) {
                if (result.stderr) reject(result.stderr)
                resolve(result.stdout)
            })
        })
    }

}
Object.freeze(RestartSpec)
module.exports = RestartSpec