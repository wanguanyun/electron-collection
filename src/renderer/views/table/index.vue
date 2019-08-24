<template>
  <div class="app-container">
    <div class="test-video" id="testvideo"></div>
  </div>
</template>

<script>

import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
// http://static.smartisanos.cn/common/video/t1-ui.mp4
export default {
  data() {
    return {

    }
  },
  filters: {

  },
  created() {
  },
  mounted() {
    const dp = new DPlayer({
      container: document.getElementById('testvideo'),
      video: {
        url: 'E:\\my_collection\\森萝财团\\BETA-015\\BETA-015-X.mp4'
      }
    })
    dp.on('fullscreen', function() {
      // document.getElementById('testvideo').style.width = '100%'
      //   document.getElementById('testvideo').style.height = '100%'
      //   dp.fullScreen.request('web');
      dp.fullScreen.cancel('browser')
    // setTimeout(() => {
    //   dp.fullScreen.request('web');
    // }, 1000);
    // console.log('player ended');
    })
    // dp.on('fullscreen_cancel', function () {
    //   console.log(param)
    //     console.log('player ended');
    //     document.getElementById('testvideo').style.width = '700px'
    //     document.getElementById('testvideo').style.height = '300px'
    // });
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .test-video {
    position: fixed;
    height: 300px;
    width: 700px;
    background: skyblue;
    left:50%;
    transform: translateX(-50%);
  }
</style>
