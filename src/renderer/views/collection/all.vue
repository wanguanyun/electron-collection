<template>
  <div class="girls-item-container">
    <el-row type="flex" justify="left">
      <el-form :inline="true" size="mini">
        <el-form-item label="检索">
          <el-input v-model="queryname" v-on:keyup.enter.native="handleSearch" clearable placeholder="标题 / 标签"></el-input>
        </el-form-item>
        <el-form-item label="展示排序">
          <el-select v-model="querysort" placeholder="展示排序">
            <el-option @click.native="handleSearch" label="标题首字母" value="1"></el-option>
            <el-option @click.native="handleSearch" label="推荐星级" value="2"></el-option>
            <el-option @click.native="handleSearch" label="修改时间" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">GKD</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div ref="girls_container" class="clearfix">
      <transition-group tag="div" enter-active-class="animated fadeIn">
        <Girlsitem @more-item-viewer-local="showMoreItemViewerLocal" @more-item-viewer="showMoreItemViewer"
          @set-favourite="handelFavourite" @tag-search="handleTagSearch" @delete-girl-data="deleteGirlbtn"
          @move-girl-data="moveGirlData" @modify-girl-data="modifyGirlbtn" v-for="(item,index) in girlLists"
          :key="index" :girl-data="item" :girl-data-type="2"></Girlsitem>
      </transition-group>
    </div>

    <el-row type="flex" justify="center">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentpage" :page-size="12"
        layout="prev, pager, next" :total="total">
      </el-pagination>
    </el-row>

    <el-dialog :close-on-click-modal="false" :title="addModifyButton=='add'?'添加小姐姐':'编辑小姐姐'" @close="addGirlInit"
      :visible.sync="dialogVisible" width="60%">
      <transition name="upload" enter-active-class="animated fadeIn" leave-active-class="animated fadeOutLeft">
        <Girlsupload v-if="dialogVisible" :girl-data="modifyGirlData" :girl-viewer-data="modifyGirlItemViewers"
          :girl-data-type="2" ref="girlsupload" @modify-girl-data="handlemodifying" @add-girl-data="handleAdding">
        </Girlsupload>
      </transition>
      <span slot="footer">
        <el-button size="mini" type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="addModifyButton=='add'" size="mini" type="primary" :loading="handleAddingLoading"
          @click="handleAdd">新 增</el-button>
        <el-button v-if="addModifyButton=='modify'" size="mini" type="primary" :loading="handleAddingLoading"
          @click="handleModify">修 改</el-button>
      </span>
    </el-dialog>

    <el-dialog title="合并小姐姐" :close-on-click-modal="false" @close="combineGirlId = '';handleCombineLoading = false;"
      :visible.sync="dialogVisible2" width="35%">
      <div>
        <span class="dialogTip">请选择需要合并到的图集大类</span>
        <el-select class="girlName" v-model="combineGirlId" filterable clearable placeholder="请选择">
          <el-option-group v-for="group in girlCombineLists" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <span slot="footer">
        <el-button size="mini" type="primary" :disabled="combineGirlId == '' || !combineGirlId"
          :loading="handleCombineLoading" @click="handleCombine">移 动</el-button>
      </span>
    </el-dialog>
    <div class="images" style="display:none;" v-viewer="{movable: false}">
      <img v-for="(src,index) in images" :src="src" :key="index">
    </div>
    <el-drawer custom-class="pic-drawer" :title="drawerTitleName+' (图片>2MB默认不展示)'" :visible.sync="drawer"
      direction="btt" size="80%">
      <el-divider v-if="videoList.length !== 0">
        <i class="el-icon-video-camera"></i></el-divider>
      <div class="video-cover" @click="showVideo(item)" v-for="(item,index) in videoList" :key='"vide"+index'><i
          class="el-icon-video-play"></i>
        <p>{{item.filename}}</p>
      </div>
      <el-divider v-if="imgList.length !== 0"><i class="el-icon-picture-outline"></i></el-divider>
      <el-image @click="showOriginPic(imgList,index)" v-for="(item,index) in imgList" :key="index" style="height:230px;"
        fit="contain" :src="item.url">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>加载中...</span>
        </div>
      </el-image>
    </el-drawer>
    <el-dialog :visible.sync="showVideoPreview" :close-on-press-escape="false" :destroy-on-close="true" width="1000px"
      custom-class="video-preview-dialog">
      <div id="videoPreview" class="video-preview"></div>
    </el-dialog>
  </div>
