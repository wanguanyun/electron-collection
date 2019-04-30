<template>
    <div class="setting">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="19">
                <transition name="upload" enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutLeft">
                    <el-card class="box-card" shadow="hover" v-if="user_config_one">
                        <div class="user-config-title">
                            <SvgIcon iconClass="pic" class="user-setting-pic"></SvgIcon>图集默认封面配置
                        </div>
                        <div class="user-config-contant">
                            <el-row :gutter="20">
                                <el-col :span="4" :offset="1">
                                    <el-card shadow="hover" :body-style="{ padding: '0px',position: 'relative' }">
                                        <img :src="defaule_cover" style="width: 100%;display: block;">
                                        <label for="uploadsCover" class="user-setting-label">
                                            <SvgIcon iconClass="write" class="user-setting-post">
                                            </SvgIcon>
                                        </label>
                                        <SvgIcon iconClass="refresh" class="user-setting-reset" @click.native="resetEditCover">
                                        </SvgIcon>
                                        <input type="file" ref="uploadsCover" id="uploadsCover"
                                            style="position:absolute; clip:rect(0 0 0 0);display:none;"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                            @change="uploadImgCover($event,1)">
                                        <span class="post-title">图集大类封面配置</span>
                                        <transition name="editCover" enter-active-class="animated flipInY"
                                            leave-active-class="animated flipOutY"
                                            v-on:before-enter="cropper_visible2 = true;"
                                            v-on:after-leave="cropper_visible2 = false;">
                                            <div class="modify-cover" ref="modify_cover" v-if="user_modify_cover">
                                                <vue-cropper ref="cropper_cover" v-if="cropper_visible2"
                                                    class="contant-cropper" :img="option.imgCover"
                                                    :output-size="option.size" :output-type="option.outputType"
                                                    :fixed="true" :info="true" :can-move="option.canMove"
                                                    :fixed-number="option.fixedNumberCover"
                                                    :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                                                    :auto-crop="option.autoCrop"
                                                    :auto-crop-width="option.autoCropWidthCover"
                                                    :auto-crop-height="option.autoCropHeightCover"
                                                    :center-box="option.centerBox" :enlarge="2" :high="option.high">
                                                </vue-cropper>
                                                <div class="btn_cropper">
                                                    <SvgIcon iconClass="check" @click.native="comfirmEditCover"
                                                        class="btn_cropper_check"></SvgIcon>
                                                    <SvgIcon iconClass="close" @click.native="closeEditCover"
                                                        class="btn_cropper_close"></SvgIcon>
                                                </div>
                                            </div>
                                        </transition>
                                    </el-card>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-card shadow="hover" :body-style="{ padding: '0px',position: 'relative' }">
                                        <img :src="defaule_item_cover" style="width: 100%;display: block;">
                                        <label for="uploadsItemCover" class="user-setting-label">
                                            <SvgIcon iconClass="write" class="user-setting-post">
                                            </SvgIcon>
                                        </label>
                                        <SvgIcon iconClass="refresh" class="user-setting-reset" @click.native="resetEditItemCover">
                                        </SvgIcon>
                                        <input type="file" ref="uploadsItemCover" id="uploadsItemCover"
                                            style="position:absolute; clip:rect(0 0 0 0);display:none;"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                            @change="uploadImgCover($event,2)">
                                        <span class="post-title">图集小类封面配置</span>
                                        <transition name="editCover" enter-active-class="animated flipInY"
                                            leave-active-class="animated flipOutY"
                                            v-on:before-enter="cropper_visible3 = true;"
                                            v-on:after-leave="cropper_visible3 = false;">
                                            <div class="modify-cover" ref="modify_item_cover"
                                                v-if="user_modify_item_cover">
                                                <vue-cropper ref="cropper_item_cover" v-if="cropper_visible3"
                                                    class="contant-cropper" :img="option.imgItemCover"
                                                    :output-size="option.size" :output-type="option.outputType"
                                                    :fixed="true" :info="true" :can-move="option.canMove"
                                                    :fixed-number="option.fixedNumberCover"
                                                    :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                                                    :auto-crop="option.autoCrop"
                                                    :auto-crop-width="option.autoCropWidthCover"
                                                    :auto-crop-height="option.autoCropHeightCover"
                                                    :center-box="option.centerBox" :enlarge="2" :high="option.high">
                                                </vue-cropper>
                                                <div class="btn_cropper">
                                                    <SvgIcon iconClass="check" @click.native="comfirmEditItemCover"
                                                        class="btn_cropper_check"></SvgIcon>
                                                    <SvgIcon iconClass="close" @click.native="closeEditItemCover"
                                                        class="btn_cropper_close"></SvgIcon>
                                                </div>
                                            </div>
                                        </transition>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </transition>
                <el-card class="box-card" shadow="hover">
                    <div class="user-config-title">

                    </div>
                </el-card>
                <el-card class="box-card" shadow="hover">
                    <div class="user-config-title"></div>
                </el-card>
                <el-card class="box-card" shadow="hover">
                    <div class="user-config-title"></div>
                </el-card>
            </el-col>
            <el-col :span="5">
                <transition name="upload" enter-active-class="animated fadeInDown"
                    leave-active-class="animated fadeOutLeft">
                    <el-card class="user-info" v-if="user_info_visible">
                        <div class="user-header">
                            个人信息
                        </div>
                        <div class="user-img">
                            <div class="user-avatar">
                                <img :src="avatar">
                                <label for="uploads" class="user-avatar-modify">
                                    <SvgIcon iconClass="upload" class="user-avatar-upload">
                                    </SvgIcon> 修改头像
                                </label>
                                <input type="file" ref="uploads" id="uploads"
                                    style="position:absolute; clip:rect(0 0 0 0);display:none;"
                                    accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
                                <div class="user-avatar-reset" @click="resetEditAvatar">
                                    <SvgIcon iconClass="forward_fill" class="user-avatar-upload"></SvgIcon> 返回默认
                                </div>
                            </div>
                        </div>
                        <transition name="editAvatar" v-on:after-enter="cropper_visible = true"
                            v-on:before-leave="cropper_visible = false;">
                            <div class="modify-avatar" v-if="user_modify_avatar" ref="modify_avatar">
                                <vue-cropper ref="cropper" v-if="cropper_visible" class="contant-cropper"
                                    :img="option.img" :output-size="option.size" :output-type="option.outputType"
                                    :fixed="true" :info="true" :can-move="option.canMove"
                                    :fixed-number="option.fixedNumber" :can-move-box="option.canMoveBox"
                                    :fixed-box="option.fixedBox" :auto-crop="option.autoCrop"
                                    :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
                                    :center-box="option.centerBox" :enlarge="2" :high="option.high">
                                </vue-cropper>
                                <div class="btn_cropper">
                                    <SvgIcon @click.native="comfirmEditAvatar" iconClass="check"
                                        class="btn_cropper_check"></SvgIcon>
                                    <SvgIcon @click.native="closeEditAvatar" iconClass="close"
                                        class="btn_cropper_close"></SvgIcon>
                                </div>
                            </div>
                        </transition>
                        <div class="user-detail">
                            <el-tag type="info">我就是我是不一样的烟火</el-tag>
                            <el-tag type="success">上次登录日期:{{last_login_time}}</el-tag>
                            <el-tag type="warning">已发布文章21篇</el-tag>
                            <el-tag type="warning">已收录30位小姐姐</el-tag>
                            <el-tag type="warning">上传图片123张(占用203MB)</el-tag>
                            <el-tag type="danger">我是有底线的</el-tag>
                        </div>
                        <div class="user-operation">
                            <el-button type="primary"><i class="el-icon-edit"></i>修改密码</el-button>
                        </div>
                    </el-card>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import SvgIcon from '@/components/SvgIcon'
    import {
      mapGetters
    } from 'vuex'
    import {
      uuid
    } from '@/utils/uuid'
    import {
      modifyAvatar,
      modifyCover,
      modifyItemCover
    } from '@/api/setting'
    export default {
      data() {
        return {
          user_info_visible: false,
          user_config_one: false,
          user_modify_avatar: false,
          user_modify_cover: false,
          user_modify_item_cover: false,
          cropper_visible: false,
          cropper_visible2: false,
          cropper_visible3: false,
          option: {
            img: '',
            imgCover: '',
            imgItemCover: '',
            size: 0.5,
            fixedNumber: [1, 1],
            fixedNumberCover: [2, 3],
            outputType: 'jpeg',
            canMove: true,
            fixedBox: false,
            canMoveBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 200,
            autoCropHeight: 200,
            autoCropWidthCover: 110,
            autoCropHeightCover: 165,
            centerBox: false,
            high: false
          }
        }
      },
      computed: {
        Base_url() {
          return process.env.BASE_API
        },
        ...mapGetters([
          'defaule_cover',
          'defaule_item_cover',
          'avatar',
          'last_login_time'
        ])
      },
      components: {
        SvgIcon
      },
      filters: {

      },
      created() {

      },
      mounted() {
        this.user_info_visible = true
        this.user_config_one = true
      },
      methods: {
        closeEditAvatar() {
          new Promise((resolve, reject) => {
            this.option.img = ''
            this.$refs.cropper.clearCrop()
            resolve()
          }).then(() => {
            this.user_modify_avatar = false
          })
        },
        closeEditCover() {
          new Promise((resolve, reject) => {
            this.option.imgCover = ''
            this.$refs.cropper_cover.clearCrop()
            resolve()
          }).then(() => {
            this.user_modify_cover = false
          })
        },
        closeEditItemCover() {
          new Promise((resolve, reject) => {
            this.option.imgItemCover = ''
            this.$refs.cropper_item_cover.clearCrop()
            resolve()
          }).then(() => {
            this.user_modify_item_cover = false
          })
        },
        // 确认修改头像
        comfirmEditAvatar() {
          const loading = this.$loading({
            lock: true,
            target: this.$refs.modify_avatar,
            fullscreen: false,
            text: '上传头像中....'
          })
          const formData = new FormData()
          const avatarName = `${uuid()}.png`
          this.$refs.cropper.getCropBlob((data) => {
            formData.append('imgfile', data, `${avatarName}`)
            modifyAvatar(formData).then(res => {
              this.$notify({
                title: res.message,
                message: res.data,
                type: 'success'
              })
              loading.close()
              // 更改store内头像地址
              this.$store.commit('SET_AVATAR', avatarName)
              // 关闭编辑层
              this.closeEditAvatar()
            }).catch(() => {
              loading.close()
            })
          })
        },
        // 修改默认大类封面
        comfirmEditCover() {
          const loading = this.$loading({
            lock: true,
            target: this.$refs.modify_cover,
            fullscreen: false,
            text: '上传封面中....'
          })
          const formData = new FormData()
          const coverName = `${uuid()}.png`
          this.$refs.cropper_cover.getCropBlob((data) => {
            formData.append('imgfile', data, `${coverName}`)
            modifyCover(formData).then(res => {
              this.$notify({
                title: res.message,
                message: res.data,
                type: 'success'
              })
              loading.close()
              // 更改store内头像地址
              this.$store.commit('SET_DEFAULT_COVER', coverName)
              // 关闭编辑层
              this.closeEditCover()
            }).catch(() => {
              loading.close()
            })
          })
        },
        // 修改默认大类封面
        comfirmEditItemCover() {
          const loading = this.$loading({
            lock: true,
            target: this.$refs.modify_item_cover,
            fullscreen: false,
            text: '上传封面中....'
          })
          const formData = new FormData()
          const coverName = `${uuid()}.png`
          this.$refs.cropper_item_cover.getCropBlob((data) => {
            formData.append('imgfile', data, `${coverName}`)
            modifyItemCover(formData).then(res => {
              this.$notify({
                title: res.message,
                message: res.data,
                type: 'success'
              })
              loading.close()
              // 更改store内头像地址
              this.$store.commit('SET_DEFAULT_ITEM_COVER', coverName)
              // 关闭编辑层
              this.closeEditItemCover()
            }).catch(() => {
              loading.close()
            })
          })
        },
        // 重置用户头像
        resetEditAvatar() {
          this.$confirm('是否确定重置, 是否继续?', '嗯???', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const formData = new FormData()
            // formData.append('imgfile', '', '')
            modifyAvatar(formData).then(res => {
              this.$notify({
                title: res.message,
                message: '重置成功！',
                type: 'success'
              })
              // 更改store内头像地址
              this.$store.commit('SET_AVATAR', res.data)
            }).catch(() => {
            })
          }).catch(() => {})
        },
        // 重置图集小类封面
        resetEditItemCover() {
          this.$confirm('是否确定重置, 是否继续?', '嗯???', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const formData = new FormData()
            // formData.append('imgfile', '', '')
            modifyItemCover(formData).then(res => {
              this.$notify({
                title: res.message,
                message: '重置成功！',
                type: 'success'
              })
              // 更改store内头像地址
              this.$store.commit('SET_DEFAULT_ITEM_COVER', res.data)
            }).catch(() => {
            })
          }).catch(() => {})
        },
        // 重置图集大类封面
        resetEditCover() {
          this.$confirm('是否确定重置, 是否继续?', '嗯???', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const formData = new FormData()
            // formData.append('imgfile', '', '')
            modifyCover(formData).then(res => {
              this.$notify({
                title: res.message,
                message: '重置成功！',
                type: 'success'
              })
              // 更改store内头像地址
              this.$store.commit('SET_DEFAULT_COVER', res.data)
            }).catch(() => {
            })
          }).catch(() => {})
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
          // 显示修改div
          this.user_modify_avatar = true
        },
        uploadImgCover(e, type) {
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
            if (type === 1) {
              this.option.imgCover = data
            } else if (type === 2) {
              this.option.imgItemCover = data
            }
          }
          // 转化为base64
          reader.readAsDataURL(file)
          // 转化为blob
          // reader.readAsArrayBuffer(file)
          // 显示修改div
          if (type === 1) {
            this.user_modify_cover = true
          } else if (type === 2) {
            this.user_modify_item_cover = true
          }
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .setting {
        .el-card__body {
            padding: 10px;
        }

        .el-card {
            overflow: unset;
        }

        .user-operation .el-button {
            background-color: rgb(127, 99, 96);
            border: none;
            color: #fff;
            position: relative;
            transition: 800ms ease all;
            outline: none;
            padding: 7px 18px;

            &:hover {
                background: #fff;
                color: rgb(127, 99, 96);
            }
        }

        .btn_cropper .el-button {
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

    .user-detail {
        .el-tag {
            display: block;
            margin: 5px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease 0s;

            &:hover {
                transform: scale(1.1);
                color: #7f6360;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .setting {
        padding: 20px;

        .box-card {
            padding: 5px 10px;
            margin-bottom: 10px;
            transition: transform 0.6s ease 0s;

            &:hover {
                transform: scale(1.01);
            }

            & .user-config-title {
                border-bottom: 1px solid #ccc;
                padding: 5px;
                color: #7f6360;
            }

            & .user-config-contant {
                padding: 5px 0;

                & .post-title {
                    position: absolute;
                    left: -30px;
                    top: 15px;
                    right: 0;
                    display: block;
                    text-align: center;
                    line-height: 1.4;
                    width: 20px;
                    padding: 10px 5px 10px 0;
                    border-right: 1px solid #ccc;
                }

                .modify-cover {
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
            }

            & .user-setting-pic {
                font-size: 20px;
                margin-right: 5px;
            }
            .user-setting-reset {
                position: absolute;
                right: 33px;
                bottom: 3px;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
                background-color: rgba(0,0,0,0.2);
                transition: transform 0.3s ease 0s;
                border-radius: 4px;
                &:hover {
                    transform: scale(1.1);
                }
            }
            .user-setting-label {
                position: absolute;
                right: 5px;
                bottom: 2px;

                .user-setting-post {
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                    background-color: rgba(0,0,0,0.2);
                    transition: transform 0.3s ease 0s;
                    border-radius: 4px;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
        }

        .user-header {
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
        }

        .user-img {
            padding: 10px;
            position: relative;
            padding-bottom: 10px;
            padding-top: 15px;
            border-bottom: 1px solid #ccc;

            &:hover .user-avatar {
                transform: translateX(-50%);
            }

            &:hover .user-avatar-modify {
                font-size: 14px;
                width: auto;
                height: auto;
                border-radius: 5px;
                opacity: 1;
                right: -25px;
                bottom: 20px;
                transform: translateX(70px);
            }

            &:hover .user-avatar-reset {
                font-size: 14px;
                width: auto;
                height: auto;
                border-radius: 5px;
                opacity: 1;
                right: -25px;
                bottom: 55px;
                transform: translateX(70px);
            }
        }

        .user-avatar {
            max-width: 100px;
            display: block;
            margin: 0 auto;
            position: relative;
            transition: transform 0.5s ease 0s;

            & img {
                max-width: 100px;
                border-radius: 50%;
            }

            &::after {
                content: "";
                width: 110px;
                height: 110px;
                display: block;
                border: 1px solid #7f6360;
                position: absolute;
                border-radius: 50%;
                left: 50%;
                top: 48%;
                transform: translate(-50%, -50%);
            }

            &-modify {
                display: inline-block;
                overflow: hidden;
                position: absolute;
                right: 0;
                bottom: 20px;
                width: 5px;
                height: 5px;
                color: rgb(127, 99, 96);
                background-color: rgba(127, 99, 96, .1);
                border-color: rgba(127, 99, 96, .2);
                border: 1px solid rgba(127, 99, 96, .2);
                cursor: pointer;
                padding: 2px 4px;
                font-size: 0px;
                z-index: 1;
                border-radius: 5px;
                opacity: 0;
                transition: all 0.5s ease 0s;
            }

            &-reset {
                display: inline-block;
                overflow: hidden;
                position: absolute;
                right: 0;
                bottom: 55px;
                width: 5px;
                height: 5px;
                color: rgb(127, 99, 96);
                background-color: rgba(127, 99, 96, .1);
                border-color: rgba(127, 99, 96, .2);
                border: 1px solid rgba(127, 99, 96, .2);
                cursor: pointer;
                padding: 2px 4px;
                font-size: 0px;
                z-index: 1;
                opacity: 0;
                border-radius: 5px;
                transition: all 0.5s ease 0s;
            }
        }

        .modify-avatar {
            height: 150px;
            opacity: 1;
            padding: 5px;
            border-bottom: 1px solid #ccc;

            & .contant-cropper {
                float: left;
                width: 90%;
            }

            & .btn_cropper {
                float: right;
                width: 10%;
                height: 100%;
                position: relative;

                & .btn_cropper_check,
                & .btn_cropper_close {
                    position: absolute;
                    font-size: 20px;
                    color: #fff;
                    background-color: #7f6360;
                    cursor: pointer;
                    left: 4px;
                    transition: transform 0.3s ease 0s;

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                & .btn_cropper_check {
                    top: 80%;
                }

                & .btn_cropper_close {
                    top: 60%;
                }
            }
        }

        .editAvatar-enter-active {
            animation: showEditAvatar 0.5s linear forwards;
        }

        .editAvatar-leave-active {
            animation: showEditAvatar 0.5s linear forwards reverse;
        }


        .user-detail {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
        }

        .user-operation {
            padding-top: 10px;
            text-align: center;
        }


        @keyframes showEditAvatar {
            0% {
                height: 0px;
                opacity: 0;
            }

            50% {
                height: 75px;
                opacity: 0.5;
            }

            100% {
                height: 150px;
                opacity: 1;
            }
        }
    }
</style>