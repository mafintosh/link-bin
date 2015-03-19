#!/usr/bin/env node

var link = require('./')
var path = require('path')
var fs = require('fs')
var os = require('os')

link(process.argv.slice(2).join(' '), function (err, bin) {
  if (err) throw err
  pkg.bin = 'link-bin'
  fs.writeFileSync(pkg.bin, bin)
  fs.chmodSync(pkg.bin, 33261)
})
