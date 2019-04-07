import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 720,
    useContentSize: true,
    width: 1400,
    // frame: false,
    // resizable: false,
    // skipTaskbar: false,
    // transparent: false,
    title: 'export all = life',
    // autoHideMenuBar: true,
    x: 0,
    y: 0
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const electron = require('electron')
const ipc = electron.ipcMain
const dialog = require('electron').dialog
const shell = require('electron').shell;
// var fs = require('fs')

ipc.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})
ipc.on('max-app', () => {
  mainWindow.maximize()
})
ipc.on('min-app', () => {
  mainWindow.minimize()
})

ipc.on('local-address-config', (event, arg) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  },(filePath) => {
    // fileNames is an array that contains all the selected
    if(!filePath || filePath === undefined){
        console.log("No file selected");
        return;
    }
    console.log(filePath)
    event.sender.send('local-address-config-reply', filePath);
});
})

ipc.on('local-address-open', (event, arg) => {
  console.log(arg)
  shell.openItem(arg)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
