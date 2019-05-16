<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 左屏 -->
        <div class="dashboard-left-top">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :lg="3" :xl="2">
              <div class="item-square"></div>
              <span class="item-square-type">福利姬</span>
              <el-tooltip :visible-arrow="false" popper-class="dashboard-tooltip" effect="light" content="我的测试用户测试用户"
                placement="bottom">
                <span class="item-square-title">我的测试用户测试用户</span>
              </el-tooltip>
              <div class="item-avatar">
                <el-image style="width: 100%; height: auto" :src="avatar" fit="cover"></el-image>
              </div>
            </el-col>
            <el-col :lg="3" :xl="2">
              <div class="item-square"></div>
              <span class="item-square-type">福利姬</span>
              <el-tooltip :visible-arrow="false" popper-class="dashboard-tooltip" effect="light" content="我的测试用户测试用户"
                placement="bottom">
                <span class="item-square-title">我的测试用户测试用户</span>
              </el-tooltip>
              <div class="item-avatar">
                <el-image style="width: 100%; height: auto" :src="avatar" fit="cover"></el-image>
              </div>
            </el-col>
            <el-col :lg="3" :xl="2">99</el-col>
            <el-col :lg="3" :xl="2">99</el-col>
            <el-col :lg="3" :xl="2">99</el-col>
            <el-col :lg="3" :xl="2">99</el-col>
            <el-col :lg="3" :xl="2">99</el-col>
            <el-col :lg="3" :xl="2">99</el-col>
          </el-row>
        </div>
        <div class="dashboard-left-middle">

        </div>
        <div class="dashboard-left-bottom">

        </div>
      </el-col>
      <el-col :span="6">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'avatar'
      ])
    }
  }
</script>
<style>

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      padding: 20px;

      .dashboard-left-top {
        .el-col-lg-3 {
          margin-right: 10px;
          background-color: #f5f5f7;
          height: 120px;
          position: relative;
          transition: box-shadow 0.3s ease 0s;

          &:hover, .item-square {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
          }
          &:hover .item-square {
            height: 8px;
            width: 100%;
            top: 11px;
            transform: translateY(-10px);
          }
          &:hover .item-avatar {
            top: 32%;
            transform: translateX(-50%) scale(1.2);
          }
          &:hover .item-square-type{
            top: 11px;
            left: 66px;
          }
          &:hover .item-square-title{
            transform: scale(1.1);
          }
          .item-square {
            width: 20px;
            height: 13px;
            left: -5px;
            top: 15px;
            background-color: #7f6360;
            position: absolute;
            transition: all 0.3s ease 0s;
          }

          .item-avatar {
            cursor: pointer;
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            transform: translateX(-50%);
            top: 37%;
            border-radius: 50%;
            overflow: hidden;
            transition: all 0.3s ease 0s;
          }
          .item-square-type {
            color: #7f6360;
            cursor: pointer;
            position: absolute;
            font-size: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            top: 13px;
            left: 22px;
            width: 70%;
            transition: all 0.3s ease 0s;
          }

          .item-square-title {
            color: #7f6360;
            cursor: pointer;
            position: absolute;
            font-size: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            bottom: 3px;
            text-align: center;
            margin-left: -10px;
            transition: all 0.3s ease 0s;
          }
        }
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>