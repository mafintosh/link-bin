#!/usr/bin/env atom-shell

var app = require('app')
var BrowserWindow = require('browser-window')

var createWindow = function () {
  return new BrowserWindow({
    width: 800,
    height: 600,
    show: true
  })
}

app.on('ready', createWindow)
