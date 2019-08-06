<template>
  <div class="dashboard-container">
    <transition name="upload" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
      <div class="dashboard-left" v-if="animate_visible">
        <div class="user-info">
          <a><img :src="avatar" /></a>
          <p class="user-name">欢迎{{name}}</p>
        </div>
        <div class="project-info">
          <a>
            <b>福利姬</b>
            <em>{{app_module === 1?gallery_count:'--'}}</em>
          </a>
          <a>
            <b>图集数</b>
            <em>{{app_module === 1?gallery_item_count:'--'}}</em>
          </a>
          <div class="arrow-shadow"></div>
        </div>
        <el-carousel height="450px">
          <el-carousel-item @click.native="carouselClick(item)" v-for="(item,index) in carousel_lists" :key="index">
            <el-image style="width: 100%;"
              :src="item.img_name && app_module === 1?`${Base_url}/img/${item.img_name}`:`${defaule_item_cover}`"
              fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
        <div class="try-button" @click="getDashBoardAllGallery">试试手气</div>
      </div>
    </transition>
    <div class="dashboard-right">
      <transition name="upload" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
        <div class="tag-list" v-if="animate_visible">
          <el-badge v-if="index <= 5" v-for="(item,index) in tagList" :key="index" :value="item.tagCount" class="item"
            type="warning">
            <el-tag @click.native="handleTagSearch(item.tagName)" style="margin-right:10px;" type="info">
              {{item.tagName}}</el-tag>
          </el-badge>
          <el-popover placement="right-start" title="更多标签" width="400" trigger="hover">
            <div>
              <el-link @click.native="handleTagSearch(item.tagName)" v-if="index > 5" style="margin-right:5px;"
                v-for="(item,index) in tagList" :key="index" type="warning">{{item.tagName}}</el-link>
            </div>
            <el-tag slot="reference" type="warning">更多<i class="el-icon-arrow-right el-icon--right"></i></el-tag>
          </el-popover>
          <div class="search">
            <input type="text" v-model="dashboardQuery" />
            <a @click="handleTagSearch(dashboardQuery)">搜索</a>
          </div>
        </div>
      </transition>
      <transition name="upload" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
        <el-divider content-position="left" v-if="animate_visible">推荐图集</el-divider>
      </transition>
      <transition name="upload" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
        <div class="tag-photo-list" v-if="animate_visible">
          <div class="tag-photo-first color1" @click="goAllGallery(1)"><i
              class="el-icon-picture"></i><span>所有<br />图集</span></div>
          <el-popover v-for="(item,index) in gallery_item_lists" popper-class="tag-photo-popover" :offset="-30"
            placement="right-start" width="200" trigger="click" :visible-arrow="false">
            <Girlsitem style="width: 200px;padding: 0;" :girl-data="item" :girl-data-type="2"
              @more-item-viewer="showMoreItemViewer" @set-favourite="handelFavourite" @tag-search="handleTagSearch">
            </Girlsitem>
            <div class="tag-photo" slot="reference">
              <el-image style="width: 100%;"
                :src="item.img_name && app_module === 1?`${Base_url}/img/${item.img_name}`:`${defaule_item_cover}`"
                fit="cover"></el-image>
              <div class="tag-photo-gallery-name">{{app_module === 1?item.gallery_item_name:'猜猜我是谁？'}}</div>
              <div class="tag-photo-gallery-subname">{{app_module === 1?item.gallery_name:'猜猜我是谁？'}}</div>
            </div>
          </el-popover>
        </div>
      </transition>
      <transition name="upload" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
        <el-divider content-position="left" v-if="animate_visible">福利姬</el-divider>
      </transition>
      <transition name="upload" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
        <div class="tag-photo-list" v-if="animate_visible">
          <div class="tag-photo-first color2" @click="goAllGallery(2)"><i
              class="el-icon-cherry"></i><span>所有<br />大类</span></div>
          <div class="tag-photo" v-for="(item,index) in gallery_lists" @click="goThisGallery(item.gallery_id)">
            <el-image style="width: 100%;"
              :src="item.img_name && app_module === 1?`${Base_url}/img/${item.img_name}`:`${defaule_cover}`"
              fit="cover"></el-image>
            <div class="tag-photo-gallery-subname">{{app_module === 1?item.gallery_name:'猜猜我是谁？'}}</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="images" style="display:none;" v-viewer="{movable: false}">
      <img v-for="(src,index) in images" :src="src" :key="index">
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import moment from 'moment'
  import {
    getProjectInfo,
  } from '@/api/setting'
  import {
    getDashboardTags,
    getHotGalleryItem,
    getHotGallery,
    getHotCarouselItem,
  } from '@/api/dashboard'
  import {
    getGirlItemViewers,
    setGirlitemFavourite,
  } from '@/api/girl'
  import Girlsitem from '@/components/Girlsitem/index'
  const ipc = require('electron').ipcRenderer

  export default {
    name: 'dashboard',
    components: {
      Girlsitem,
    },
    computed: {
      Base_url() {
        return process.env.BASE_API
      },
      ...mapGetters([
        'name',
        'roles',
        'avatar',
        'defaule_cover',
        'defaule_item_cover',
        'last_login_time',
        'app_module',
        'default_dashboard_item_number',
        'default_dashboard_number'
      ])
    },
    created() {
      getProjectInfo().then(res => {
        this.gallery_count = res.data.gallery_count
        this.gallery_item_count = res.data.gallery_item_count
        this.img_total_count = res.data.img_total_count
        this.img_total_size = res.data.img_total_size ? (parseFloat(res.data.img_total_size) / 1048576).toFixed(2) :
          0
      }).catch(() => {

      })
      //获取热门标签
      getDashboardTags().then(res => {
        this.tagList = res.data
      }).catch(() => {})
      //获取轮播图 图集小类 大类列表
      this.getDashBoardAllGallery()
      // ipc.send('test-get-moive', 'E:\\my_collection\\由衣酱(小唯)\\粉红私服')
    },
    mounted() {
      this.animate_visible = true
      const _this = this // 声明一个变量指向Vue实例this，保证作用域一致
      // this.timer = setInterval(() => {
      //   _this.nowTime = moment(new Date()).format("HH:mm:ss") // 修改数据date
      // }, 1000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    data() {
      return {
        animate_visible: false,
        tagList: [],
        gallery_item_lists: [],
        gallery_lists: [],
        carousel_lists: [],
        images: [],
        dashboardQuery: '',
        gallery_count: 0,
        gallery_item_count: 0,
        img_total_count: 0,
        img_total_size: 0,
        activeName: 'second',
        nowTime: moment(new Date()).format("HH:mm:ss")
      }
    },
    methods: {
      getDashBoardAllGallery() {
        //获取图集小类列表
        let query1 = getHotGalleryItem({
          gallery_item_num: this.default_dashboard_item_number
        })
        //获取图集大类列表
        let query2 = getHotGallery({
          gallery_num: this.default_dashboard_number
        })
        let query3 = getHotCarouselItem()
        Promise.all([query1, query2, query3]).then((res) => {
          this.gallery_item_lists = []
          for (let i = 0; i < res[0].data.length; i++) {
            setTimeout(() => {
              this.gallery_item_lists.push({
                create_time: res[0].data[i].create_time,
                gallery_id: res[0].data[i].gallery_id,
                gallery_item_id: res[0].data[i].gallery_item_id,
                gallery_cover: res[0].data[i].gallery_item_cover,
                gallery_del_flag: res[0].data[i].gallery_item_del_flag,
                gallery_detail: res[0].data[i].gallery_item_detail,
                gallery_local: res[0].data[i].gallery_item_local,
                gallery_name: res[0].data[i].gallery_item_name,
                gallery_item_name: res[0].data[i].gallery_name,
                gallery_net: res[0].data[i].gallery_item_net,
                gallery_rank: res[0].data[i].gallery_item_rank,
                gallery_tag: res[0].data[i].gallery_item_tag,
                img_detail: res[0].data[i].img_detail,
                img_id: res[0].data[i].img_id,
                img_name: res[0].data[i].img_name,
                img_size: res[0].data[i].img_size,
                if_favourite: res[0].data[i].if_favourite
              })
            }, i * 80)
          }
          this.gallery_lists = []
          for (let i = 0; i < res[1].data.length; i++) {
            setTimeout(() => {
              this.gallery_lists.push(res[1].data[i])
            }, i * 80)
          }
          this.carousel_lists = res[2].data
        }).catch(() => {})
      },
      //所有图集&所有大类跳转
      goAllGallery(flag) {
        if (flag == 1) {
          this.$router.push({
            name: '所有图集'
          })
        } else if (flag == 2) {
          this.$router.push({
            name: '福利姬'
          })
        }
      },
      //图集大类点击进入所有小类
      goThisGallery(gallerId) {
        this.$router.push({
          name: '详情',
          params: {
            id: gallerId
          }
        })
      },
      //幻灯片点击事件
      carouselClick(param) {
        this.$router.push({
          name: '详情',
          params: {
            id: param.gallery_id
          }
        })
      },
      // 展示图集小类更多图片预览
      showMoreItemViewer(param) {
        const that = this
        this.images = []
        getGirlItemViewers(param).then(res => {
          for (const item of res.data) {
            that.images.push(that.Base_url + '/img/' + item.img_name)
          }
          setTimeout(() => {
            const viewer = that.$el.querySelector('.images').$viewer
            viewer.show()
          }, 200)
        }).catch(() => {})
      },
      // 设为喜欢
      handelFavourite(param) {
        setGirlitemFavourite(param).then(res => {
          let index = null
          for (let i = 0; i < this.gallery_item_lists.length; i++) {
            if (this.gallery_item_lists[i].gallery_item_id === res.data.gallery_item_id) {
              index = i
              this.gallery_item_lists[i].if_favourite = res.data.if_favourite
              break
            }
          }
          if (index) {
            this.$set(this.gallery_item_lists, index, this.gallery_item_lists[index])
          }
        }).catch(() => {})
      },
      // 点击标签检索
      handleTagSearch(tag) {
        this.$router.push({
          name: '所有图集',
          params: {
            queryname: tag
          }
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .dashboard-container {
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    .el-carousel__button {
      width: 18px;
      background-color: #7f6360;
    }

    .tag-list {
      .el-tag--info {
        background-color: rgba(127, 99, 96, 0.9);
        border-color: rgba(127, 99, 96, 0.1);
      }

      .el-tag--warning {
        background-color: rgba(230, 162, 60, 0.9);
        border-color: rgba(230, 162, 60, 0.1);
      }

      .el-tag--info,
      .el-tag--warning,
      .el-tag--info .el-tag__close,
      .el-tag--warning .el-tag__close {
        color: #fff;
      }

      .el-tag {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-right: 5px;
        border-radius: 0px;
        cursor: pointer;
        font-size: 16px;
        transition: 400ms ease all;
        height: 28px;
        line-height: 28px;

        &:hover {
          animation: pulse 1s;
        }
      }

      .el-badge__content.is-fixed {
        right: 28px;
      }
    }

    .tag-photo {
      .el-image {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      transition: 400ms ease transform;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .el-divider__text.is-left {
      font-size: 18px;
      background: rgba(0, 0, 0, 0);
      color: #7f6360;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    padding: 20px;
    display: flex;
    align-items: flex-start;

    .dashboard-left {
      width: 300px;
      text-align: center;
      flex-shrink: 0;

      .user-info {
        margin-bottom: 10px;
        box-shadow: 0 0 3px rgba(0, 0, 0, .1);
        background: #fff;
        overflow-x: hidden;
        text-align: center;
        height: 140px;

        &:hover>a,
        &:hover>p {
          animation: shake 1s;
        }

        &>a {
          display: inline-block;
          margin-top: 10px;
          width: 100px;
          height: 100px;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: -26px;
            left: 50%;
            transform: translateX(-50%);
            width: 110px;
            height: 110px;
            background: url('../../assets/toushi.png') no-repeat 50% 50% /110%;
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .user-name {
          font-size: 16px;
          color: #34495e;
          font-weight: bold;
          margin-top: 5px;
          padding: 0 5px;
          height: 0px;
        }
      }

      .project-info {
        height: 50px;
        margin-bottom: 10px;
        background-color: #fff;
        box-shadow: 0 0 3px rgba(0, 0, 0, .1);
        position: relative;

        &>a {
          height: 49px;
          position: relative;
          z-index: 6;
          display: block;
          width: 50%;
          background-color: #fff;
          text-align: center;
          color: #acbbc6;
          font-size: 14px;
          border-bottom: 1px solid #fff;
          float: left !important;

          &:nth-of-type(1) {
            border-right: 1px solid #eff3f5;
          }

          b {
            width: 100%;
            display: block;
            padding-top: 5px;
            line-height: 1.5;
          }

          em {
            font-family: Digital_Regular;
            margin-top: -2px;
            line-height: 1.5;
            overflow: hidden;
            font-size: 18px;
            height: 20px;
            width: 99%;
            display: block;
            color: #34495e;
          }
        }

        .arrow-shadow {
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 3;
          background-color: #fff;
          width: 20px;
          height: 20px;
          box-shadow: 0 0 3px rgba(0, 0, 0, .1);
          transform: rotate(45deg);
        }
      }

      .try-button {
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 10px;
        background: #909399;
        color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 800ms ease all;

        &:hover {
          background: #7f6360;
        }
      }
    }

    .dashboard-right {
      flex-grow: 2;
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .search {
        display: inline-block;
        float: right;
        margin-right: 100px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        &>input {
          display: inline-block;
          width: 150px;
          height: 28px;
          border: 1px solid #7f6360;
          color: #7f6360;
          text-indent: 12px;
          font-weight: bold;
          padding: 0;
          border-radius: 2px;
        }

        &>a {
          display: inline-block;
          width: 90px;
          height: 28px;
          background-color: #7f6360;
          color: white;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          margin-left: -5px;
          line-height: 28px;

          &:hover {
            animation: pulse 1s;
          }
        }
      }

      .tag-list {
        width: 100%;
        height: 34px;
      }

      .tag-photo-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        .color1 {
          background: rgba(230, 162, 60, 0.8);
        }

        .color2 {
          background: rgba(245, 108, 108, 0.8);
        }

        .tag-photo-first {
          width: 200px;
          height: 130px;
          margin-right: 5px;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          margin-bottom: 8px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          transition: 400ms ease transform;

          &:hover {
            transform: translateY(-5px);
          }

          &>i {
            font-size: 80px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
          }

          &>span {
            position: absolute;
            font-size: 24px;
            left: 60%;
            top: 50%;
            transform: translateY(-50%);
            font-weight: bold;
            color: #fff;
            letter-spacing: 3px;
          }
        }

        .tag-photo {
          width: 150px;
          height: 130px;
          background: #ccc;
          margin-right: 5px;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          margin-bottom: 8px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

          .tag-photo-gallery-name {
            position: absolute;
            background: #ccc;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            color: #7f6360;
            padding: 2px 5px 2px 5px;
          }

          .tag-photo-gallery-subname {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            background: #ccc;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            color: #fff;
            padding: 2px 5px 2px 5px;
          }
        }
      }
    }
  }
</style>