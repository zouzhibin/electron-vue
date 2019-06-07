<template>
  <div id="wrapper">
    <main>
      <div class="right-side">
        <p>版本号:{{version}}</p>
        <button @click="checkUpdata">
          点击立即更新
        </button>
        <p>下载进度{{percent}}</p>
        <p @click="downLoad"><a ></a>路径:{{updateUrl}}</p>
        <button @click="install">立即下载</button>
      </div>
    </main>
  </div>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation'
import { ipcRenderer } from 'electron'
const { app } =  require('electron').remote
import axios from 'axios'


export default {
  name: 'LandingPage',
  // components: { SystemInformation },
  data(){
    return{
      percent:0,
      version:null,
      updateUrl:null
    }
  },
  created(){
    console.log('版本号',app.getVersion())
    this.version = app.getVersion()
    this.getRemoteVersion().then((value)=>{
      if(value){
        this.updateUrl = 'http://192.168.0.104:3333/electron_' + `${value}` + '.exe'
      }
    })
  },
  methods: {
    downLoad(){
      location.href=this.updateUrl
    },
    checkUpdata () {
      ipcRenderer && ipcRenderer.send('checkForUpdates')
      ipcRenderer && ipcRenderer.on('update-message', (event, { message, data }) => {
        console.log('update-message', message, data)
        switch (message) {
          case 'downloadProgress':
            this.percent = data.percent.toFixed(2)
                  console.log('更新进度',data.percent)
            break
          case 'isUpdateNow':
            this.percent = '100.00'
            break
          case 'updateNowError':
            if (this.updateUrl) {
              this.$alert('请手动复制下载地址安装：' + this.updateUrl, '安装失败')
            }
            break
          case 'updateing':
          case 'update-available':
            if (!this.dialogVisible) {
              this.dialogVisible = true
            }
            break
        }
      })
    },
    getRemoteVersion () {
      return new Promise((resolve, reject) => {
        // 创建一个axios示例
        const fetch = axios.create()
        fetch({
          url: 'http://192.168.0.104:3333/latest.yml'
        }).then(res => {
                  let remoteVersion = null
                  try {
                    remoteVersion = JSON.stringify(res.data).split('\\n')[0].split(' ')[1]
                    console.log('获取到的数据',remoteVersion)
                  } catch (e) {
                  }
                  resolve(remoteVersion)
                }, err => {
                  resolve(null)
                }
        )
      })
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    install(){
      ipcRenderer && ipcRenderer.send('updateNow')
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
