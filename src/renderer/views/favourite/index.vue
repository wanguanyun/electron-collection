<template>
  <div class="favourite-container">
    <div class="favourite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="scrollDisabled">
      <el-col :xs="12" :sm="6" :xl="3" :lg="4" v-for="(item,index) in itemLists" :key="index">
        <div class="favourite-item">
          <el-image fit="cover"
            :src="item.img_name && app_module === 1?`${Base_url}/img/${item.img_name}`:`${defaule_item_cover}`">
          </el-image>
          <div class="item-preview" @click="itemInfoPic(item)"><i class="el-icon-monitor"></i>预览</div>
          <el-popover placement="bottom" width="150" trigger="hover">
            <p>确定取消收藏吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text">取消</el-button>
              <el-button type="primary" size="mini" @click="cancelFavourite(item,index)">确定</el-button>
            </div>
            <div class="item-favourite-off" slot="reference"><i class="el-icon-star-off"></i>取消最爱</div>
          </el-popover>
          <div @click="openLoaclDir(item)" class="item-favourite-open"><i class="el-icon-folder-opened"></i></div>
          <div v-if="item.gallery_item_net" v-clipboard:copy="item.gallery_item_net" v-clipboard:success="onCopy"
            v-clipboard:error="onError" title="复制链接" class="item-favourite-download"><i class="el-icon-link"></i></div>
          <div class="favourite-item-info">
            <p>{{app_module === 1?item.gallery_item_name:'猜猜我是谁？'}}</p>
          </div>
        </div>
      </el-col>
    </div>
    <el-drawer custom-class="pic-drawer" :title="drawerTitleName+' (图片>2MB默认不展示)'" :visible.sync="drawer"
      direction="btt" size="80%">
      <el-divider v-if="videoList.length !== 0">
        <i class="el-icon-video-camera"></i></el-divider>
      <div class="video-cover" @click="showVideo(item)" v-for="(item,index) in videoList" :key='"vide"+index'><i
          class="el-icon-video-play"></i>
        <p>{{item.filename}}</p>
      </div>
      <el-divider v-if="imgList.length !== 0"><i class="el-icon-picture-outline"></i></el-divider>
      <el-image @click="showOriginPic(imgList)" v-for="(item,index) in imgList" :key="index" style="height:230px;"
        fit="contain" :src="item.url">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>加载中...</span>
        </div>
      </el-image>
    </el-drawer>
    <div class="images" style="display:none;" v-viewer="{movable: false}">
      <img v-for="(item,index) in originPic" :src="item.url" :key="index">
    </div>
    <el-dialog :visible.sync="showVideoPreview" :close-on-press-escape="false" :destroy-on-close="true" width="1000px"
      custom-class="video-preview-dialog">
      <div id="videoPreview" class="video-preview"></div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    getFavouriteGirlitems,
    setGirlitemFavourite
  } from '@/api/girl'
  import 'dplayer/dist/DPlayer.min.css'
  import DPlayer from 'dplayer'
  const ipc = require('electron').ipcRenderer
  export default {
    name: 'favourite',
    data() {
      return {
        imgList: [],
        originPic: [],
        itemLists: [],
        count: 0,
        drawer: false,
        currentpage: 0,
        scrollDisabled: false,
        drawerTitleName: '',
        videoList: [],
        showVideoPreview: false
      }
    },
    computed: {
      Base_url() {
        return process.env.BASE_API
      },
      ...mapGetters([
        'defaule_cover',
        'defaule_item_cover',
        'app_module'
      ])
    },
    mounted: function () {
      this.$nextTick(() => {
        // Register IPC Renderer event handles once for this control
        // 监听主进程的返回
        ipc.on('test-get-moive-reply', (e, args) => {
          this.imgList = []
          this.videoList = []
          console.log(args)
          for (let i = 0; i < args.length; i++) {
            if (args[i].type === 'img') {
              this.imgList.push({
                url: (args[i].path + '\\' + args[i].filename).replace(/\\/g, '\\\\')
              })
            } else {
              this.videoList.push({
                filename: args[i].filename,
                url: (args[i].path + '\\' + args[i].filename).replace(/\\/g, '\\\\')
              })
            }
          }
          this.originPic = this.imgList
        })
      })
    },
    created() {

    },
    methods: {
      loadMore() {
        console.log('load more')
        getFavouriteGirlitems({
          pagesize: 30,
          currentpage: ++this.currentpage
        }).then(res => {
          console.log(res)
          res.data.rows.forEach(item => {
            this.itemLists.push(item)
          })
          if (res.data.rows.length === 0) {
            this.scrollDisabled = false
          }
        }).catch(() => {})
      },
      showVideo(param) {
        console.log(param)
        this.showVideoPreview = true
        setTimeout(() => {
          const dp = new DPlayer({
            container: document.getElementById('videoPreview'),
            autoplay: true,
            video: {
              url: param.url
            }
          })
          dp.on('fullscreen', function () {
            dp.fullScreen.cancel('browser')
          })
        }, 200)
      },
      showOriginPic(param) {
        const that = this
        // this.originPic = param
        // this.originPic.push(param)
        setTimeout(() => {
          const viewer = that.$el.querySelector('.images').$viewer
          viewer.show()
        }, 200)
      },
      cancelFavourite(param, index) {
        setGirlitemFavourite(param).then(res => {
          // 删除已取消最爱的
          this.itemLists.splice(index, 1)
        }).catch(() => {})
      },
      itemInfoPic(param) {
        this.drawer = true
        this.drawerTitleName = param.gallery_item_name
        ipc.send('test-get-moive', param.gallery_item_local)
      },
      // 复制网络地址到剪贴板-成功
      onCopy(e) {
        this.$notify({
          title: '成功',
          message: '已复制网络地址到剪贴板',
          type: 'success'
        })
      },
      // 复制网络地址到剪贴板-失败
      onError(e) {
        this.$notify({
          title: '失败',
          message: '复制失败',
          type: 'warning'
        })
      },
      // 打开本地文件夹
      openLoaclDir(param) {
        console.log(1111)
        ipc.send('local-address-open', param.gallery_item_local)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .favourite-container {
    .video-preview-dialog {
      .el-dialog__body {
        background: #606266;
        padding: 0;
      }

      .el-dialog__header {
        padding: 0;
      }
    }
  }
</style>


<style rel="stylesheet/scss" lang="scss" scoped>
  .favourite-container {
    padding: 20px;

    .favourite-list {
      overflow: auto;
      position: absolute;
      top: 20px;
      bottom: 20px;
      left: 20px;
      right: 20px;

      .favourite-item {
        background: #fff;
        border: 1px #d9d9d9 solid;
        height: 250px;
        border-radius: 4px;
        margin-bottom: 10px;
        margin-right: 5px;
        transition: all .2s;
        overflow: hidden;
        position: relative;

        .item-preview {
          width: 62px;
          height: 32px;
          line-height: 32px;
          background: #f6f6f6;
          display: block;
          position: absolute;
          right: 5px;
          border-radius: 0 0 4px 0;
          bottom: 50px;
          text-align: center;
          color: #7f6360;
          cursor: pointer;
          transition: all .2s;

          &>i {
            margin-right: 3px;
          }
        }

        &:hover .item-preview {
          right: 2px;
        }

        .item-favourite-off {
          width: 90px;
          height: 32px;
          line-height: 32px;
          background: #fde2e2;
          display: block;
          position: absolute;
          right: 5px;
          top: -62px;
          border-radius: 0 0 4px 0;
          text-align: center;
          color: #f56c6c;
          cursor: pointer;
          transition: all .2s;

          &>i {
            margin-right: 3px;
          }

          &:hover {
            color: #e6a23c;
          }
        }

        &:hover .item-favourite-off {
          top: 5px;
        }

        .item-favourite-open {
          width: 32px;
          height: 32px;
          font-size: 20px;
          line-height: 32px;
          background: #f6f6f6;
          display: block;
          position: absolute;
          left: -40px;
          bottom: 50px;
          border-radius: 0 0 0 4px;
          text-align: center;
          color: #7f6360;
          cursor: pointer;
          transition: all .2s .1s;
        }

        &:hover .item-favourite-open {
          left: 2px;
        }

        .item-favourite-download {
          width: 32px;
          height: 32px;
          font-size: 20px;
          line-height: 32px;
          background: #f6f6f6;
          display: block;
          position: absolute;
          left: -80px;
          bottom: 50px;
          text-align: center;
          color: #7f6360;
          cursor: pointer;
          transition: all .2s;
        }

        &:hover .item-favourite-download {
          left: 40px;
        }

        .favourite-item-info {
          position: absolute;
          left: 0;
          right: 0;
          top: 200px;
          bottom: 0;
          color: #7f6360;

          &>p {
            font-size: 15px;
            text-align: center;
          }
        }

        &:hover {
          border: 1px #fff solid;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transform: translate3d(0, -2px, 0);
        }

        .el-image {
          position: absolute;
          left: 5px;
          right: 5px;
          top: 5px;
          bottom: 50px;
          border-radius: 4px;
          transition: all .2s;
        }

        &:hover .el-image {
          left: 2px;
          right: 2px;
          top: 2px;
        }
      }
    }

    .video-preview {
      width: 100%;
      height: 460px;
    }
  }

  .favourite-text {
    font-size: 30px;
    line-height: 46px;
  }
</style>