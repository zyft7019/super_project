<template>
  <el-dialog :title="title" width="25%" center :visible.sync="show">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label='管理员名称' prop='login_name'>
        <el-input placeholder='请输入管理员名称' v-model='form.login_name' maxlength="20"/>
      </el-form-item>
      <el-form-item label='管理员昵称' prop='user_name'>
        <el-input placeholder='请输入昵称' :disabled="disabled" v-model='form.user_name' maxlength="20"/>
      </el-form-item>
      <el-form-item label='管理员密码' prop='login_password'>
        <el-input placeholder='请输入密码' :disabled="disabled" v-model='form.login_password' maxlength="20"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button @click="save()" type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import {addAdmin} from '@/api/sys/role.js'

    export default {
        props: ['refresh'],
        data() {
            const checkName = (rule, value, callback) => {
                value = value + ''
                if (value) {
                    let rgx = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,20}/
                    if (value.match(rgx) == null) {
                        return callback(new Error('请输入入中英文及数字!'))
                    } else {
                        callback()
                    }
                }
            }
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
                form: this.initForm(),
                dialogMode: 'save',
                disabled: false,
                show: false,
                rules: {
                    login_name: [
                        {required: true, message: '请输入管理员名称', trigger: 'blur'},
                        {validator: checkName, trigger: 'change'}
                    ],
                    user_name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 1, max: 20, message: '昵称长度不正确', trigger: 'blur'}
                    ],
                    login_password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: checkPassWord, min: 8, max: 10, message: '密码长度为8~10个字符包含数字、大小写字母、特殊字符并且不能包含空格', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 新增管理员
            save() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let a = new FormData()
                    a.append("login_name", this.form.login_name)
                    a.append("login_password", this.form.login_password)
                    a.append("user_name", this.form.user_name)
                    addAdmin(a).then(res => {
                        console.log(res)
                        if (res.code === 1000) this.$message.success(res.msg)
                        this.show = false
                        this.refresh()
                    })
                })
            },
            initForm() { // 初始数据
                return {
                    login_name: null, // 名称
                    login_password: null, // 密码
                    user_name: null
                }
            },
            addDialog() { // 新增
                this.title = '新增管理员'
                this.dialogMode = 'save'
                this.form = this.initForm()
                this.disabled = false
                this.show = true
            }
        }
    }
</script>
<style></style>
