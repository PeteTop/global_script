const puppeteer = require('puppeteer-core');
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const {
    Tencent
} = require(path.resolve(os.homedir(), 'hfs_config/account.json'))
class TXSpec {
    static async run() {
        const browser = await puppeteer.launch({
            ///Users/admin/Downloads/Chrome/chrome-mac/chrome-mac/Chromium.app/Contents/MacOS/Chromium
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: true, //是否打开浏览器窗口
            timeout: 60000,
            ignoreHTTPSErrors: true //如果是访问https页面 此属性会忽略https错误
        });
        try {
            for (let i = 0; i < Tencent.length; i++) {
                const page = await browser.newPage(); //新建一个页面.
                await page.setViewport({
                    width: 1680,
                    height: 1024
                });
                await page.goto('https://www.qcloud.com/login?s_url=https%3A%2F%2Fconsole.qcloud.com%2F', {
                    timeout: 0
                }); //网页跟踪到腾讯云网址.
                const user = await page.$eval('div[class="clg-mod-tab J-loginContentBox J-loginedInfo"]', div => div.style.display)
                if (user === 'block') await page.click('a[class="J-loginContinue"]') //判断账号是否已登录,已登录点击切换其他账号
                await page.click('a[title="邮箱"]'); //'点击邮箱按钮
                await page.$eval('input[class="clg-input J-username"]', input => input.value = '')
                await page.$eval('input[class="clg-input J-password"]', input => input.value = '')
                await page.type('input[class="clg-input J-username"]', Tencent[i].name, {
                    delay: 0
                })
                await page.type('input[class="clg-input J-password"]', Tencent[i].password, {
                    delay: 0
                })
                await page.keyboard.press('Enter'); //回车
                await page.waitFor(5000);
                const name = await page.$('a[class="su-refuse J-skipBind"]') //判断是否弹出关注微信页面
                if (name) await page.click('a[class="su-refuse J-skipBind"]')
                await page.waitFor(10000); //div[class="qc-account-inner"]
                await page.hover('#t_cost') //模仿鼠标移动到某个元素上   
                await page.waitFor('.qc-balance-num'); //等待.qc-balance-num元素加载完毕
                const data = await page.$eval('.qc-balance-num', div => div.innerText) //获取节点属性
                //console.log(`账户:${Tencent[i].name}  可用余额:${data.replace(/ /g,'')}`)
                await page.waitFor(1000)
                await page.click('a[data-hot="header.user.renewal"]')
                const itemSelector = '#appArea > div[data-id="container"] > div > .main-head > div[class="renewals-search-type J-renewal-filter"] > div[class="renewals-search-type-item J-expire-filter"] > div[class="renewals-search-list J-radio-group"] > a'
                const listSelector = '#appArea > div[data-id="container"] > div > .main-head > div[class="renewals-search-type J-renewal-filter"] > div[class="renewals-search-type-item J-expire-filter"] > div[class="renewals-search-list J-radio-group"] > a > span[class="org-text"]'
                await page.waitFor(listSelector)
                const num = await page.$$eval(itemSelector, a => {
                    let list = []
                    for (let i = 0; i < a.length - 1; i++) {
                        let arr = a[i].innerText
                        let time = arr.substr(0, arr.indexOf(' '))
                        let count = arr.substr(arr.indexOf(' ') + 1)
                        let obj = {
                            time: time,
                            count: count
                        }
                        list.push(obj)
                    }
                    return list
                })
                const balance = parseInt(data.replace(/ /g, '')) - (parseInt(num[1].count) * 50)
                const userName = Tencent[i].name
                await page.click('#appArea > div > div:nth-child(3) > div.main-head > div.renewals-search-type.J-renewal-filter > div.renewals-search-type-item.J-expire-filter > div > a:nth-child(6)')
                await page.waitFor(1000)
                const fulter = await page.$$('#appArea > div > div:nth-child(3) > div.main-head > div.renewals-search-type.J-renewal-filter > div.renewals-search-type-item.J-region-filter > div > a')
                let arr = []
                let ps = ''
                if (fulter.length > 0) {
                    for (let i = 1; i <= fulter.length; i++) {
                        await page.click(`#appArea > div > div:nth-child(3) > div.main-head > div.renewals-search-type.J-renewal-filter > div.renewals-search-type-item.J-region-filter > div > a:nth-child(${i})`)
                        if (i === 1) await page.click('#appArea > div > div:nth-child(3) > div.main-head > div.new-action-panel > div > ul > li:nth-child(2) > a')
                        await page.waitFor(6000)
                        const tx = await page.$$eval('#appArea > div > div:nth-child(3) > div.main-body > div:nth-child(2) > div > div.tc-15-table-panel > div.tc-15-table-fixed-body > table > tbody > tr.item-row', div => {
                            return div.map((item) => {
                                return {
                                    region: item.querySelector('td:nth-child(3) >div').innerText,
                                    date: item.querySelector('td:nth-child(5) > div').innerText,
                                    cost: item.querySelector('td:nth-child(7) > div > span').innerText
                                }
                            })
                        })
                        tx.forEach(item => arr.push(item))
                        await page.waitFor(3000)
                    }
                    arr.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date)
                    })
                    let ms = parseInt(data.replace(/ /g, ''))
                    for (let i = 0; i < arr.length; i++) {
                        ms = ms - parseFloat(arr[i].cost)
                        if (ms < 0) {
                            ps = `${arr[i].date} 地域:${arr[i].region}`
                            //(`余额：${ps}`)

                            break;
                        }
                    }
                }
                console.log(`账户:${chalk.blue(userName.substr(userName.indexOf('@')-4,4))}  可用余额:${chalk.green(data.replace(/ /g,''))}  云服务器:${chalk.blue(num[0].count)}台  ${num[1].time}:${chalk.blue(num[1].count)}台  续费后可用余额:${balance>200?chalk.green(balance + '元'):chalk.red(balance + '元')} 余额到期日:${chalk.red(ps?ps:'')}`)
                await page.close()
            }
            await browser.close(); //关闭窗口
        } catch (error) {
            console.log(error)
            await browser.close(); //关闭窗口
            TXSpec.run()
        }
    }
}

Object.freeze(TXSpec)
module.exports = TXSpec