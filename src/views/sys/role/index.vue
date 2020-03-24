<template>
  <div class="role-manage wrapper-content">
    <div class="role-manage-query comSty">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input placeholder="请输入名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="refresh(true)" title="根据输入的条件查询">查 询</el-button>
          <el-button icon="el-icon-plus" @click="doAdd" type="primary" title="添加">新 增</el-button>
          <el-button @click="doEdit(rowData)" icon="el-icon-edit">编 辑</el-button>
          <el-button @click="doDelete(rowData)" icon="el-icon-delete">删 除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-page">
      <el-scrollbar style="height: 100%">
        <div class="role-manage-tab comSty">
          <el-table :data="dataList" ref="roleTable" class="comTable" @row-click="rowClick" highlight-current-row
                    stripe>
            <el-table-column prop="id" label="序号" width="50">
              <template slot-scope="scope"><span>{{ ( pageNum - 1 ) * pageSize + scope.$index + 1 }} </span></template>
            </el-table-column>
            <el-table-column prop="login_name" label="账号"></el-table-column>
            <el-table-column prop="user_name" label="昵称"></el-table-column>
            <el-table-column prop="login_password" label="密码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="create_time_format" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="props">
                <el-button type="text" @click="resetPassWord(props.row)" icon="el-icon-refresh">重置密码</el-button>
                <el-button type="text" @click="editPassWord(props.row)" icon="el-icon-edit">修改密码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="role-manage-page pageStyle" v-if="total > 0">
          <el-pagination layout="total, sizes, prev, pager, next" :current-page="pageNum" :total="total"
                         @current-change="(curr) => {this.pageNum = curr ; this.refresh()}"
                         :page-sizes="[10, 20, 30, 50, 100]"
                         @size-change="(s) => {this.pageSize = s ; this.refresh()}"
                         :page-size="pageSize">
          </el-pagination>
        </div>
      </el-scrollbar>
    </div>
    <role-dialog ref="dialog" :refresh="refresh"></role-dialog>
    <edit-dialog ref="editDialog" :refresh="refresh"></edit-dialog>
    <edit-pass-word-dialog ref="editPassWordDialog" :refresh="refresh"></edit-pass-word-dialog>
  </div>
</template>
<script>
    import roleDialog from './components/role-dialog'
    import editDialog from './components/edit-dialog'
    import editPassWordDialog from './components/edit-password-dialog'
    import {deleteAdmin, queryAdminDataList, resetPassword} from '@/api/sys/role.js'
    import {testingObject} from '@/api/sys/station.js'

    export default {
        components: {roleDialog, editDialog, editPassWordDialog},
        data: function () {
            return {
                rowData: {},
                total: 1, // 记录个数
                pageNum: 1, // 当前页
                pageSize: 10, // 页面显示条数
                dataList: [], // 数据列表
                form: {
                    id: null, // 主键
                    name: '', // 名称
                    remark: null // 备注
                },
                loading: false // 是否加载列表
            }
        },
        created: function () {
            this.refresh()
        },
        methods: {
            // 获取管理员列表及查询
            refresh() {
                let a = new FormData()
                a.append("login_name", this.form.name)
                a.append("pageNum", this.pageNum)
                a.append("pageSize", this.pageSize)
                queryAdminDataList(a).then(res => {
                  console.log(res)
                    this.dataList = res.data.list
                    this.total = res.data.total
                })
            },
            // 点击表格 获取当前 row 数据对象
            rowClick(row, column, event) {
                if (this.rowData.id === undefined) {
                    this.rowData = row
                    this.$refs.roleTable.setCurrentRow(row)
                } else if (this.rowData.id === row.id) {
                    this.$refs.roleTable.setCurrentRow()
                    this.rowData = {}
                } else {
                    this.rowData = row
                    this.$refs.roleTable.setCurrentRow(row)
                }
            },
            // 重置密码
            resetPassWord(row) {
                this.$confirm('你确定要重置密码？确定，请牢记新密码；否则原密码不会改变', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let a = new FormData()
                    a.append("id", row.id)
                    resetPassword(a).then(res => {
                        // 提示框提示重置密码
                        this.$alert('新密码为：' + res.data.login_password, '重置密码成功', {
                            confirmButtonText: '确定',
                        });
                    })
                })
            },
            // 修改密码
            editPassWord(row) {
                this.$refs['editPassWordDialog'].editPassDialog(row)
            },
            // 添加管理员
            doAdd() {
                this.$refs['dialog'].addDialog()
            },
            // 编辑管理员
            doEdit(row) {
                if (testingObject(row)) {
                    this.$message.warning('请选择管理员')
                } else {
                    this.$refs['editDialog'].editDialog(row)
                }
            },
            // 删除管理员
            doDelete(row) {
                if (testingObject(row)) {
                    this.$message.warning('请选择管理员')
                } else {
                    this.$confirm('你确定要删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let a = new FormData()
                        a.append("id", row.id)
                        deleteAdmin(a).then(res => {
                            if (res.code === 1000) {
                                this.$message.success('操作成功')
                                this.refresh()
                            } else {
                                this.$message.success('操作失败')
                            }
                        })
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  .role-manage {
    display: flex;
    flex-direction: column;
    .role-manage-query {
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
    .table-page {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
</style>
