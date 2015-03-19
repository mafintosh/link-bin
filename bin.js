#!/usr/bin/env node

var link = require('./')
var path = require('path')
var fs = require('fs')
var os = require('os')
var pkg = require(path.resolve('package.json'))

link(process.argv.slice(2).join(' '), function (err, bin) {
  if (err) throw err
  pkg.bin = 'link-bin.bat'
  fs.writeFileSync(pkg.bin, bin)
  fs.chmodSync(pkg.bin, 33261)
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + os.EOL)
})
