const fs = require('fs')
const path = require('path')
const file = fs.readFileSync(path.resolve(__dirname, '../dist/bundle.js'),'utf-8')
const bin = '#!/usr/bin/env node\n'+file
fs.writeFileSync(path.resolve(__dirname, '../dist/bundle.js'),bin)