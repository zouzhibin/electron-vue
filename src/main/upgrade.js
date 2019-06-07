import { ipcMain, BrowserWindow } from 'electron'
const { autoUpdater } = require('electron-updater')
const updateUrl = 'http://192.168.0.104:3333' // 正式更新包位置

function checkForUpdate () {
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = false

  // 配置安装包远端服务器
  autoUpdater.setFeedURL(updateUrl)
  // 执行自动更新检查
  autoUpdater.checkForUpdates()
  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) {
    console.log('error')
    sendUpdateMessage('error', message)
  })
  // 检查是否有版本更新
  autoUpdater.on('checking-for-update', function (message) {
    console.log('checking-for-update')
    sendUpdateMessage('checking-for-update', message)
  })
  // 有版本更新
  autoUpdater.on('update-available', function (message) {
    console.log('update-available')
    sendUpdateMessage('update-available', message)
  })
  // 未发现更新版本
  autoUpdater.on('update-not-available', function (message) {
    console.log('update-not-available')
    sendUpdateMessage('update-not-available', message)
  })
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log('download-progress')
    sendUpdateMessage('downloadProgress', progressObj)
  })

  // autoUpdater.checkForUpdates()
}

ipcMain.on('update', (e, arg) => {
  console.log('updatahahhah ')
  checkForUpdate()
})
// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  console.log({ message, data })
  if (BrowserWindow.getAllWindows() && BrowserWindow.getAllWindows()[0] && BrowserWindow.getAllWindows()[0].webContents) {
    BrowserWindow.getAllWindows()[0].webContents.send('updata-message', { message, data })
  }
  // webContents.send('message', { message, data });
}

// app.on('ready', () => {
//     setTimeout(checkForUpdate, 1000)
// })
