#! /usr/bin/env node
const yargs = require('yargs').argv
const chalk = require('chalk')
const printMessage = require('print-message')
const {
    _: argvAry
} = yargs
const path = require('path')
const fs = require('fs')
const rootPath = path.resolve(__dirname, './')
const specFolder = path.resolve(rootPath, 'src/command')

start()

function start() {
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
        console.log(specAry)
    }
    if (specFile) {
        const spec = require(path.resolve(rootPath, 'src/command', specFile))
        const {run} = spec
        run(yargs)
    }else {
        printMessage([`command ${chalk.red(argvAry)} not founded`])
        printMessage([`Available commands ${chalk.green(specAry)}`])
    }
}