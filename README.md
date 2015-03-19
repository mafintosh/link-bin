# link-bin

Generate a bin script with support for local npm dependencies and add it to package.json.

```
npm install link-bin
```

Can be used as a post-install npm hook to link a shell script with local dependencies to beinstallable
using npm.

## Usage

Let's say you wanna put the following atom-shell app on npm

``` js
// this is an atom-shell app that just shows an empty screen
var app = require('app')
var BrowserWindow = require('browser-window')

app.on('ready', function () {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true
  })
})
```

Luckily [atom-shell](https://github.com/mafintosh/atom-shell) is installable through npm.
If you save the above file as `app.js` you can then create the following `package.json` file

``` json
{
  "name": "my-atom-shell-app",
  "version": "1.0.0",
  "description": "my atom-shell app",
  "bin": "link-bin",
  "scripts": {
    "install": "link-bin atom-shell app.js"
  },
  "dependencies": {
    "atom-shell": "^0.21.3-1",
    "link-bin": "^1.0.0"
  }
}
```

If you save the above and run `npm link` in the directory `link-bin` will generate an executable
file that runs `atom-shell app.js` and and save that as `./link-bin` which means
that when you run `my-atom-shell-app` afterwards on the command line it will execute the atom-shell app

You can also publish it to npm which means other people will be able to `npm install -g my-atom-shell-app`
and run `my-atom-shell-app` to execute the atom-shell app

## License

MIT
