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
          <el-button type="primary" @click="dialogVisible=true" icon="el-icon-circle-plus-outline">加个小姐姐</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div ref="girls_container" class="clearfix">
      <Girlsitem v-for="(item,index) in girlLists" :key="index" :girl-data="item"></Girlsitem>
    </div>

    <el-row type="flex" justify="center">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentpage" :page-size="12"
        layout="prev, pager, next" :total="total">
      </el-pagination>
    </el-row>

    <el-dialog title="添加小姐姐" @closed="addGirlInit" :visible.sync="dialogVisible" width="60%">
      <Girlsupload ref="girlsupload"></Girlsupload>
      <span slot="footer">
        <el-button size="mini" type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd">新 增</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Girlsitem from '@/components/Girlsitem/index'
  import Girlsupload from '@/components/Girlsupload/index'
  import {
    getGirls
  } from '@/api/girl'

  export default {
    name: 'girls',
    components: {
      Girlsitem,
      Girlsupload
    },
    data() {
      return {
        dialogVisible: false,
        formInline: {
          queryname: '',
          querysort: '1'
        },
        girlLists: [],
        total: 0,
        currentpage: 1,
        pagesize: 12
      }
    },
    methods: {
      // 确认添小姐姐
      handleAdd() {
        this.$refs.girlsupload.handleAdd()
      },
      // 新增小姐姐弹窗关闭回调
      addGirlInit() {
        this.$refs.girlsupload.init()
        this.$refs.girlsupload.handleReset()
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