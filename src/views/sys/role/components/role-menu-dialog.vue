<template>
  <el-dialog width="30%" center title="菜单信息" :visible.sync="showFunc" append-to-body>
    <el-tree
      :data="FuncTreeList"
      node-key="id"
      :show-checkbox="true"
      :check-on-click-node="true"
      default-expand-all
      :expand-on-click-node="false"
      ref="treeBox"
      draggable
      v-loading="loading"
      element-loading-text="正在加载......">
      <span class="custom-tree-node" slot-scope="{ node,data}"> {{ data.name }}
        <span style="margin-left: 50px"></span>
      </span>
    </el-tree>
    <el-row>
      <el-button type="primary" @click="showFunc = false">取 消</el-button>
      <el-button type="primary" @click="doSubmit">提 交</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { queryDataList, queryMenuDataList, deleteRoleMenu, addRoleMenu } from '@/api/sys/role.js'
export default {
  data() {
    return {
      showFunc: false,
      FuncTreeList: [], // 数据列表
      checked: [], // 已选中的菜单节点id
      loading: false,
      RoleFuncList: [], // 要插入的关联信息
      roleForm: {},
      isRouterAlive: true,
      roleFuncForm: {
        id: null,
        funcId: null, // 菜单id
        roleId: null // 角色id
      }
    }
  },
  methods: {
    doFunc(row) { // 关联菜单
      this.roleForm = row
      this.showFunc = true
      this.queryTree()
    },
    queryTree() {
      const requestData = { ...this.roleFuncForm, roleId: this.roleForm.id }
      queryDataList(requestData).then(res => {
        // console.log(res);
        
        this.FuncTreeList = res // 数据列表
        queryMenuDataList(requestData).then(res => {
          res.map(item => {
            this.$refs.treeBox.setChecked(item.funcId, true, false)
          })
        }).catch(() => {
          this.$message.error('连接超时, 稍后请重试!')
        })
      }).catch(() => {
        this.$message.error('获取菜单树出错, 稍后请重试!')
      })
    },
    doSubmit() {
      this.checked = this.$refs.treeBox.getCheckedKeys(false)
      // console.log(this.checked)
      deleteRoleMenu(this.roleForm.id).then(res => {
        // console.log(res);
      })
      // 关联表中添加值
      this.RoleFuncList = this.checked.map(item => {
        return { funcId: item, roleId: this.roleForm.id }
      })
      addRoleMenu(this.RoleFuncList).then(res => {
        // console.log(res);
      })
      this.showFunc = false
    }
  }
}
</script>
<style></style>
