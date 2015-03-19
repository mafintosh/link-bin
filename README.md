# link-bin

Make bin scripts work local npm dependencies.

```
npm install link-bin
```

Should be used as a post-install npm hook

## Usage

Let's say you wanna put the following atom-shell app on npm

``` js
#!/usr/bin/env atom-shell

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
  "bin": "app.js",
  "scripts": {
    "install": "link-bin"
  },
  "dependencies": {
    "atom-shell": "^0.21.3-1",
    "link-bin": "^1.0.0"
  }
}
```

If you publish the above program to npm other people will be able to `npm install -g my-atom-shell-app`
and run `my-atom-shell-app` to execute the atom-shell app (even if they don't have atom-shell installed already)

To test it you can also run `npm install -g .` in the folder where you added the above `app.js` and `package.json` files.

## License

MIT
