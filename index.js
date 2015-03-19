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

module.exports = function (filename, cb) {
  getPath(function (err, dirs) {
    if (err) return cb(err)
    fs.realpath(filename, function (err, realname) {
      if (err) return cb(err)
      cb(null, 'export PATH="' + dirs.join(':') + ':$PATH"' + os.EOL + realname + ' "$@"' + os.EOL)
    })
  })
}
