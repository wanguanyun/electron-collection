<template>
  <el-col class="girl-item" :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
    <el-card shadow="always" :body-style="{ padding: '0px' }">
      <div class="girl-box" @click="handleGirlitems">
         <el-image  style="width: 100%;" v-if="girlDataType === 1"
          :src="girlData.img_name && app_module === 1?`${Base_url}/img/${girlData.img_name}`:`${defaule_cover}`" fit="cover"></el-image>
         <el-image  style="width: 100%;" v-if="girlDataType === 2"
          :src="girlData.img_name && app_module === 1?`${Base_url}/img/${girlData.img_name}`:`${defaule_item_cover}`" fit="cover"></el-image>
        <span v-text="app_module === 1?girlData.gallery_name:'猜猜我是谁？'"></span>
        <SvgIcon v-if="girlDataType === 2" @click.native="handleFavourite"
          :iconClass="girlData.if_favourite===1?'favourite':'unfavourite'" class="icon-favourite"></SvgIcon>
        <p v-if="girlDataType === 2" class="icon-more" @click="moreViewer">更多预览<SvgIcon iconClass="pull_right"
            class="pull-right-icon"></SvgIcon>
        </p>
        <p v-if="girlDataType === 2" class="icon-more-local" @click="moreLocalViewer"><i class="el-icon-monitor"></i>本地预览
        </p>
        <div v-if="girlDataType === 1" class="girl-item-count" v-text="girlData.gallery_item_count"></div>
        <div v-if="girlDataType === 1" class="girl-item-list">
          <ul>
            <li v-if="item" :title="item" :key="index"
              v-for="(item,index) in (girlData.gallery_item_names?girlData.gallery_item_names:'').split(',')">
              {{index+1}}、{{app_module === 1?item:'猜猜我是谁？'}}</li>
          </ul>
        </div>
      </div>
      <div class="clearfix" style="padding: 5px;position:relative">
        <div class="girl-tags clearfix">
          <el-tag v-if="item" v-for="(item,index) in girlData.gallery_tag.split(',')" :key="index"
            :color="color[index%5]" @click="handleTagSearch(item)" size="mini" type="info">{{app_module === 1?item:'标签'}}</el-tag>
        </div>
        <div class="mt20 clearfix">
          <div class="girl-rank clearfix">
            <el-rate v-model="girlData.gallery_rank" disabled :colors="['#7f6360', '#7f6360', '#7f6360']">>
            </el-rate>
          </div>
          <div class="girl-operate">
            <i @click="modifyGirlItem" class="el-icon-setting"></i>
            <el-popover placement="top" :visible-arrow="false" width="80" trigger="hover">
              <i v-if="girlData.gallery_net" v-clipboard:copy="girlData.gallery_net" v-clipboard:success="onCopy"
                v-clipboard:error="onError" title="复制链接" class="el-icon-share"></i>
              <i v-if="girlData.gallery_local" @click="openLoaclDir" title="本地文件" class="el-icon-document"></i>
              <i v-show="girlData.gallery_net || girlData.gallery_local" slot="reference" class="el-icon-download"></i>
            </el-popover>
            <i v-if="!girlData.gallery_net && !girlData.gallery_local" class="el-icon-download"></i>
            <el-popover placement="top" :visible-arrow="false" width="80" trigger="hover">
              <i v-if="girlDataType === 1" @click="mergeGirl" class="el-icon-folder-remove"></i>
              <i v-if="girlDataType !== 1" @click="moveGirlItem" class="el-icon-folder-remove"></i>
              <i @click="deleteGirlItem" class="el-icon-delete"></i>
              <i slot="reference" class="el-icon-menu"></i>
            </el-popover>
          </div>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  const ipc = require('electron').ipcRenderer
  import SvgIcon from '@/components/SvgIcon'
  export default {
    name: 'girlsitem',
    created() {
    },
    components: {
      SvgIcon
    },
    // girlDataType  1:大类 2:小类
    props: ['girlData', 'girlDataType'],
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
    data() {
      return {
        color: ['rgba(64,158,255,.1)', 'rgba(103,194,58,.1)', 'rgba(144,147,153,.1)', 'rgba(230,162,60,.1)',
          'rgba(245,108,108,.1)'
        ]
      }
    },
    methods: {
      // 获取小姐姐子项信息列表
      handleGirlitems() {
        if (this.girlDataType === 1) {
          this.$router.push({
            name: '详情',
            params: {
              id: this.girlData.gallery_id
            }
          })
        }
        return
      },
      // 点击tag标签搜索
      handleTagSearch(tag) {
        this.$emit('tag-search', tag)
      },
      // 是否设为最爱
      handleFavourite() {
        this.$emit('set-favourite', this.girlData)
      },
      // 修改小姐姐信息
      modifyGirlItem() {
        // 通知父组件 并传递数据
        this.$emit('modify-girl-data', this.girlData)
      },
      // 删除小姐姐
      deleteGirlItem() {
        // 通知父组件
        this.$emit('delete-girl-data', this.girlData)
      },
      // 打开本地文件夹
      openLoaclDir() {
        ipc.send('local-address-open', this.girlData.gallery_local)
      },
      // 打开更多预览
      moreViewer() {
        // 通知父组件打开
        this.$emit('more-item-viewer', this.girlData)
      },
      // 打开本地预览
      moreLocalViewer() {
        // 通知父组件打开
        this.$emit('more-item-viewer-local', this.girlData)
      },
      // 图集大类合并
      mergeGirl() {
        // 通知父组件打开
        this.$emit('merge-girl-data', this.girlData)
      },
      // 移动图集小类
      moveGirlItem() {
        // 通知父组件
        this.$emit('move-girl-data', this.girlData)
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
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-popover {
    min-width: 80px;
    text-align: center;

    i {
      cursor: pointer;
      font-size: 20px;
      transition: transform 0.3s ease 0s;

      &:hover {
        transform: scale(1.4);
      }
    }

    .el-icon-share {
      margin-right: 10px;
    }
    .el-icon-folder-remove {
      margin-right: 10px;
    }
  }

  .girl-item {
    .el-rate__icon {
      margin-right: 0px;
    }

    .el-tag--mini {
      margin-right: 3px;
    }

    .el-icon-setting {
      left: 0%;
    }

    .el-icon-download {
      transform: translateX(-50%);
      left: 50%;
    }

    .el-icon-menu {
      right: 0%;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  * {
    //禁止用户选中
    -webkit-user-select: none !important;
  }

  .icon-favourite {
    position: absolute;
    top: 1%;
    right: 3%;
    font-size: 20px;
    z-index: 10;
    cursor: pointer;
    color: #7f6360;
    transition: transform 0.3s ease 0s;

    &:hover {
      transform: scale(1.4);
    }
  }

  .icon-more {
    position: absolute;
    bottom: -20%;
    right: 4%;
    font-size: 16px;
    font-weight: 500;
    z-index: 10;
    cursor: pointer;
    color: #7f6360;
    transition: all 0.3s ease 0s;

    .pull-right-icon {
      margin-left: 5px;
      vertical-align: -0.25em;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .icon-more-local {
    position: absolute;
    bottom: -20%;
    left: 4%;
    font-size: 16px;
    font-weight: 500;
    z-index: 10;
    cursor: pointer;
    color: #7f6360;
    transition: all 0.3s ease 0s;
    .el-icon-monitor {
      margin-right: 4px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .mt20 {
    margin-top: 25px;
  }

  .girl {
    &-item {
      padding: 0 10px 10px 0;
    }

    &-image {
      width: 100%;
      display: block;
    }

    &-item-count {
      position: absolute;
      bottom: 1%;
      display: inline-block;
      width: 40px;
      text-align: center;
      background-color: #7f6360;
      right: 1%;
      font-size: 15px;
      color: #fff;
      transition: all 0.3s ease 0s;
    }

    &-item-list {
      overflow-y: auto;
      position: absolute;
      top: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      color: white;
      padding: 0 10px;
      transition: all 0.3s ease 0s;
      font-size: 15px;
      color: #7f6360;
      font-weight: 600;
      cursor: pointer;

      &::-webkit-scrollbar {
        width: 0 !important
      }

      & ul {
        list-style: none;
        padding: 0;

        & li {
          margin-bottom: 5px;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
      }
    }

    &-box:before {
      content: "";
      width: 150%;
      height: 150%;
      position: absolute;
      top: 50%;
      left: 50%;
      background: radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 15%) 0 0,
        radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 15%) 16px 16px,
        radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 0 1px,
        radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 16px 17px;
      background-size: 32px 32px;
      background-color: rgba(245, 245, 247, 0.8);
      opacity: 0;
      z-index: 1;
      transform: translate(-50%, -50%) scale(0);
      transition: all 0.56s ease 0s;
    }

    &-box:hover {
      &:before {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      img {
        transform: scale(1.2);
      }

      span {
        bottom: 90%;
        z-index: 1;
        font-weight: 700;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0);
        color: rgb(127, 99, 96);
      }

      .girl-item-count {
        bottom: 90%;
        z-index: 1;
      }

      .girl-item-list {
        top: 30px;
        z-index: 1;
      }

      .icon-more {
        bottom: 1%;
      }
      .icon-more-local {
        bottom: 1%;
      }
    }

    &-box {
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        transition: all 0.3s ease 0s;
      }

      span {
        position: absolute;
        bottom: 1%;
        left: 3%;
        font-size: 15px;
        background-color: #7f6360;
        padding: 0 10px;
        color: rgb(253, 253, 253);
        transition: all 0.3s ease 0s;
      }
    }

    &-tags {
      span {
        cursor: pointer;
      }

      &:hover {
        white-space: normal;
        text-overflow: clip;
        height: 120px;
        top: -90px;
        line-height: 24px;
      }

      position: absolute;
      height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      left: 0;
      top:0;
      right: 0;
      padding: 5px 5px 0 5px;
      background-color: rgba(255, 255, 255, .9);
      transition: all 0.3s ease 0s;
    }

    &-rank {
      display: inline-block;
      float: left;
      width: 56%;
    }

    &-operate {
      i {
        position: absolute;
        cursor: pointer;
        transition: transform 0.3s ease 0s;
      }

      i:hover {
        transform: scale(1.4);
      }

      .el-icon-download:hover {
        transform: translateX(-50%) scale(1.4);
      }

      position: relative;
      display: inline-block;
      float: right;
      width: 44%;
      text-align: right;
      font-size: 20px;
      color: rgb(127, 99, 96);
    }

  }
</style>