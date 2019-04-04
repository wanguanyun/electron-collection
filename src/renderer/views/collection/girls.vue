<template>
  <div class="girls-container">
    <el-row type="flex" justify="left">
      <el-form :inline="true" :model="formInline" size="mini">
        <el-form-item label="检索">
          <el-input v-model="formInline.queryname" placeholder="标题 / 标签"></el-input>
        </el-form-item>
        <el-form-item label="展示排序">
          <el-select v-model="formInline.querysort" placeholder="展示排序">
            <el-option label="标题首字母" value="1"></el-option>
            <el-option label="推荐星级" value="2"></el-option>
            <el-option label="修改时间" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">GKD</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible=true;addModifyButton='add'" icon="el-icon-circle-plus-outline">加个小姐姐</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div ref="girls_container" class="clearfix">
      <Girlsitem @modify-girl-data="modifyGirlbtn" v-for="(item,index) in girlLists" :key="index" :girl-data="item"></Girlsitem>
    </div>

    <el-row type="flex" justify="center">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentpage" :page-size="12"
        layout="prev, pager, next" :total="total">
      </el-pagination>
    </el-row>

    <el-dialog title="添加小姐姐" @close="addGirlInit" :visible.sync="dialogVisible" width="60%">
      <transition name="upload" enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOutLeft">
      <Girlsupload v-if="dialogVisible" :girl-data="modifyGirlData" ref="girlsupload" @modify-girl-data="handlemodifying" @add-girl-data="handleAdding"></Girlsupload>
      </transition>
      <span slot="footer">
        <el-button size="mini" type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="addModifyButton=='add'" size="mini" type="primary" :loading="handleAddingLoading" @click="handleAdd">新 增</el-button>
        <el-button v-if="addModifyButton=='modify'" size="mini" type="primary" :loading="handleAddingLoading" @click="handleModify">修 改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import axios from 'axios'
  import Girlsitem from '@/components/Girlsitem/index'
  import Girlsupload from '@/components/Girlsupload/index'
  import {
    getGirls,
    addGirl,
    modifyGirl
  } from '@/api/girl'

  export default {
    name: 'girls',
    components: {
      Girlsitem,
      Girlsupload
    },
    computed: {
      Base_url() {
        return process.env.BASE_API
      },
      ...mapGetters([
        'token'
      ]),
    },
    data() {
      return {
        //点击添加按钮loading
        handleAddingLoading: false,
        //新增/编辑按钮切换 add/modify
        addModifyButton:'',
        dialogVisible: false,
        formInline: {
          queryname: '',
          querysort: '1'
        },
        girlLists: [],
        total: 0,
        currentpage: 1,
        pagesize: 12,
        //需要编辑的Girlsitem数据
        modifyGirlData:[]
      }
    },
    methods: {
      modifyGirlbtn(param){
        this.addModifyButton = 'modify'
        this.modifyGirlData = param
        //打开编辑弹窗
        this.dialogVisible = true
      },
      // 确认添小姐姐按钮点击
      handleAdd() {
        //触发子组件内表单校验以及数据获取方法
        this.$refs.girlsupload.handleAdd()
      },
      // 确认修改姐姐按钮点击
      handleModify(){
         this.$refs.girlsupload.handleModify()
      },
      //新增-表单校验成功调取新增数据api
      handleAdding(param) {
        this.handleAddingLoading = true
        addGirl(param).then(res => {
          console.log(res)
          //新增按钮loading结束
          this.handleAddingLoading = false
          //关闭弹窗
          this.dialogVisible = false
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          });
          //获取列表数据
          this.fetchData()
        }).catch(err => {
          this.handleAddingLoading = false
        })
      },
      //编辑-表单校验成功调取编辑数据api
      handlemodifying(param){
        this.handleAddingLoading = true
        modifyGirl(param).then(res => {
          console.log(res)
          //新增按钮loading结束
          this.handleAddingLoading = false
          //关闭弹窗
          this.dialogVisible = false
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          });
          //获取列表数据
          this.fetchData()
        }).catch(err => {
          this.handleAddingLoading = false
        })
      },
      // 新增小姐姐弹窗关闭回调
      addGirlInit() {
        //清空信息
        this.modifyGirlData = []
        this.$refs.girlsupload.init()
        // this.$refs.girlsupload.handleReset()
      },
      // 检索按钮点击
      handleSearch() {
        this.fetchData()
      },
      // 分页切换事件
      handleCurrentChange(currentpage) {
        this.fetchData()
      },
      // 获取列表数据
      fetchData() {
        // 使用到ref需要到钩子函数里先挂载一下
        this.$mount()
        const loading = this.$loading({
          lock: true,
          target: this.$refs.girls_container,
          fullscreen: false,
          text: '好急呀....'
        })
        getGirls({
          ...this.formInline,
          currentpage: this.currentpage,
          pagesize: this.pagesize,
          gallerytype: '1'
        }).then(res => {
          loading.close()
          console.log(res)
          if (res.code === 200) {
            this.total = res.data.total
            this.girlLists = res.data.rows
          }
        })
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .girls-container {
    .el-input__inner {
      width: 150px;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      font-size: 14px;
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

    .el-button--primary:before,
    .el-button--primary:after {
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

    .el-button--info:before,
    .el-button--info:after {
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
      margin-top: 5px;
      border-top: 1px solid #7f6360;
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
    &-container {
      padding: 20px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>