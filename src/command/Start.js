const puppeteer = require('puppeteer-core');
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const cos = [
    {
        "url":"https://129.211.10.130/",
        "name":"admin",
        "pwd":"adminadmin"
    }
]
// const {
//     cos
// } = require(path.resolve(os.homedir(), '.hfs/account.json'))
class ConsoleSpec {
    static async run() {
        let chrome = os.type() === 'Darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        const browser = await puppeteer.launch({
            ///Users/admin/Downloads/Chrome/chrome-mac/chrome-mac/Chromium.app/Contents/MacOS/Chromium
            executablePath: chrome, 
            headless: false, //是否打开浏览器窗口
            timeout: 60000,
            defaultViewport: null,//为每个页面设置一个默认视口大小。默认是 800x600。如果为 null 的话就禁用视图口
            ignoreHTTPSErrors: true ,//如果是访问https页面 此属性会忽略https错误
            args: [
                //'--window-size=1600,1000'
                '--start-maximized'//都启动浏览器最大化
              ]
        });
        try {
            cos.forEach(async(item)=>{
                const page = await browser.newPage() //官网写法： 一打开浏览器会打开两个tab，第二个才是你正在操作的tab
                //const page = (await browser.pages())[0]; //这是我的写法，只有一个tab
                // await page.setViewport({
                //   width: 1360,
                //   height: 768
                // });
                await page.goto(item.url);
                await page.waitFor('#_e_9');
                await page.waitFor(2000)
                await page.type('#_e_14 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input', item.name, {
                    delay: 30
                })
                await page.type('#_e_16 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input', item.pwd, {
                    delay: 30
                })
                await page.click('#_e_12 > table > tbody > tr:nth-child(2) > td.btn-push-n-center')
                await page.waitFor(2000)
                const frame =await page.frames().find(frame => frame.name() === '_e_20');
                await frame.click('#_e_25 > span.txt')
                await page.waitFor(2000)
                const frame1 =await page.frames().find(frame => frame.name() === '_e_21');
                await frame1.click('#_e_263')
                await page.waitFor(2000)
                await frame1.click('#_e_269 > div > div.toolitem-c')
                await page.waitFor(1000)
                await page.keyboard.press('ArrowLeft'); //向左箭头
                await page.waitFor(1000)
                await page.keyboard.press('Enter'); //回车

                // if (os.type() === 'Darwin') {
                // await page.waitFor(2000)
                // const frame =await page.frames().find(frame => frame.name() === '_e_21');
                // const span = await frame.$('#_e_53 > div > div.toolitem-c > span')
                // if (span) await frame.click('#_e_53 > div > div.toolitem-c > span')
                // }
            })
        } catch (error) {
            console.log(error)
            await browser.close(); //关闭窗口
            //ConsoleSpec.run()
        }
    }
}

Object.freeze(ConsoleSpec)
module.exports = ConsoleSpec