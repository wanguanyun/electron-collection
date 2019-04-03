<template>
  <div class="add-girl-container">
    <el-row>
      <el-col :span="12">
        <div style="height:400px;">
          <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
            :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox" :high="option.high"></vue-cropper>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" :model="addGirlForm" label-width="100px">
          <el-form-item label="图集标题配置">
            <el-input v-model="addGirlForm.title"></el-input>
          </el-form-item>
          <el-form-item label="图集类型配置">
            <el-select v-model="addGirlForm.type" placeholder="请选择">
              <el-option label="福利姬" value="1"></el-option>
              <el-option label="图集" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图集标签配置">
            <el-tag :color="color[index%5]" :key="index" v-for="(tag,index) in addGirlForm.dynamicTags" closable
              :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="addGirlForm.inputVisible" v-model="addGirlForm.inputValue"
              ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
          </el-form-item>
          <el-form-item label="网络地址配置">
            <el-input v-model="addGirlForm.netAddress"></el-input>
          </el-form-item>
          <el-form-item label="本地地址配置">
            <el-input v-model="addGirlForm.localAddress"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // tagcolor集合
        color: ['rgba(64,158,255,.1)', 'rgba(103,194,58,.1)', 'rgba(144,147,153,.1)', 'rgba(230,162,60,.1)',
          'rgba(245,108,108,.1)'
        ],
        addGirlForm: {
          title: '',
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          type: '',
          netAddress: '',
          localAddress: ''
        },
        option: {
          img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 200,
          autoCropHeight: 150,
          centerBox: false,
          high: true
        }
      }
    },
    watch: {

    },

    methods: {

      // 删除标签
      handleClose(tag) {
        this.addGirlForm.dynamicTags.splice(this.addGirlForm.dynamicTags.indexOf(tag), 1)
      },

      showInput() {
        this.addGirlForm.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 新增标签
      handleInputConfirm() {
        const inputValue = this.addGirlForm.inputValue
        if (inputValue) {
          this.addGirlForm.dynamicTags.push(inputValue)
        }
        this.addGirlForm.inputVisible = false
        this.addGirlForm.inputValue = ''
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .add-girl-container {
    .el-input__inner {
      width: 200px;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      font-size: 14px;
    }

    .el-form-item__label {
      font-size: 14px;
    }

    .el-tag {
      margin-right: 3px;
    }

    .el-button--info {
      background-color: rgb(127, 99, 96);
      border-color: rgb(127, 99, 96);
    }

    .el-button {
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
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .add-girl {
    &-container {
      padding: 20px;

      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }

      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }
</style>