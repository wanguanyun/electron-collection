import {
  app,
  BrowserWindow
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

//托盘对象
let appTray = null;
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

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
  //系统托盘右键菜单
  var trayMenuTemplate = [{
      label: '设置',
      click: function () {} //打开相应页面
    },
    {
      label: '帮助',
      click: function () {}
    },
    {
      label: '关于',
      click: function () {}
    },
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ]
  //系统托盘图标目录
  let trayIcon = path.join(__dirname, '../../build/icons'); //app是选取的目录

  appTray = new Tray(path.join(trayIcon, 'my.ico')); //app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('我的托盘图标');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click', function () {
    mainWindow.show();
  })


  mainWindow.loadURL(winURL)

  mainWindow.on('close', (e) => {
    //回收BrowserWindow对象
    if (mainWindow.isMinimized()) {
      mainWindow = null;
    } else {
      e.preventDefault();
      mainWindow.minimize();
    }
  });
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
const path = require('path');
const dialog = require('electron').dialog
const shell = require('electron').shell;
const Menu = require('electron').Menu;
const Tray = require('electron').Tray;
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
  }, (filePath) => {
    // fileNames is an array that contains all the selected
    if (!filePath || filePath === undefined) {
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