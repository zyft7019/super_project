<!--编辑页面-->
<template>
  <el-dialog :title="title" width="25%" center :visible.sync="show">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label='管理员昵称' prop='nickname'>
        <el-input placeholder='请输入昵称' v-model='form.user_name' maxlength="20"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button @click="save()" type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import {editAdmin} from '@/api/sys/role.js'

    export default {
        props: ['refresh'],
        data() {
            const checkName = (rule, value, callback) => {
                value = value + ''
                if (value) {
                    let rgx = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,20}/
                    if (value.match(rgx) == null) {
                        return callback(new Error('名称长度不可以超过20个字符,且只能录入中英文及数字!'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                title: '',
                form: this.initForm(),
                dialogMode: 'save',
                show: false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {validator: checkName, trigger: 'change'}],
                    remark: [
                        {required: false, message: '请输入备注', trigger: 'blur'},
                        {min: 1, max: 20, message: '备注长度不正确', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            save() { // 新增及修改记录
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let a = new FormData()
                    a.append("id", this.form.id)
                    a.append("user_name", this.form.user_name)
                    editAdmin(a).then(res => {
                        if (res.code === 1000) this.$message.success(res.msg)
                        this.show = false
                        this.refresh()
                    })
                })
            },
            initForm() { // 初始数据
                return {
                    id: null, // 管理员id
                    user_name: null
                }
            },
            editDialog(row) { // 修改
                this.title = '修改管理员'
                this.dialogMode = 'update'
                this.form = {...row}
                this.show = true
            }
        }
    }
</script>
<style></style>
