<template>
  <div class="favourite-container">
    <div class="favourite-list" v-infinite-scroll="loadMore">
      <el-col :xs="12" :sm="6" :xl="3" :lg="4">
        <div class="favourite-item">
          <el-image fit="cover" :src="defaule_cover">
          </el-image>
          <div class="item-preview" @click="itemInfoPic(1)"><i class="el-icon-monitor"></i>预览</div>
          <div class="item-favourite-off"><i class="el-icon-star-off"></i>取消最爱</div>
          <div class="favourite-item-info">
            <p>南小鸟棉花糖 26p+1v</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6" :xl="3" :lg="4">
        <div class="favourite-item">
          <el-image fit="cover" :src="defaule_cover">
          </el-image>
          <div class="item-preview" @click="itemInfoPic(2)"><i class="el-icon-monitor"></i>预览</div>
          <div class="item-favourite-off"><i class="el-icon-star-off"></i>取消最爱</div>
          <div class="favourite-item-info">
            <p>南小鸟棉花糖 26p+1v</p>
          </div>
        </div>
      </el-col>
    </div>
    <el-drawer custom-class="pic-drawer" title="南小鸟棉花糖 26p+1v" :visible.sync="drawer" direction="btt" size="40%">
      <el-image @click="showOriginPic(item)" v-for="(item,index) in imgList" :key="index" style="height:100%" fit="contain" :src="item.url"></el-image>
    </el-drawer>
    <div class="images" style="display:none;" v-viewer="{movable: false}">
      <img v-for="(item,index) in originPic" :src="item.url" :key="index">
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  const ipc = require('electron').ipcRenderer
  export default {
    name: 'favourite',
    data() {
      return {
        imgList: [],
        originPic:[],
        count: 0,
        drawer: false,
      }
    },
    computed: {
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
          for (let i = 0; i < args.length; i++) {
            this.imgList.push({
              url: (args[i].path + '\\' + args[i].filename).replace(/\\/g, '\\\\')
            })
          }
          console.log(this.imgList)
        })
      })
    },
    created() {
      
    },
    methods: {
      loadMore() {
        console.log("load more")
      },
      showOriginPic(param){
        const that = this
        this.originPic = []
        this.originPic.push(param)
        setTimeout(() => {
            const viewer = that.$el.querySelector('.images').$viewer
            viewer.show()
          }, 200)
      },
      itemInfoPic(index){
        this.drawer = true
        if(index === 1){
          ipc.send('test-get-moive', 'E:\\my_collection\\呆萌橘子酱\\白色小短裙')
        }else{
          ipc.send('test-get-moive', 'E:\\my_collection\\呆萌橘子酱\\可爱猫爪白丝')
        }
       
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

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
  }

  .favourite-text {
    font-size: 30px;
    line-height: 46px;
  }
</style>