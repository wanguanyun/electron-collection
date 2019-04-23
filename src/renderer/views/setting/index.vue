<template>
    <div class="setting">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="19">
                <el-card class="box-card">
                    <div class="user-img"></div>
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card class="user-info">
                    <div class="user-header">
                        个人信息
                    </div>
                    <div class="user-img">
                        <div class="user-avatar">
                            <img :src="Base_url+'/img/user-avatar.gif'">
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
                        <el-tag type="success">上次登录日期:2019-04-21 12:11</el-tag>
                        <el-tag type="warning">已发布文章21篇</el-tag>
                        <el-tag type="danger">我是有底线的</el-tag>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import SvgIcon from '@/components/SvgIcon'
    export default {
        data() {
            return {}
        },
        computed: {
            Base_url() {
                return process.env.BASE_API
            }
        },
        components: {
            SvgIcon
        },
        filters: {

        },
        created() {

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
    }
    .user-detail {
        .el-tag {
            display: block;
            margin-bottom: 5px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease 0s;
            &:hover {
                transform: scale(1.2);
                color: #7f6360;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .setting {
        padding: 20px;

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
                right: -15px;
                transform: translateX(70px);
            }
            &:hover .user-avatar-reset {
                font-size: 14px;
                width: auto;
                height: auto;
                border-radius: 5px;
                opacity: 1;
                right: -25px;
                bottom: 35px;
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
                right: 30px;
                bottom: 0;
                width: 5px;
                height: 5px;
                color: rgb(127,99,96);
                background-color: rgba(127,99,96,.1);
                border-color: rgba(127,99,96,.2);
                border: 1px solid rgba(127,99,96,.2);
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
                right: 6px;
                bottom: 35px;
                width: 5px;
                height: 5px;
                color: rgb(127,99,96);
                background-color: rgba(127,99,96,.1);
                border-color: rgba(127,99,96,.2);
                border: 1px solid rgba(127,99,96,.2);
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
            padding-top:10px;
        }
    }
</style>