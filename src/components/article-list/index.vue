<!-- 文章列表 -->
<template>
  <div class="article-list">
    <!--      form-->
    <div class="article-list-form">
      <el-form :inline="true">
        <el-form-item label="文章标题">
          <el-input placeholder="请输入文章标题" v-model="articleTitle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" @click="resetBtn(true)" title="根据输入的条件查询">重 置</el-button>
          <el-button icon="el-icon-search" @click="getDataList(true)" title="根据输入的条件查询">查 询</el-button>
          <el-button type="primary" :disabled="btnDisabled" @click="doAdd(rowData, 1)" title="添加" icon="el-icon-plus">添 加</el-button>
          <el-button type="info" @click="doEdit(rowData, 2)" icon="el-icon-edit">编 辑</el-button>
          <el-button type="danger" :disabled="btnDisabled" @click="doDelete(rowData)" icon="el-icon-delete">删 除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table-->
    <div class="article-list-tab">
      <el-table ref="contListTable" :data="tableData" @row-click="rowClick" highlight-current-row stripe
                style="width: 100%">
<!--                {{ tableKey }}-->
<!--                <el-table-column v-for="(item,key) in tableKey"-->
<!--                                 :key="key"-->
<!--                                 :prop="item.value"-->
<!--                                 :label="item.name"-->
<!--                                 show-overflow-tooltip>-->
<!--                </el-table-column>-->

        <el-table-column prop="cms_category_id_format" label="栏目名称" width="180"></el-table-column>
        <el-table-column prop="content_title" label="文章标题" width="500" show-overflow-tooltip>
          <template slot-scope="props">
            <!--            <span @click="tabRouter(props.row)" class="tabLink">{{ props.row.content_title }}</span>-->
            <span class="tabLink">{{ props.row.content_title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content_author" label="作者名称"></el-table-column>
        <el-table-column prop="release_time_format" label="发布时间"></el-table-column>
      </el-table>

    </div>
    <!--      page-->
    <el-row class="article-list-page pageStyle" v-if="total > 0">
      <el-pagination layout="total, sizes, prev, pager, next" :current-page="pageNum" :total="total"
                     @current-change="(curr) => {this.pageNum = curr ; this.getDataList()}"
                     :page-sizes="[10, 20, 30, 50, 100]"
                     @size-change="(s) => {this.pageSize = s ; this.getDataList()}"
                     :page-size="pageSize">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
    import {queryPageList, contentDelete, testingObject} from '@/api/article-manage/article.js'

    export default {
        // props: {
        //     tableKey: {
        //         type: Array,
        //         default: [{
        //             name: '栏目名称',
        //             value: 'cms_category_id_format'
        //         }, {
        //             name: '文章标题',
        //             value: 'content_title'
        //         }, {
        //             name: '作者名称',
        //             value: 'content_author'
        //         }, {
        //             name: '发布时间',
        //             value: 'release_time_format'
        //         }]
        //     },
        // },
        name: "index.vue",
        data() {
            return {
                rowData: {},
                articleAttr: [{
                    value: 1,
                    label: '头条'
                }, {
                    value: 2,
                    label: '推荐'
                }, {
                    value: 3,
                    label: '图片'
                }, {
                    value: 4,
                    label: '幻灯'
                }],
                articleVal: '',
                articleTitle: '',
                tableData: [],
                total: 0, // 记录个数
                pageNum: 1, // 当前页
                pageSize: 10, // 页大小
                btnDisabled: false
            }
        },
        methods: {
            // 获取新闻列表
            getDataList() {
                if (this.$route.query.cms_category_id) {
                    let a = new FormData()
                    a.append("cms_category_id", this.$route.query.cms_category_id)
                    a.append("content_title", this.articleTitle)
                    a.append("pageNum", this.pageNum)
                    a.append("pageSize", this.pageSize)
                    a.append("orderBy", '')
                    queryPageList(a).then(res => {
                        if (this.$route.query.category_single_page === 1) this.btnDisabled = true
                        this.tableData = res.data.list
                        this.total = res.data.total
                    })
                } else {
                    let b = new FormData()
                    b.append("cms_category_id", 1)
                    b.append("content_title", this.articleTitle)
                    b.append("pageNum", this.pageNum)
                    b.append("pageSize", this.pageSize)
                    b.append("orderBy", '')
                    queryPageList(b).then(res => {
                        this.tableData = res.data.list
                        this.total = res.data.total
                    })
                }

            },
            // tabRouter(row) {
            //     this.$router.push({ name: 'articleManage', query: row })
            // },
            resetBtn() {
                this.articleVal = ''
                this.articleTitle = ''
            },
            // 点击行操作
            rowClick(row, column, event) {
                if (this.rowData.id === undefined) {
                    this.rowData = row
                    this.$refs.contListTable.setCurrentRow(row)
                } else if (this.rowData.id === row.id) {
                    this.$refs.contListTable.setCurrentRow()
                    this.rowData = {}
                } else {
                    this.rowData = row
                    this.$refs.contListTable.setCurrentRow(row)
                }
            },
            // 添加文章
            doAdd(row, num) {
                //  添加条件 根据前选择的 栏目类型进行页面的跳转 如果是父级栏目 提示不能添加
                if (this.$route.query.cms_category_id) {
                    this.$route.query.num = num
                    this.$router.push({name: 'articleManage', query: this.$route.query})
                } else {
                    this.$route.query.cms_category_id = 1
                    this.$route.query.num = num
                    this.$router.push({name: 'articleManage', query: this.$route.query})
                }
            },
            // 编辑文章内容
            doEdit(row, num) {
                if (testingObject(row)) {
                    this.$message.warning('请选择文章')
                } else {
                    row.num = num
                    this.$router.push({name: 'articleManage', query: row})
                }
            },
            // 删除文章
            doDelete(row) {
                if (testingObject(row)) {
                    this.$message.warning('请选择文章')
                } else {
                    this.$confirm('你确定要删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let a = new FormData()
                        a.append("id", row.id)
                        contentDelete(a).then(res => {
                            if (res.code === 1000) this.$message.success('操作成功')
                            this.getDataList()
                        }).catch(() => {
                            this.$message.warning('操作失败, 请重试!')
                        })
                    })
                }
            }
        },
        mounted() {
            this.getDataList()
        }
    }
</script>

<style lang="less" scoped>
  .article-list {
    .article-list-form {
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
    }

    .article-list-tab {
      padding: 10px;
      background-color: #fff;

      .tabLink {
        color: #333;
        cursor: pointer;
        text-decoration: none;

        &:hover {
          color: #0a628f;
        }
      }
    }
  }
</style>
