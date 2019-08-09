<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  const ipcRenderer = require('electron').ipcRenderer
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    created() {
      // 监听菜单栏设置按钮
      ipcRenderer.on('goSetting', (event, files) => {
        if (this.token) {
          this.$router.push({
            path: '/setting'
          })
        } else {
          this.$router.push({
            path: '/login'
          })
        }
      })
    }
  }
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
  .dashboard-tooltip {
    border: 0 !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
    margin-bottom:5px !important;
    color: #7f6360;
    font-size: 15px;
  }
  .tag-photo-popover {
    padding:0;
  }
  .viewer-container {
    //图片预览 需要在抽屉窗口之上
    z-index:99999999 !important;
  }
  .pic-drawer {
    .el-drawer__body {
      height: 230px;
      padding-bottom: 8px;
      padding-left: 8px;
      overflow-y: auto;
      .el-image {
        margin-right: 5px;
      }
    }
    .el-drawer__header {
      margin-bottom: 15px;
      padding:10px 20px 0;
    }
    .el-image__error, .el-image__inner, .el-image__placeholder {
      width:auto;
    }
  }
</style>