</template>

<script>
  import Girlsitem from '@/components/Girlsitem/index'
  import Girlsupload from '@/components/Girlsupload/index'
  import {
    getAllGirlitems,
    addGirlitem,
    modifyGirlitem,
    deleteGirlitem,
    setGirlitemFavourite,
    getGirlItemViewers,
    getGirlCombineLists,
    moveGirlItem
  } from '@/api/girl'

  import 'dplayer/dist/DPlayer.min.css'
  import DPlayer from 'dplayer'
  const ipc = require('electron').ipcRenderer
  export default {
    name: 'girls',
    components: {
      Girlsitem,
      Girlsupload
    },
    created() {
      if (this.$route.params.queryname) {
        this.queryname = this.$route.params.queryname
      } else {
        this.queryname = ''
      }
      this.fetchData()
    },
    mounted: function() {
      this.$nextTick(() => {
        // Register IPC Renderer event handles once for this control
        // 监听主进程的返回
        ipc.on('test-get-moive-reply', (e, args) => {
          this.imgList = []
          this.videoList = []
          console.log(args)
          for (let i = 0; i < args.length; i++) {
            if (args[i].type === 'img') {
              this.imgList.push({
                url: (args[i].path + '\\' + args[i].filename).replace(/\\/g, '\\\\')
              })
            } else {
              this.videoList.push({
                filename: args[i].filename,
                url: (args[i].path + '\\' + args[i].filename).replace(/\\/g, '\\\\')
              })
            }
          }
          this.images = this.imgList.map(item => {
            return item.url
          })
        })
      })
    },
    computed: {
      Base_url() {
        return process.env.BASE_API
      },
      querysort: {
        get: function() {
          return this.$store.state.setting.querysort
        },
        set: function(v) {
          this.$store.commit('SET_QUERYSORT', v)
        }
      },
      queryname: {
        get: function() {
          return this.$store.state.setting.queryname
        },
        set: function(v) {
          this.$store.commit('SET_QUERYNAME', v)
        }
      }
    },
    data() {
      return {
        // 点击添加按钮loading
        handleAddingLoading: false,
        // 合并图集按钮loading
        handleCombineLoading: false,
        // 新增/编辑按钮切换 add/modify
        addModifyButton: '',
        dialogVisible: false,
        // 合并小姐姐弹窗
        dialogVisible2: false,
        girlLists: [],
        total: 0,
        currentpage: 1,
        pagesize: 12,
        // 需要编辑的Girlsitem数据
        modifyGirlData: [],
        // 需要移动的Girlitem数据
        moveGirlItemData: null,
        // girlItem的预览图
        modifyGirlItemViewers: [],
        images: [],
        // 需要合并的大类名称
        combineGirlId: '',
        // 合并图集的下拉框数据
        girlCombineLists: [{
          label: '福利姬',
          options: []
        }, {
          label: '图集',
          options: []
        },
        {
          label: '其他',
          options: []
        }
        ],
        drawer: false,
        drawerTitleName: '',
        imgList: [],
        videoList: [],
        showVideoPreview: false
      }
    },
    methods: {
      showVideo(param) {
        this.showVideoPreview = true
        setTimeout(() => {
          const dp = new DPlayer({
            container: document.getElementById('videoPreview'),
            autoplay: true,
            video: {
              url: param.url
            }
          })
          dp.on('fullscreen', function() {
            dp.fullScreen.cancel('browser')
          })
        }, 200)
      },
      modifyGirlbtn(param) {
        this.addModifyButton = 'modify'
        this.modifyGirlData = param
        // 实时获取图集小类的图片预览集
        this.modifyGirlItemViewers = []
        getGirlItemViewers(param).then(res => {
          for (const item of res.data) {
            this.modifyGirlItemViewers.push(item)
          }
        }).catch(() => {})
        // 打开编辑弹窗
        this.dialogVisible = true
      },
      deleteGirlbtn(param) {
        this.$confirm('是否确定删除, 是否继续?', '嗯???', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGirlitem(param).then(res => {
            // 关闭弹窗
            this.$notify({
              title: '成功',
              message: res.data,
              type: 'success'
            })
            // 获取列表数据
            this.fetchData()
          })
        }).catch(() => {})
      },
      // 设为喜欢
      handelFavourite(param) {
        setGirlitemFavourite(param).then(res => {
          let index = null
          for (let i = 0; i < this.girlLists.length; i++) {
            if (this.girlLists[i].gallery_item_id === res.data.gallery_item_id) {
              index = i
              this.girlLists[i].if_favourite = res.data.if_favourite
              break
            }
          }
          if (index) {
            this.$set(this.girlLists, index, this.girlLists[index])
          }
        }).catch(() => {})
      },
      // 移动图集小类
      moveGirlData(param) {
        this.moveGirlItemData = param
        // 合并图集小类归属
        this.dialogVisible2 = true
        // 查询图集大类列表
        getGirlCombineLists({
          galleryId: param.gallery_id
        }).then(res => {
          console.log(res)
          for (const type of this.girlCombineLists) {
            // 初始化清空
            type.options = []
            for (const item of res.data) {
              if (type.label === '福利姬' && item.gallery_type === 1) {
                type.options.push({
                  value: item.gallery_id,
                  label: item.gallery_name
                })
              }
              if (type.label === '图集' && item.gallery_type === 2) {
                type.options.push({
                  value: item.gallery_id,
                  label: item.gallery_name
                })
              }
              if (type.label === '其他' && item.gallery_type === 3) {
                type.options.push({
                  value: item.gallery_id,
                  label: item.gallery_name
                })
              }
            }
          }
        }).catch((err) => {
          this.$notify({
            title: '错误！',
            message: err,
            type: 'warning'
          })
          return
        })
      },
      handleCombine() {
        this.handleCombineLoading = true
        if (this.combineGirlId) {
          moveGirlItem({
            ...this.moveGirlItemData,
            combineGirlId: this.combineGirlId
          }).then(res => {
            // 关闭弹窗
            this.handleCombineLoading = false
            this.dialogVisible2 = false
            this.$notify({
              title: '成功',
              message: res.data,
              type: 'success'
            })
            // 获取列表数据
            this.fetchData()
          }).catch(() => {
            this.handleCombineLoading = false
          })
        }
      },
      // 确认添小姐姐按钮点击
      handleAdd() {
        // 触发子组件内表单校验以及数据获取方法
        this.$refs.girlsupload.handleAdd(this.$route.params.id)
      },
      // 确认修改姐姐按钮点击
      handleModify() {
        this.$refs.girlsupload.handleModify()
      },
      // 新增-表单校验成功调取新增数据api
      handleAdding(param) {
        this.handleAddingLoading = true
        addGirlitem(param).then(res => {
          // 新增按钮loading结束
          this.handleAddingLoading = false
          // 关闭弹窗
          this.dialogVisible = false
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          })
          // 获取列表数据
          this.fetchData()
        }).catch(() => {
          this.handleAddingLoading = false
        })
      },
      // 编辑-表单校验成功调取编辑数据api
      handlemodifying(param) {
        this.handleAddingLoading = true
        modifyGirlitem(param).then(res => {
          // 新增按钮loading结束
          this.handleAddingLoading = false
          // 关闭弹窗
          this.dialogVisible = false
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          })
          // 获取列表数据
          this.fetchData()
        }).catch(() => {
          this.handleAddingLoading = false
        })
      },
      // 新增小姐姐弹窗关闭回调
      addGirlInit() {
        // 清空信息
        this.modifyGirlData = []
        this.$refs.girlsupload.init()
        // this.$refs.girlsupload.handleReset()
      },
      // 返回上一级
      goback() {
        this.$router.back()
      },
      // 点击标签检索
      handleTagSearch(tag) {
        this.queryname = tag
        this.fetchData()
      },
      // 检索按钮点击
      handleSearch() {
        this.fetchData()
      },
      // 分页切换事件
      handleCurrentChange(currentpage) {
        this.fetchData()
      },
      // 展示本地图片预览
      showMoreItemViewerLocal(param) {
        this.drawer = true
        this.drawerTitleName = param.gallery_name
        ipc.send('test-get-moive', param.gallery_local)
      },
      showOriginPic(param, index) {
        const that = this
        setTimeout(() => {
          const viewer = that.$el.querySelector('.images').$viewer
          viewer.show()
          viewer.view(index)
        }, 200)
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
      // 获取列表数据
      fetchData() {
        this.girlLists = []
        // 使用到ref需要到钩子函数里先挂载一下
        this.$mount()
        const loading = this.$loading({
          lock: true,
          target: this.$refs.girls_container,
          fullscreen: false,
          text: '好急呀....'
        })
        getAllGirlitems({
          queryname: this.queryname,
          querysort: this.querysort,
          currentpage: this.currentpage,
          pagesize: this.pagesize
        }).then(res => {
          loading.close()
          if (res.code === 200) {
            this.total = res.data.total
            for (let i = 0; i < res.data.rows.length; i++) {
              setTimeout(() => {
                this.girlLists.push({
                  create_time: res.data.rows[i].create_time,
                  gallery_id: res.data.rows[i].gallery_id,
                  gallery_item_id: res.data.rows[i].gallery_item_id,
                  gallery_cover: res.data.rows[i].gallery_item_cover,
                  gallery_del_flag: res.data.rows[i].gallery_item_del_flag,
                  gallery_detail: res.data.rows[i].gallery_item_detail,
                  gallery_local: res.data.rows[i].gallery_item_local,
                  gallery_name: res.data.rows[i].gallery_item_name,
                  gallery_net: res.data.rows[i].gallery_item_net,
                  gallery_rank: res.data.rows[i].gallery_item_rank,
                  gallery_tag: res.data.rows[i].gallery_item_tag,
                  img_detail: res.data.rows[i].img_detail,
                  img_id: res.data.rows[i].img_id,
                  img_name: res.data.rows[i].img_name,
                  img_size: res.data.rows[i].img_size,
                  if_favourite: res.data.rows[i].if_favourite
                })
              }, i * 80)
            }
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .girls-item-container {
    .el-input__inner {
      width: 150px;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      font-size: 14px;
    }

    .combine-girl-check {
      .el-checkbox__label {
        font-size: 16px;
        color: #7f6360;
      }

      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: red;
      }
    }

    .girlName {
      .el-input__inner {
        width: 190px;
        color: #7f6360;
        font-size: 18px;
      }
    }

    .el-form-item__label {
      font-size: 14px;
    }

    .el-button--primary {
      background-color: rgb(127, 99, 96);
      border: none;
      color: #fff;
      position: relative;
      transition: 800ms ease all;
      outline: none;

      &:hover {
        background: #fff;
        color: rgb(127, 99, 96);
      }
    }

    .el-button--info {
      border: none;
      color: #fff;
      position: relative;
      transition: 800ms ease all;
      outline: none;

      &:hover {
        background: #fff;
        color: #c8c9cc;
      }
    }

    .el-button:before,
    .el-button:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: rgb(127, 99, 96);
      ;
      transition: 400ms ease all;
    }

    .el-button:after {
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }

    .el-button:hover:before,
    .el-button:hover:after {
      width: 100%;
      transition: 800ms ease all;
    }


    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #7f6360;
    }

    .el-pagination.is-background .el-pager li:not(.disabled):hover {
      color: #7f6360;
    }

    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background-color: rgba(0, 0, 0, 0);
    }

    .el-pagination {
      position: fixed;
      right: 27px;
      transform: rotate(90deg) translateX(50%);
      top: 50%;
      transform-origin: right;
    }

    .el-pagination.is-background .el-pager li {
      transform: rotate(-90deg);
    }

    .el-dialog__header {
      border-bottom: 1px solid rgb(127, 99, 96);
    }

    .el-dialog__footer {
      border-top: 1px solid rgb(127, 99, 96);
    }

    .el-dialog__title {
      color: rgb(127, 99, 96);
    }

    .video-preview-dialog {
      .el-dialog__body {
        background: #606266;
        padding: 0;
      }

      .el-dialog__header {
        padding: 0;
      }
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

  .girls {
    &-item-container {
      padding: 20px 25px 20px 20px;
      overflow-y: scroll;

      .dialogTip {
        font-size: 18px;
        color: #E6A23C;
      }

      .video-preview {
        width: 100%;
        height: 460px;
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>