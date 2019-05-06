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
        'token',
      ])
    },
    created() {
      //监听菜单栏设置按钮
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
</style>