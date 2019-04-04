<template>
    <div class="add-girl-container">
        <transition name="upload" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft"
            v-on:after-enter="cropper_visible = true" v-on:after-leave="cropper_visible = false">
            <div v-show="upload_visible" class="container-upload">
                <i @click="hideUpload" class="el-icon-close"></i>
                <div v-if="cropper_visible" class="upload-cropper">
                    <vue-cropper ref="cropper" :img="option.img" :output-size="option.size"
                        :output-type="option.outputType" :fixed="true" :info="true" :can-move="option.canMove"
                        :fixed-number="option.fixedNumber" :can-move-box="option.canMoveBox"
                        :fixed-box="option.fixedBox" :auto-crop="option.autoCrop"
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
        <el-row>
            <el-col :span="12">
                <div class="container-left">
                    <transition name="upload" enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOutLeft">
                        <img v-show="!upload_visible" class="default-cover" :src="default_img" height="100%">
                    </transition>
                    <transition name="upload" enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOutLeft">
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
                    <el-form-item label="图集类型配置" prop="type">
                        <el-select v-model="addGirlForm.type" placeholder="请选择">
                            <el-option label="福利姬" value="1"></el-option>
                            <el-option label="图集" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="网络地址配置" prop="netAddress">
                        <el-input v-model="addGirlForm.netAddress" clearable auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本地地址配置" prop="localAddress">
                        <el-input v-model="addGirlForm.localAddress" clearable auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图集星级配置" prop="rank">
                        <el-rate allow-half v-model="addGirlForm.rank" :colors="['#7f6360', '#7f6360', '#7f6360']">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="图集标签配置" prop="tags">
                        <el-tag :color="color[index%5]" :key="index" v-for="(tag,index) in addGirlForm.dynamicTags"
                            closable :disable-transitions="false" size="medium" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="addGirlForm.inputVisible" v-model="addGirlForm.inputValue"
                            ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import { uuid } from '@/utils/uuid'
    export default {
        name: 'girlsupload',
        created() {
            this.default_img = `${this.defaule_cover}`
        },
        computed: {
            Base_url() {
                return process.env.BASE_API
            },
            ...mapGetters([
                'defaule_cover'
            ]),
        },
        data() {
            return {
                color: ['rgba(64,158,255,.1)', 'rgba(103,194,58,.1)', 'rgba(144,147,153,.1)', 'rgba(230,162,60,.1)',
                    'rgba(245,108,108,.1)'
                ],
                default_img: '',
                default_img_blob: '',
                // 上传图片是否展示
                upload_visible: false,
                cropper_visible: false,
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
                    size: 1,
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
                },
            }
        },
        methods: {
            //初始化
            init() {
                this.option.img = ''
                this.default_img = `${this.defaule_cover}`
                this.upload_visible = false
                this.cropper_visible = false
                this.$refs.uploads.value = null
                this.addGirlForm.dynamicTags = []
                this.$refs['addGirlForm'].resetFields()
            },
            //提交
            handleAdd() {
                this.$refs['addGirlForm'].validate((valid) => {
                    if (valid) {
                        var formData = new FormData()
                        formData.append('title',this.addGirlForm.title)
                        formData.append('type',this.addGirlForm.type)
                        formData.append('netAddress',this.addGirlForm.netAddress)
                        formData.append('localAddress',this.addGirlForm.localAddress)
                        formData.append('rank',this.addGirlForm.rank)
                        formData.append('tags',this.addGirlForm.dynamicTags.join(','))
                        formData.append('imgfile',this.default_img_blob,`${uuid()}.png`)
                        //通知父组件可以提交信息了
                        this.$emit('add-girl-data', formData)
                    } else {
                        return false;
                    }
                });
            },
            uploadImg(e) {
                // 上传图片
                // this.option.img
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
                //预览用
                this.$refs.cropper.getCropData((data) => {
                    this.default_img = data
                })
                //上传用
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
        .btn_cropper {
            .el-button+.el-button {
                margin-left: 0;
            }
        }

        .el-input__inner {
            width: 100%;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-radius: 0;
            font-size: 15px;
        }

        .el-rate {
            line-height: 46px;
        }

        .input-new-tag .el-input__inner {
            width: 130px;
        }

        .el-select {
            width: 100%;
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
                height: 335px;
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
    }
</style>