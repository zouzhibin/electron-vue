# electron

#### 1、当我配置了electron-updater的只会运行了yarn run win的时候报错了
- 原因查了好久，发现是npm下载的问题
```
因为NPM在国内比较慢。导致electron-V.xxxx.zip下载失败。
这些东西如果是第一次打包的话是需要下载对应electron版本的支持文件。解决办法有两个
```

- 1、设置镜像：在C盘User中找到.npmrc文件。然后加入下面这句代码,但是这个有时候也不是很好用
```
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

- 2、
直接去淘宝镜像文件库找到对应的文件并下载，
放到指定的目录下，electron的淘宝镜像地址。
下载完之后放到指定的文件
```
一般文件得地址在C:\Users\Administrator\AppData\Local\electron\Cache。
例如我要下载1.8.4版本的electron，那么找到镜像下得文件然后放到指定文件夹中。
```


