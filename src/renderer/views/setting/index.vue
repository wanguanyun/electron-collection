<template>
    <div class="setting">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="19">
                <transition name="upload" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
                <el-card class="box-card" shadow="hover" v-if="user_config_one">
                    <div class="user-config-title">
                        <SvgIcon iconClass="pic"
                                    class="user-setting-pic"></SvgIcon>图集默认封面配置
                    </div>
                    <div class="user-config-contant">
                        <el-row :gutter="20">
                            <el-col :span="4" :offset="1">
                                <el-card shadow="hover" :body-style="{ padding: '0px',position: 'relative' }">
                                    <img :src="defaule_cover"
                                        style="width: 100%;display: block;">
                                        <SvgIcon iconClass="write"
                                    class="user-setting-post"></SvgIcon>
                                    <span class="post-title">图集大类封面配置</span>
                                </el-card>
                            </el-col>
                             <el-col :span="4" :offset="1">
                                <el-card shadow="hover" :body-style="{ padding: '0px',position: 'relative' }">
                                    <img :src="defaule_item_cover"
                                        style="width: 100%;display: block;">
                                        <SvgIcon iconClass="write"
                                    class="user-setting-post"></SvgIcon>
                                    <span class="post-title">图集小类封面配置</span>
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
                <transition name="upload" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutLeft">
                <el-card class="user-info" v-if="user_info_visible">
                    <div class="user-header">
                        个人信息
                    </div>
                    <div class="user-img">
                        <div class="user-avatar">
                            <img :src="avatar">
                            <div class="user-avatar-modify">
                                <SvgIcon @click.native="handleFavourite" iconClass="upload" class="user-avatar-upload">
                                </SvgIcon> 修改头像
                            </div>
                            <div class="user-avatar-reset">
                                <SvgIcon @click.native="handleFavourite" iconClass="forward_fill"
                                    class="user-avatar-upload"></SvgIcon> 返回默认
                            </div>
                        </div>
                    </div>
                    <div class="user-detail">
                        <el-tag type="info">我就是我是不一样的烟火</el-tag>
                        <el-tag type="success">上次登录日期:{{last_login_time}}</el-tag>
                        <el-tag type="warning">已发布文章21篇</el-tag>
                        <el-tag type="warning">已收录30位小姐姐</el-tag>
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
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                user_info_visible:false,
                user_config_one:false,
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
        mounted(){
            this.user_info_visible = true;
            this.user_config_one = true;
            console.log(this.last_login_time)
        },
        methods: {

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

        .el-button {
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
            padding:5px 10px;
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
            }

            & .user-setting-pic {
                font-size: 20px;
                margin-right: 5px;
            }
            & .user-setting-post{
                font-size: 20px;
                position: absolute;
                right: 10px;
                bottom: 10px;
                color: #7f6360;cursor: pointer;
                transition: transform 0.3s ease 0s;
                &:hover {
                    transform: scale(1.1);
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

        .user-detail {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
        }

        .user-operation {
            padding-top: 10px;
            text-align: center;
        }
    }
</style>