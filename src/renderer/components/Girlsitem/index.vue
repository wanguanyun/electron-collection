<template>
  <el-col class="girl-item" :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
    <el-card shadow="always" :body-style="{ padding: '0px' }">
      <div class="girl-box">
        <img :src="Base_url+'/img/'+girlData.img_name" class="girl-image">
        <span v-text="girlData.gallery_name"></span>
        <div class="girl-item-count">11</div>
      </div>
      <div class="clearfix" style="padding: 5px;position:relative">
        <div class="girl-tags clearfix">
          <el-tag v-for="(item,index) in girlData.gallery_tag.split(',')" :key="index" :color="color[index%5]"
            size="mini" type="info">{{item}}</el-tag>
        </div>
        <div class="mt20 clearfix">
          <div class="girl-rank clearfix">
            <el-rate v-model="girlData.gallery_rank" disabled :colors="['#7f6360', '#7f6360', '#7f6360']">>
            </el-rate>
          </div>
          <div class="girl-operate">
            <i class="el-icon-setting"></i>
            <i class="el-icon-news"></i>
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
  export default {
    name: 'girlsitem',
    created() {

    },
    props: ['girlData'],
    computed: {
      Base_url() {
        return process.env.BASE_API
      }
    },
    data() {
      return {
        color: ['rgba(64,158,255,.1)', 'rgba(103,194,58,.1)', 'rgba(144,147,153,.1)', 'rgba(230,162,60,.1)',
          'rgba(245,108,108,.1)'
        ]
      }
    },
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
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

    .el-icon-news {
      transform: translateX(-50%);
      left: 50%;
    }

    .el-icon-download {
      right: 0%;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
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
        color: rgb(127, 99, 96);
      }

      .girl-item-count {
        bottom: 90%;
        z-index: 1;
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
        font-size: 16px;
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

      .el-icon-news:hover {
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