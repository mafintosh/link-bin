var os = require('os')
var fs = require('fs')
var path = require('path')

var getPath = function (cb) {
  var dirs = []

  var loop = function (cwd) {
    var bin = path.join(cwd, 'node_modules', '.bin')
    fs.exists(bin, function (exists) {
      if (exists) dirs.push(bin)
      var next = path.join(cwd, '..')
      if (next === cwd) return cb(null, dirs)
      loop(next)
    })
  }

  loop(__dirname)
}

var toAbsolute = function (cmd, cb) {
  cmd = cmd.split(' ')

  var loop = function (i) {
    if (i === cmd.length) return cb(null, cmd.join(' '))
    var part = cmd[i]
    var abs = path.join(process.cwd(), part)
    fs.exists(abs, function (exists) {
      if (!exists) return loop(i + 1)
      cmd[i] = abs
      loop(i + 1)
    })
  }

  loop(0)
}

module.exports = function (cmd, cb) {
  getPath(function (err, dirs) {
    if (err) return cb(err)
    toAbsolute(cmd, function (err, cmd) {
      if (err) return cb(err)
      cb(null, 'export PATH="' + dirs.join(':') + ':$PATH"' + os.EOL + cmd + ' "$@"' + os.EOL)
    })
  })
}
