const Agent = require('socks5-http-client/lib/Agent')
const {SocksClient} = require('socks')
const request = require('request')
const chalk = require('chalk')

class Socks {
  static run (argv) {
    const ipaddress = argv._[1]
    let {user, password} = argv
    if (user) {
      user = String(user)
    }

    const option = {
      proxy: {
        ipaddress,
        type: 5,
        port: 1080,
        userId: user || 'hfs', // Used for SOCKS4 userId auth, and SOCKS5 user/pass auth in conjunction with password.
        password: password || 'proxy@hfs' // Used in conjunction with userId for user/pass auth for SOCKS5 proxies.
      },
      command: 'connect', // connect, bind, associate
      destination: {
        host: 'www.baidu.com', // ipv4, ipv6, hostname. Hostnames work with v4a and v5.
        port: 80
      },
      timeout: 1000 * 8// How long to wait to establish a proxy connection. (defaults to 30 seconds)
    }

    SocksClient.createConnection(option, (error) => {
      if (error) {
        console.log(error)
        throw error
      } else {
        console.log(`socket established, socketed established first at ${chalk.green(ipaddress)}`)
        request({
          url: 'http://whatismyip.akamai.com/',
          strictSSL: false,
          agentClass: Agent,
          agentOptions: {
            socksHost: ipaddress,
            socksPort: 1080,
            socksUsername: user || 'hfs',
            socksPassword: password || 'proxy@hfs'
          }
        }, function (err, res) {
          if (err) {
            console.error(err)
          } else {
            console.log(`exposed ip is ${chalk.green(res.body)}`)
          }
          process.exit(0)
        })
      }
    })
  }
}

Object.freeze(Socks)
module.exports = Socks
