const puppeteer = require('puppeteer-core');
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const { 
    cos
} = require('../../config')
class TonsoleSpec {
    static async run() {
        let chrome = os.type() === 'Darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        const browser = await puppeteer.launch({
            ///Users/admin/Downloads/Chrome/chrome-mac/chrome-mac/Chromium.app/Contents/MacOS/Chromium
            executablePath: chrome, 
            headless: false, //是否打开浏览器窗口
            timeout: 60000,
            ignoreHTTPSErrors: true //如果是访问https页面 此属性会忽略https错误
        });
        try {
            cos.forEach(async(item)=>{
                const page = await browser.newPage() //官网写法：一打开浏览器会打开两个tab，第二个才是你正在操作的tab
                //const page = (await browser.pages())[0]; //这是我的写法，只有一个tab
                await page.setViewport({
                  width: 1600,
                  height: 1000
                });
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
            })
        } catch (error) {

            //console.log(error)
            await browser.close(); //关闭窗口
            TonsoleSpec.run()
        }
    }
}

Object.freeze(TonsoleSpec)
module.exports = TonsoleSpec