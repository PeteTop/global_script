const puppeteer = require('puppeteer-core');
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const option = ['y','n']
const {
    remoteServices
} = require(path.resolve(os.homedir(), '.hfs/account.json'))
const {
    cos,
    admin
} = require('../../config')
class AdminSpec {
    static async run(argv) {
        const select = Object.keys(argv)[1]
        let RemoteAry = []
        for (let i of argv._) {
            if (remoteServices[i])RemoteAry.push(remoteServices[i]) 
        }
        let chrome = os.type() === 'Darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        try {
            if (option.indexOf(select) !== -1 && RemoteAry.length !== 0) {
                const browser = await puppeteer.launch({
                    ///Users/admin/Downloads/Chrome/chrome-mac/chrome-mac/Chromium.app/Contents/MacOS/Chromium
                    executablePath: chrome,
                    headless: true, //是否打开浏览器窗口
                    timeout: 60000,
                    defaultViewport: null, //为每个页面设置一个默认视口大小。默认是 800x600。如果为 null 的话就禁用视图口
                    ignoreHTTPSErrors: true, //如果是访问https页面 此属性会忽略https错误
                    args: [
                        //'--window-size=1600,1000'
                        '--start-maximized' //启动浏览器最大化
                    ]
                });
                for (let item of RemoteAry) {
                    //const pages = await browser.pages(); // get all open pages by the browser
                    //const page = pages[pages.length - 1]; // the popup should be the last page opened  
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
                    let isRemote
                    const startRemote = '#_e_42 > div > div.toolitem-c'
                    const closeRemote = '#_e_43 > div > div.toolitem-c'
                    if (select === 'y') {
                        isRemote = startRemote
                    } else if (select === 'n') {
                        isRemote = closeRemote
                    }
                    const frame = await page.frames().find(frame => frame.name() === '_e_21');
                    const remote = await frame.$(isRemote)
                    for (let i = 0; i < (select === 'n' ? 2 : 1); i++) {
                        if (remote) {
                            await frame.click(isRemote)
                            await frame.waitFor(1000)
                            await page.keyboard.press('ArrowLeft'); //向左箭头
                            await frame.waitFor(1000)
                            await page.keyboard.press('Enter'); //回车
                        }
                        await frame.waitFor(2000)
                    }
                    await page.close() //关闭标签页
                }
                console.log(chalk.bold.green(`Success`))
                await browser.close(); //关闭窗口
            }else {
                console.log(chalk.bold.red('请输入有效名称或参数(-y:启动所有控制服务, -n:关闭所有控制服务)'))
            }
        } catch (error) {
            console.log(error)
            await browser.close(); //关闭窗口
            //AdminSpec.run()
        }
    }
}

Object.freeze(AdminSpec)
module.exports = AdminSpec