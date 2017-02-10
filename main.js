const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', () => {
    let win = new BrowserWindow({height:500, width:400, autoHideMenuBar: true})
    win.loadURL(`file://${__dirname}/index.html`)
    //win.webContents.openDevTools()
});
