<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" stripe element-loading-text="Loading" height=600 fit
            highlight-current-row>
            <el-table-column label="添加日期" sortable :sort-method="sortByDate">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="图集大类">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>ID: {{ scope.row.gallery_id }}</p>
                        <div slot="reference" class="name-wrapper">
                            <span>{{ scope.row.gallery_name }}</span>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="图集小类">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>ID: {{ (scope.row.gallery_item_id?scope.row.gallery_item_id:'') }}</p>
                        <div slot="reference" class="name-wrapper">
                            <span>{{ (scope.row.gallery_item_name?scope.row.gallery_item_name:'') }}</span>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="星级" sortable :sort-method="sortByRank">
                <template slot-scope="scope">
                    <i class="el-icon-star-off"></i>
                    <span
                        style="margin-left: 10px">{{ scope.row.gallery_item_name?scope.row.gallery_item_rank:scope.row.gallery_rank }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标签">
                <template slot-scope="scope">
                    <el-tag style="margin-right: 5px" v-if="item"
                        v-for='(item,index) in (scope.row.gallery_item_name?scope.row.gallery_item_tag.split(","):scope.row.gallery_tag.split(","))'
                        :key="index" size="medium">{{ item }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="本地地址">
                <template slot-scope="scope">
                    <i class="el-icon-folder"></i>
                    <span
                        style="margin-left: 10px">{{ scope.row.gallery_item_name?scope.row.gallery_item_local:scope.row.gallery_local }}</span>
                </template>
            </el-table-column>
            <el-table-column label="网络地址">
                <template slot-scope="scope">
                    <i class="el-icon-link"></i>
                    <span
                        style="margin-left: 10px">{{ scope.row.gallery_item_name?scope.row.gallery_item_net:scope.row.gallery_net }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-popover placement="top" width="160">
                        <p>确定还原该图集大类/小类吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="cancelRestore($event)">取消</el-button>
                            <el-button type="primary" size="mini" @click="restore(scope.row,$event)">确定</el-button>
                        </div>
                        <el-button slot="reference" size="mini" type="danger">还原</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {
        getRecyleList,
        restoreGallery,
    } from '@/api/recyle'
    import moment from 'moment'
    export default {
        data() {
            return {
                list: [],
                listLoading: true,
                visible: false,
            }
        },
        created() {
            this.fechData()
        },
        methods: {
            fechData() {
                getRecyleList().then(res => {
                    this.listLoading = false
                    this.list = res.data
                }).catch(() => {
                    this.listLoading = false
                })
            },
            restore(param,element) {
                console.log(param)
                restoreGallery(param).then(res => {
                    this.$notify({
                        title: res.message,
                        message: res.data,
                        type: 'success'
                    })
                    element.target.parentNode.parentNode.parentNode.style.display = 'none'
                    this.fechData()
                }).catch(() => {})
            },
            cancelRestore(element){
                element.target.parentNode.parentNode.parentNode.style.display = 'none'
            },
            sortByDate(a, b){
                return parseInt(moment(a.create_time,"YYYY-MM-DD HH:mm").format("YYYYMMHHmm"))-parseInt(moment(b.create_time,"YYYY-MM-DD HH:mm").format("YYYYMMHHmm"))
            },
            sortByRank(a,b){
                return parseInt((a?a:0))-parseInt((b?b:0))
            }
        }
    }
</script>