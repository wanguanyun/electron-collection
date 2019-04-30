<template>
  <div style="position:relative;">
    <div v-if="girlDataType === 2 && moreViewerBth_visible" @click="showMoreViewer" class="more-viewer-btn-down"><i
        class="el-icon-arrow-down"></i></div>
    <div class="add-girl-container">
      <transition name="upload" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft"
        v-on:after-enter="cropper_visible = true" v-on:after-leave="cropper_visible = false">
        <div v-show="upload_visible" class="container-upload">
          <i @click="hideUpload" class="el-icon-close"></i>
          <div v-if="cropper_visible" class="upload-cropper">
            <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
              :fixed="true" :info="true" :can-move="option.canMove" :fixed-number="option.fixedNumber"
              :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :auto-crop="option.autoCrop"
              :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
              :center-box="option.centerBox" :enlarge="2" :high="option.high">
            </vue-cropper>
          </div>
          <div class="btn_cropper">
            <label class="btn_cropper_upload" for="uploads"><i class="el-icon-upload2"></i></label>
            <el-button @click="confirmCrop" icon="el-icon-check" circle></el-button>
            <el-button @click="refreshCrop" icon="el-icon-search" circle></el-button>
            <el-button @click="downCropPic" icon="el-icon-download" circle></el-button>
          </div>
          <input type="file" ref="uploads" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
        </div>
      </transition>
      <transition name="moreViewer" v-on:before-enter="moreViewerBth_visible = false"
        v-on:after-enter="moreViewerPic_visible = true" v-on:after-leave="moreViewerBth_visible = true"
        v-on:before-leave="moreViewerPic_visible = false">
        <div class="more-viewer" v-if="show_more_viewer">
          <div class="more-viewer-img" v-if="girlDataType === 2 && moreViewerPic_visible"
            v-for="(item,index) in girlViewerDataLocal" :key="index">
            <div @click="removeViewerImg(item)" class="more-viewer-img-delete"><i class="el-icon-close"></i></div>
            <el-image :src="`${Base_url}/img/${item.img_name}`" fit="contain"></el-image>
          </div>
          <div class="more-viewer-img" v-if="girlDataType === 2 && moreViewerPic_visible"
            v-for="(item,index) in default_viewer" :key="item.imgName">
            <div @click="removeNewViewerImg(item)" class="more-viewer-img-delete"><i class="el-icon-close"></i></div>
            <el-image :src="`${item.data}`" fit="contain"></el-image>
          </div>
          <div v-if="moreViewerPic_visible" class="more-viewer-add">
            <transition name="editViewer" enter-active-class="animated flipInY" leave-active-class="animated flipOutY"
              v-on:before-enter="cropper_visible2 = true;" v-on:after-leave="cropper_visible2 = false;">
              <div class="modify-viewer" ref="modify_cover" v-if="user_modify_viewer">
                <vue-cropper ref="cropper_viewer" v-if="cropper_visible2" class="contant-cropper" :img="option.imgViewer"
                  :output-size="option.size" :output-type="option.outputType" :fixed="true" :info="true"
                  :can-move="option.canMove" :fixed-number="option.fixedNumber" :can-move-box="option.canMoveBox"
                  :fixed-box="option.fixedBox" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                  :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" :enlarge="2"
                  :high="option.high">
                </vue-cropper>
                <div class="btn_cropper">
                  <SvgIcon iconClass="check" @click.native="comfirmEditViewer" class="btn_cropper_check"></SvgIcon>
                  <SvgIcon iconClass="close" @click.native="closeEditViewer" class="btn_cropper_close"></SvgIcon>
                </div>
              </div>
            </transition>
            <label for="uploadsViewer"><i class="el-icon-circle-plus-outline"></i></label>
          </div>
          <input type="file" ref="uploadsViewer" id="uploadsViewer"
            style="position:absolute; clip:rect(0 0 0 0);display:none;"
            accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgViewer($event)">
          <div class="more-viewer-btn-up" @click="showMoreViewer"><i class="el-icon-arrow-up"></i></div>
          <div class="block"></div>
        </div>
      </transition>
      <div v-show="show_more_viewer" class="mask"></div>
      <el-row>
        <el-col :span="12">
          <div class="container-left">
            <transition name="upload" enter-active-class="animated fadeIn" leave-active-class="animated fadeOutLeft">
              <img v-show="!upload_visible" class="default-cover" :src="default_img" height="100%">
            </transition>
            <transition name="upload" enter-active-class="animated fadeIn" leave-active-class="animated fadeOutLeft">
              <div v-show="!upload_visible" @click="showUpload" class="add-cover-btn"><i
                  class="el-icon-plus"></i><span>更改封面</span></div>
            </transition>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form ref="addGirlForm" :hide-required-asterisk="true" size="medium" :model="addGirlForm"
            :rules="addGirlRules" label-width="130px">
            <el-form-item label="图集标题配置" prop="title">
              <el-input v-model="addGirlForm.title" clearable auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="girlDataType === 1" label="图集类型配置" prop="type">
              <el-select v-model="addGirlForm.type" placeholder="请选择">
                <el-option label="福利姬" :value="1"></el-option>
                <el-option label="图集" :value="2"></el-option>
                <el-option label="COS" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="网络地址配置" prop="netAddress">
              <el-input v-model="addGirlForm.netAddress" clearable auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="本地地址配置" prop="localAddress">
              <el-input readonly type="textarea" v-model="addGirlForm.localAddress" autosize clearable
                auto-complete="off"></el-input>
              <el-button size="mini" @click="localAddressConfig">配置本地地址</el-button>
            </el-form-item>
            <el-form-item label="图集星级配置" prop="rank">
              <el-rate allow-half v-model="addGirlForm.rank" :colors="['#7f6360', '#7f6360', '#7f6360']">
              </el-rate>
            </el-form-item>
            <el-form-item class="tag-form-item" label="图集标签配置" prop="tags">
              <el-tag :color="color[index%5]" :key="index" v-for="(tag,index) in addGirlForm.dynamicTags" closable
                :disable-transitions="false" size="medium" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="addGirlForm.inputVisible" v-model="addGirlForm.inputValue"
                ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    uuid
  } from '@/utils/uuid'
  import SvgIcon from '@/components/SvgIcon'
  const ipc = require('electron').ipcRenderer
  export default {
    name: 'girlsupload',
    created() {
      //重新声明props变量 防止直接修改props变量
      this.girlViewerDataLocal = this.girlViewerData
      this.default_img = this.girlData && this.girlData.img_name ?
        `${this.Base_url}/img/${this.girlData.img_name}` : (this.girlDataType === 1 ? `${this.defaule_cover}` :
          `${this.defaule_item_cover}`)
      this.addGirlForm.title = this.girlData.gallery_name
      this.addGirlForm.dynamicTags = this.girlData.gallery_tag ? this.girlData.gallery_tag.split(',') : []
      this.addGirlForm.inputVisible = false
      this.addGirlForm.inputValue = ''
      this.addGirlForm.type = this.girlData.gallery_type ? this.girlData.gallery_type : ''
      this.addGirlForm.netAddress = this.girlData.gallery_net ? this.girlData.gallery_net : ''
      this.addGirlForm.localAddress = this.girlData.gallery_local ? this.girlData.gallery_local : ''
      this.addGirlForm.rank = this.girlData.gallery_rank ? this.girlData.gallery_rank : 0
    },
    mounted: function () {
      this.$nextTick(() => {
        // Register IPC Renderer event handles once for this control
        // 监听主进程的返回
        ipc.on('local-address-config-reply', (e, args) => {
          const re = new RegExp('\\\\', 'g')
          this.addGirlForm.localAddress = args[0].replace(re, '\\\\\\\\') || ''
        })
      })
    },
    props: ['girlData', 'girlDataType', 'girlViewerData'],
    computed: {
      Base_url() {
        return process.env.BASE_API
      },
      ...mapGetters([
        'defaule_cover',
        'defaule_item_cover'
      ])
    },
    components: {
      SvgIcon
    },
    data() {
      return {
        color: ['rgba(64,158,255,.1)', 'rgba(103,194,58,.1)', 'rgba(144,147,153,.1)', 'rgba(230,162,60,.1)',
          'rgba(245,108,108,.1)'
        ],
        default_img: '',
        default_img_blob: '',
        //用户上传的图集小类预览图
        default_viewer_blob:[],
        default_viewer: [],
        // 上传图片是否展示
        upload_visible: false,
        cropper_visible: false,
        show_more_viewer: false,
        moreViewerPic_visible: false,
        moreViewerBth_visible: true,
        cropper_visible2: false,
        user_modify_viewer: false,
        girlViewerDataLocal: [],
        addGirlForm: {
          title: '',
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          type: '',
          netAddress: '',
          localAddress: '',
          rank: 0
        },
        option: {
          img: '',
          imgViewer: '',
          size: 0.5,
          fixedNumber: [2, 3],
          outputType: 'jpeg',
          canMove: true,
          fixedBox: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 220,
          autoCropHeight: 330,
          centerBox: false,
          high: false
        },
        addGirlRules: {
          title: [{
            required: true,
            message: 'GKD！GKD！GKD！',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: 'GKD！GKD！GKD！',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      // 初始化
      init() {
        this.option.img = ''
        this.option.imgViewer = ''
        this.default_img = `${this.defaule_cover}`
        this.default_viewer_blob = []
        this.default_viewer = []
        this.default_img_blob = ''
        this.upload_visible = false
        this.cropper_visible = false
        this.$refs.uploads.value = null
        this.addGirlForm.dynamicTags = []
        this.$refs['addGirlForm'].resetFields()
      },
      // 配置本地文件地址
      localAddressConfig() {
        ipc.send('local-address-config')
      },
      // 新增小姐姐 提交
      handleAdd(galleryId) {
        this.$refs['addGirlForm'].validate((valid) => {
          if (valid) {
            var formData = new FormData()
            formData.append('title', this.addGirlForm.title)
            formData.append('type', this.addGirlForm.type)
            formData.append('netAddress', this.addGirlForm.netAddress)
            formData.append('localAddress', this.addGirlForm.localAddress)
            formData.append('rank', this.addGirlForm.rank)
            formData.append('tags', this.addGirlForm.dynamicTags.join(','))
            formData.append('imgfile', this.default_img_blob, `${uuid()}.png`)
            if (this.girlDataType === 2) {
              // 小类新增
              formData.append('galleryId', galleryId)
              for(let item of this.default_viewer_blob){
                formData.append('viewerfile', item.data, item.imgName)
              }
            }
            // 通知父组件可以提交信息了
            this.$emit('add-girl-data', formData)
          } else {
            return false
          }
        })
      },
      // 编辑小姐姐 提交
      handleModify() {
        console.log(this.girlViewerDataLocal)
        console.log(this.default_viewer_blob)
        this.$refs['addGirlForm'].validate((valid) => {
          if (valid) {
            var formData = new FormData()
            formData.append('title', this.addGirlForm.title)
            formData.append('type', this.addGirlForm.type)
            formData.append('netAddress', this.addGirlForm.netAddress)
            formData.append('localAddress', this.addGirlForm.localAddress)
            formData.append('rank', this.addGirlForm.rank)
            formData.append('tags', this.addGirlForm.dynamicTags.join(','))
            formData.append('imgfile', this.default_img_blob, `${uuid()}.png`)
            if (this.girlDataType === 1) {
              // 大类修改
              formData.append('galleryId', this.girlData.gallery_id)
            } else if (this.girlDataType === 2) {
              // 小类修改
              formData.append('galleryId', this.girlData.gallery_id)
              formData.append('galleryItemId', this.girlData.gallery_item_id)
              for(let item of this.default_viewer_blob){
                formData.append('viewerfile', item.data, item.imgName)
              }
              //之前上传的预览图列表<修改过> 用于后端判断是否逻辑删除 
              for(let i=0;i<this.girlViewerDataLocal.length;i++){
                for(let key in this.girlViewerDataLocal[i]){
                  //假设这个数组对应的字段为box
                  formData.append(`girlViewerLoaclImg[${i}][${key}]`,this.girlViewerDataLocal[i][key])          
                }
              }
            }
            //只有在未上传封面时用得到
            formData.append('imgId', this.girlData.gallery_cover)
            // 通知父组件可以提交信息了
            this.$emit('modify-girl-data', formData)
          } else {
            return false
          }
        })
      },
      uploadImg(e) {
        // 上传图片
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.option.img = data
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file)
      },
      // 刷新截图窗口
      refreshCrop() {
        this.$refs.cropper.refresh()
      },
      // 确认截图
      confirmCrop() {
        this.upload_visible = false
        // 预览用
        this.$refs.cropper.getCropData((data) => {
          this.default_img = data
        })
        // 上传用
        this.$refs.cropper.getCropBlob((data) => {
          this.default_img_blob = data
        })
      },
      // 下载截图图片JPG
      downCropPic() {
        var aLink = document.createElement('a')
        aLink.download = 'pic'
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      },
      // 展示上传封面页面
      showUpload() {
        this.upload_visible = true
      },
      hideUpload() {
        this.upload_visible = false
      },
      // 删除标签
      handleClose(tag) {
        this.addGirlForm.dynamicTags.splice(this.addGirlForm.dynamicTags.indexOf(tag), 1)
      },
      //展示小类详情图片
      showMoreViewer() {
        this.show_more_viewer = !this.show_more_viewer;
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
      },
      //删除预览图
      removeViewerImg(param) {
        console.log(param)
        let tempList = this.girlViewerDataLocal.filter(item => {
          return item.img_id != param.img_id
        })
        this.girlViewerDataLocal = [];
        for (let item of tempList) {
          this.girlViewerDataLocal.push(item)
        }
      },
      //删除用户新上传的预览图
      removeNewViewerImg(param){
        let tempList = this.default_viewer.filter(item => {
          return item.imgName != param.imgName
        })
        let tempList2 = this.default_viewer_blob.filter(item => {
          return item.imgName != param.imgName
        })
        this.default_viewer = [];
        for (let item of tempList) {
          this.default_viewer.push(item)
        }
        this.default_viewer_blob = []
        for (let item of tempList2) {
          this.default_viewer_blob.push(item)
        }
      },
      uploadImgViewer(e) {
        // 上传图片
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.option.imgViewer = data
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file)
        this.user_modify_viewer = true
        // 显示修改div
      },
      //关闭小类预览图上传界面
      closeEditViewer() {
          new Promise((resolve, reject) => {
            this.option.imgViewer = ''
            this.$refs.cropper_viewer.clearCrop()
            resolve()
          }).then(() => {
            this.user_modify_viewer = false
          })
      },
      comfirmEditViewer(){
        this.user_modify_viewer = false
        const viewerImgName = `${uuid()}.png`
        // 预览用
        const that = this
        this.$refs.cropper_viewer.getCropData((data) => {
          that.default_viewer.push({
            imgName:viewerImgName,
            data
          })
        })
        // 上传用
        this.$refs.cropper_viewer.getCropBlob((data) => {
          that.default_viewer_blob.push({
            imgName:viewerImgName,
            data
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .add-girl-container {
    .btn_cropper {
      .el-button+.el-button {
        margin-left: 0;
      }
    }

    .el-input__inner,
    .el-textarea__inner {
      width: 100% !important;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      font-size: 15px;
      overflow-y: hidden;
    }

    .el-rate {
      line-height: 46px;
    }

    .input-new-tag .el-input__inner {
      width: 130px !important;
    }

    .el-select {
      width: 100%;
    }

    .tag-form-item .el-form-item__content {
      margin-left: 30px !important;
    }

    .el-form-item__label {
      font-size: 15px;
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
  .moreViewer-enter-active {
    animation: moreViewer 0.5s linear forwards;
  }

  .moreViewer-leave-active {
    animation: moreViewer 0.5s linear forwards reverse;
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0);
  }

  .more-viewer {
    position: absolute;
    height: 245px;
    left: 0;
    right: 0;
    z-index: 4;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 8px;

    &-btn-up {
      cursor: pointer;
      display: inline-block;
      position: absolute;
      bottom: -20px;
      color: rgb(127, 99, 96);
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
      width: 45px;
      background-color: #fff;
      text-align: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    &-btn-down {
      cursor: pointer;
      display: inline-block;
      position: absolute;
      top: -30px;
      color: rgb(127, 99, 96);
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
      width: 45px;
      background-color: #fff;
      text-align: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .block {
      display: inline-block;
      position: absolute;
      bottom: 0px;
      width: 50px;
      height: 5px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
    }

    &-add {
      width: 150px;
      height: 225px;
      position: relative;
      text-align: center;
      float: left;

      .modify-viewer {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 1;

        .btn_cropper {
          width: 1.3em;
          height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          right: -1.4em;

          & .btn_cropper_check,
          & .btn_cropper_close {
            width: 1.1em;
            height: 1.1em;
            position: absolute;
            font-size: 20px;
            color: #fff;
            background-color: #7f6360;
            cursor: pointer;
            transition: transform 0.3s ease 0s;

            &:hover {
              transform: scale(1.1);
            }
          }

          & .btn_cropper_check {
            bottom: 0;
          }

          & .btn_cropper_close {
            bottom: 1.5em;
          }
        }
      }

      label i {
        position: absolute;
        font-size: 38px;
        color: #7f6360;
        cursor: pointer;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.3s ease 0s;

        &:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
    }

    &-img {
      width: 150px;
      height: 225px;
      margin-right: 5px;
      float: left;
      position: relative;
      transition: transform 0.3s ease 0s;

      &:hover {
        transform: scale(1.02);
      }

      &-delete {
        position: absolute;
        cursor: pointer;
        top: 5px;
        width: 25px;
        height: 25px;
        right: 5px;
        color: #fff;
        line-height: 25px;
        text-align: center;
        font-size: 20px;
        background-color: #7f6360;
      }
    }
  }

  .container-upload {
    position: absolute;
    background: rgb(245, 245, 247);
    top: 0;
    opacity: 1;
    bottom: 0%;
    width: 50%;
    z-index: 3;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .el-icon-close {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      font-weight: 700;
      color: rgb(127, 99, 96);
      transition: transform 0.3s ease 0s;
    }

    .el-icon-close:hover {
      transform: scale(1.3) rotate(180deg);
    }

    .upload-cropper {
      margin: 10px;
      position: absolute;
      left: 0;
      right: 40px;
      top: 0;
      bottom: 0;
    }

    .btn_cropper {
      width: 40px;
      margin: 1px;
      height: 230px;
      position: absolute;
      right: 2px;
      top: 100px;

      & .btn_cropper_upload {
        display: block;
        margin-top: 20px;
        margin-left: 0;
        background-color: #7f6360;
        border: none;
        color: #fff;
        position: relative;
        transition: 800ms ease all;
        outline: none;
        border-radius: 50%;
        padding: 12px;
        line-height: 1;
        white-space: nowrap;
        font-weight: 500;
        cursor: pointer;
        font-size: 14px;
        width: 38px;

        &:hover {
          background: #fff;
          color: rgb(127, 99, 96);
        }

        &:before,
        &:after {
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

        &:after {
          right: inherit;
          top: inherit;
          left: 0;
          bottom: 0;
        }

        &:hover:before,
        &:hover:after {
          width: 100%;
          transition: 800ms ease all;
        }
      }

      & button {
        display: block;
        margin-top: 20px;
      }
    }
  }

  .add-girl {
    &-container {
      position: relative;
      overflow: hidden;

      .button-new-tag {
        padding: 7px 15px;
      }

      .input-new-tag {
        width: 40px;
        vertical-align: bottom;
      }

      .container-left {
        height: 380px;
        position: relative;
        cursor: pointer;
        overflow: hidden;

        &:hover .default-cover {
          opacity: 0.7;
          transform: translateX(-80%) scale(0.8);
        }

        &:hover .add-cover-btn {
          opacity: 1;
          transform: translate(40%, -50%) scale(1.1);
          transition: transform 0.3s ease 0s, color 0.3s ease 0s, border-color 0.3s ease 0s;
        }

        .add-cover-btn:hover {
          border: 3px dashed rgba(127, 99, 96, .5);
          color: rgba(127, 99, 96, .5);
        }
      }

      .default-cover {
        display: block;
        position: absolute;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        left: 50%;
        top: 0px;
        opacity: 1;
        z-index: 2;
        transform: translateX(-50%);
        transition: transform 0.3s ease 0s;
      }

      .add-cover-btn {
        position: absolute;
        display: inline-block;
        text-align: center;
        color: #ccc;
        border-radius: 4px;
        border: 2px dashed #eee;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        opacity: 0;
        width: 100px;
        z-index: 1;
        height: 100px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease 0s;

        i {
          font-size: 53px;
          margin-top: 7px;
        }

        span {
          display: block;
          font-size: 20px;
        }
      }
    }

    @keyframes moreViewer {
      0% {
        height: 0px;
        opacity: 0;
      }

      50% {
        height: 120px;
        opacity: 0.5;
      }

      100% {
        height: 245px;
        opacity: 1;
      }
    }
  }
</style>