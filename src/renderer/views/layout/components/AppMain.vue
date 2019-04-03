<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view class="main-class"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    }
  }
</script>

<style scoped>
  .main-class {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    left: 0;
    right: 0;
  }

  .main-class::-webkit-scrollbar {
    width: 10px;
  }

  .main-class::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #eee;
  }

  .main-class::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #5C5C5C;
  }
</style>