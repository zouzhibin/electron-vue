import { ipcMain, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
const updateUrl = 'http://192.168.1.69:3333' // 正式更新包位置

function checkForUpdates () {
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = false
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(updateUrl)
  // 执行自动更新检查
  autoUpdater.checkForUpdates()
  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) {
    sendRenderMessage('error', message)
    autoUpdater.updating = -1
    autoUpdater.downloadedUpdateHelper.clear()
  })
  // 开始检测
  autoUpdater.on('checking-for-update', function (message) {
    autoUpdater.updating = 1
    sendRenderMessage('checking-for-update', message)
  })
  // 有效版本更新
  autoUpdater.on('update-available', function (message) {
    autoUpdater.updating = 1
    sendRenderMessage('update-available', message)
  })
  // 无效版本更新
  autoUpdater.on('update-not-available', function (message) {
    autoUpdater.updating = -1
    sendRenderMessage('update-not-available', message)
  })
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendRenderMessage('downloadProgress', progressObj)
  })
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    autoUpdater.updating = 2
    sendRenderMessage('isUpdateNow')
  })
  // 监听渲染进程传来的启动安装命令
  ipcMain.on('updateNow', (e, arg) => {
    if (autoUpdater.updating === 2) {
      autoUpdater.quitAndInstall()
    } else {
      sendRenderMessage('updateNowError')
    }
  })
  // 监听渲染进程传来的检查更新命令
  ipcMain.on('checkForUpdates', (e, arg) => {
    if (autoUpdater.updating === 1) {
      sendRenderMessage('updateing')
    } else {
      autoUpdater.checkForUpdates()
    }
  })
}

/**
 * 主进程主动发送消息给渲染进程函数
 *
 * @param {*} message
 * @param {*} data
 */
function sendRenderMessage (message, data) {
  console.log({ message, data })
  if (BrowserWindow.getAllWindows() && BrowserWindow.getAllWindows()[0] && BrowserWindow.getAllWindows()[0].webContents) {
    BrowserWindow.getAllWindows()[0].webContents.send('update-message', { message, data })
  }
}
