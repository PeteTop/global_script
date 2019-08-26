#! /usr/bin/env node

const yargs = require('yargs').argv
const {
    info,
    error,
    warn
} = require('@hfs/print')
const {
    _: argvAry
} = yargs
const path = require('path')
const fs = require('fs')
const rootPath = path.resolve(__dirname, './')
const specFolder = path.resolve(rootPath, 'src/command')
const os = require('os')
const Introduction = path.resolve(rootPath, 'doc/功能介绍.md')
start()

function start() {
    if (!fs.existsSync(path.resolve(os.homedir(), '.hfs')))fileCreation()
    let cmd = argvAry[0]
    const specAry = fs.readdirSync(specFolder).map((item) => {
        return item.split('.')[0]
    })
    if (!cmd) {
        cmd = 'Info'
    }
    const specFile = specAry.find(ele => {
        return ele.toLowerCase() === cmd.toLowerCase()
    })
    if (yargs.h) {
        const buffer= fs.readFileSync(Introduction,'utf-8')
        console.log(buffer)
    }
    if (specFile) {
        const spec = require(path.resolve(rootPath, 'src/command', specFile))
        const {
            run
        } = spec
        run(yargs)
    } else {
        warn([`command '${argvAry}' not founded`])
        warn([`Available commands ${specAry}`])
    }
}

function fileCreation() {
    if (fs.existsSync(path.resolve(os.homedir(), '.hfs'))) {
        if (!fs.existsSync(path.resolve(os.homedir(), '.hfs/console.json'))) {
            fs.writeFileSync(path.resolve(os.homedir(), '.hfs/console.json'), JSON.stringify({"baidu":"https://www.baidu.com/"}));
        } 
    } else {
        fs.mkdirSync(path.resolve(os.homedir(), '.hfs'))
        fileCreation()
    }
}
