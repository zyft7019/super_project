<!--编辑页面-->
<template>
  <el-dialog :title="title" width="25%" center :visible.sync="show">
    <el-form :model="passForm" ref="form" :rules="rules" label-width="100px">
      <el-form-item label='旧密码' prop='login_password_old'>
        <el-input placeholder='请输入旧密码' v-model='passForm.login_password_old' maxlength="20"/>
      </el-form-item>
      <el-form-item label='新密码' prop='login_password'>
        <el-input placeholder='请输入新密码' v-model='passForm.login_password' maxlength="20"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button @click="save()" type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import {editPassword} from '@/api/sys/role.js'

    export default {
        props: ['refresh'],
        data() {
            // 密码检测
            const checkPassWord = (rule, value, callback) => {
                if (value) {
                    let name = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*.?])[\da-zA-Z~!@#$%^&*.?]{8,10}$/;
                    // let name = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])(?=.\S*$).{6,10}$/;
                    if (value.match(name) == null) {
                        return callback(new Error('输入的密码不能含空格！'))
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                title: '',
                passForm: this.initForm(),
                dialogMode: 'save',
                show: false,
                rules: {
                    login_password: [ // 新密码
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {validator: checkPassWord, min: 8, max: 10, message: '密码长度为6~10个字符包含数字、字母、特殊字符并且不能包含空格', trigger: 'blur'}
                    ],
                    login_password_old: [ // 旧密码
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '密码长度不正确', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            save() { // 新增及修改记录
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let b = new FormData()
                    b.append("id", this.passForm.id)
                    b.append("login_password_old", this.passForm.login_password_old)
                    b.append("login_password", this.passForm.login_password)
                    editPassword(b).then(res => {
                        if (res.code === 1000) this.$message.success(res.msg)
                        this.passForm.login_password = null
                        this.passForm.login_password_old = null
                        this.show = false
                        this.refresh()
                    })
                })
            },
            initForm() { // 初始数据
                return {
                    id: null, // 管理员id
                    login_password: null, // 新密码
                    login_password_old: null // 旧密码
                }
            },
            editPassDialog(row) { // 修改
                this.title = '修改密码'
                this.passForm.id = row.id
                this.passForm.login_password = null
                this.passForm.login_password_old = null
                this.show = true
            }
        }
    }
</script>
<style></style>
