<template>
  <div class="dashboard-container">
    welcome!
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding:20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
