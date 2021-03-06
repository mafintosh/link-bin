#!/usr/bin/env node

var link = require('./')
var path = require('path')
var fs = require('fs')

if (!process.env.npm_package_name) {
  console.error('You should run link-bin as an npm install hook')
  process.exit(1)
}

var filenames = [].concat(process.argv[2] || [])

if (!filenames.length) {
  try {
    var pkg = require(path.resolve('./package.json'))
    if (typeof pkg.bin === 'string') {
      filenames.push(pkg.bin)
    } else {
      Object.keys(pkg.bin).forEach(function (key) {
        filenames.push(pkg.bin[key])
      })
    }
  } catch (err) {
    // ...
  }
}

filenames.forEach(function (filename) {
  filename = path.resolve(filename)
  var target = path.join(path.dirname(filename), 'link-bin-' + path.basename(filename))
  link(filename, target, function (err, bin) {
    if (err) throw err
    if (!fs.existsSync(target)) fs.renameSync(filename, target)
    fs.writeFileSync(filename, bin)
    fs.chmodSync(filename, 33261)
  })
})
