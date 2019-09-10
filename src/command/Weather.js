const childProcess = require('child_process')
const chalk = require('chalk')
const {
    get, post
 } = require('../../config/ax')
const {
    info,
    error,
    warn
} = require('@hfs/print')
const os = require('os')
class WeatherSpec {
    static async run(argv) {
        argv._.shift()
        for (let i of argv._) {
         const url = 'https://www.apiopen.top/weatherApi' 
         const {data} = await get(url,{city:i})
         console.log(chalk.green(`${data.city}天气预报:`))
         data.forecast.forEach((item)=>{
             console.log(chalk.green(`日期: ${item.date} ${item.high} ${item.low} 天气: ${item.type}`))
         })
        }
    }
}
Object.freeze(WeatherSpec)
module.exports = WeatherSpec