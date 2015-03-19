#!/usr/bin/env node

var link = require('./')
var path = require('path')
var fs = require('fs')
var os = require('os')

link(process.argv.slice(2).join(' '), function (err, bin) {
  if (err) throw err
  fs.writeFileSync('link-bin', bin)
  fs.chmodSync('link-bin', 33261)
})
