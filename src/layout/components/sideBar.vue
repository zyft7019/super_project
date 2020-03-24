<template>
  <div style="height: 100%; background-color: #4c5e70;overflow: auto">
    <!-- :current-node-key="currNodeKey" -->
    <el-scrollbar style="height: 100%">
      <el-tree
        class="comTree"
        ref="navTree"
        :highlight-current="true"
        :data="treeData"
        :props="defaultProps"
        node-key="cms_category_id"
        @current-change="getDeptTreeNodeData"
        :default-expand-all="true"
        :expand-on-click-node="false"></el-tree>
      <span class="custom-tree-node" slot-scope="{ node,data}">{{data.name}}</span>
    </el-scrollbar>
  </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {getRecordLists} from '@/api/sideBar/sideBar.js'

    export default {
        data() {
            return {
                treeData: [],
                currNodeKey: 1,
                defaultProps: {
                    children: 'children',
                    label: 'category_title'
                }
            };
        },
        watch: {},
        computed: {
            ...mapState('sideBar', ['robotOnBoard'])
        },
        methods: {
            queryDataList(nodeKey) {
                // getRecordLists().then(res => {
                //     this.treeData = res.data
                //     this.$nextTick(() => {
                //         this.$refs.navTree.setCurrentKey(nodeKey);
                //     })
                // })
                this.treeData = require('./treeData.js').default
            },
            getDeptTreeNodeData(data, node) {
                // this.$store.commit('SET_HOME_STATE', { key: 'robotOnBoard', value: data.cms_category_id })
                if (data.children) {
                    this.$message.info('当前节点无数据，请点击子节点进行查看')
                    // this.$router.push({name: 'contentManage', query: data})
                } else {
                    this.$router.push({name: 'contentManage', query: data})
                }
            }
        },
        mounted() {
            // this.currNodeKey = this.robotOnBoard
            this.queryDataList(this.robotOnBoard)
        }
    };
</script>
<style scoped></style>
