<template>
  <div class="login-container">
    <div class="top-logo"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <!-- <div class="title-container">-->
      <!--   <h3 class="title">数安汇官网后台管理系统</h3>-->
      <!--   &lt;!&ndash; <p class="title">Joint inspection platform</p> &ndash;&gt;-->
      <!-- </div>-->
      <div class="top-line"></div>
      <div class="signIn-container">
        <div class="title-container">
          <h3 class="title">登录界面</h3>
          <!-- <p class="title">Joint inspection platform</p> -->
        </div>
        <!-- <div style="color: #f7f7f7;font-size: 26px;">登 录 Sign In</div> -->
        <!-- username -->
        <span class="inp-title">用户名</span>
        <el-form-item prop="username">
          <span class="svg-container el-icon-user">
            <!-- <svg-icon icon-class="user" /> -->
          </span>
          <el-input
            class="inp"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <!-- password -->
        <span class="inp-title">密码</span>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container el-icon-lock" icon="el-icon-user-solid">
              <!-- <svg-icon icon-class="password" /> -->
            </span>
            <el-input
              icon="el-icon-user-solid"
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd"></span>
          </el-form-item>
        </el-tooltip>

        <el-button class="sign-btn" :loading="loading" icon="el-icon-s-promotion" @click.native.prevent="handleLogin">登
          录
        </el-button>
        <el-button class="sign-btn" :loading="loading" icon="el-icon-refresh" @click="resetBtn">重 置</el-button>
      </div>
    </el-form>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
    </el-dialog>
  </div>
</template>

<script>
    import {validUsername} from '@/utils/validate'
    import {signIn, queryPublicKey} from '@/api/signIn/sign.js'
    import {JSEncrypt} from 'jsencrypt'

    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!(value)) {
                    callback(new Error('请输入有效用户名'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码长度需大于6位'))
                } else {
                    callback()
                }
            }
            return {
                // loginForm: {
                //     username: 'admin',
                //     password: 'admin01..'
                // },

                rCode: '', // 随机字符串
                public_key: '',
                loginForm: {
                    username: 'test_lujie',
                    password: 'lujie22',
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            }
        },
        watch: {
            // $route: {
            //   handler: function(route) {
            //     console.log(route);

            //     const query = route.query
            //     if (query) {
            //       this.redirect = query.redirect
            //       this.otherQuery = this.getOtherQuery(query)
            //     }
            //   },
            //   immediate: true
            // }
        },
        mounted() {
            if (this.loginForm.username === '') {
                this.$refs.username.focus()
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus()
            }
            this.getpublicKey()
        },
        destroyed() {
            // window.removeEventListener('storage', this.afterQRScan)
        },
        methods: {
            checkCapslock({shiftKey, key} = {}) {
                if (key && key.length === 1) {
                    if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                        this.capsTooltip = true
                    } else {
                        this.capsTooltip = false
                    }
                }
                if (key === 'CapsLock' && this.capsTooltip === true) {
                    this.capsTooltip = false
                }
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            // 获取publicKey
            getpublicKey() {
                this.rCode = this.createRandomCode(6)
                let rStr = new FormData()
                rStr.append("clientid", this.rCode)
                queryPublicKey(rStr).then(res => {
                    if (res.data.clientid === this.rCode) {
                        this.public_key = res.data.public_key
                    }
                    // 此处判断生成的字符串和传到后台返回的字符串是否相等
                })
            },
            // 生成随机 字符串
            createRandomCode(len) {
                // 生成随机数
                len = len || 6;
                let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                let maxPos = $chars.length;
                let randomCode = '';
                for (let i = 0; i < 6; i++) {
                    randomCode += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return randomCode
            },
            //  加密
            encryptedData(publicKey, data) {
                // 新建JSEncrypt对象
                let encryptor = new JSEncrypt();
                // 设置公钥
                encryptor.setPublicKey(publicKey);
                // 加密数据
                return encryptor.encrypt(data);
            },
            // 登录
            handleLogin() {
                let encryptedPassword = this.encryptedData(this.public_key, this.loginForm.password)
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let a = new FormData()
                        a.append("username", this.loginForm.username)
                        a.append("password", encryptedPassword)
                        a.append("clientid", this.rCode)
                        // signIn(a).then(res => {
                            // if (res.code === 1001) this.$message.info(res.msg + '! 用户名或密码错误')
                            // if (res.code === 1000) {
                                this.$message({
                                    type: 'success',
                                    // message: res.msg,
                                    message: '登录成功',
                                    duration: 1000
                                })
                                window.localStorage.setItem('userMsg', JSON.stringify(this.loginForm))
                                // window.localStorage.setItem('login_msg', JSON.stringify(res))
                                this.$router.push({name: 'contentManage'})
                                // this.$router.push({name: 'articleManage'})
                                // this.$router.push({name: 'singlePage'})
                            // } else {
                                // this.$message.warning(res.msg + '! 用户名或密码错误')
                            // }
                        // })
                    } else {
                        this.$message.error('参数不合法')
                    }
                })
            },
            // 重置
            resetBtn() {
                this.$refs.loginForm.resetFields()
                this.loginForm.username = ''
                this.loginForm.password = ''
            },
            // getOtherQuery(query) {
            //   return Object.keys(query).reduce((acc, cur) => {
            //     if (cur !== 'redirect') {
            //       acc[cur] = query[cur]
            //     }
            //     return acc
            //   }, {})
            // }
            // afterQRScan() {
            //   if (e.key === 'x-admin-oauth-code') {
            //     const code = getQueryObject(e.newValue)
            //     const codeMap = {
            //       wechat: 'code',
            //       tencent: 'code'
            //     }
            //     const type = codeMap[this.auth_type]
            //     const codeName = code[type]
            //     if (codeName) {
            //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
            //         this.$router.push({ path: this.redirect || '/' })
            //       })
            //     } else {
            //       alert('第三方登录失败')
            //     }
            //   }
            // }
        }
    }
</script>

<style lang="less">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  @bg: #283443;
  // @bg: rgba(40, 52, 67, .8);
  @light_gray: #fff;
  @cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
    .login-container .el-input input {
      color: @cursor;
      // background-image: url('~@image/arena/robot_#{$name}_h.jpg')
    }
  }

  .inp {
    /*background-color: aqua;*/
  }

  .el-form-item--small .el-form-item__error {
    padding-top: 10px;
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: @light_gray;
        height: 47px;
        caret-color: @cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="less" scoped>
  @bg: #2d3a4b;
  // @dark_gray:#889aa4;
  @dark_gray: #fff;
  @light_gray: #eee;

  .login-container {
    margin: 0 auto;
    min-height: 100%;
    width: 100%;
    // height: 100%;
    background-color: @bg;
    // background: url('~@image/bg/bg-#{name}.jpg');
    // background: url('../../../assets/image/bg/about_3.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .top-logo {
      position: relative;
      left: 25%;
      top: 4%;
      width: 313px;
      height: 98px;
      /*background: url('../../../assets/image/bg/top_logo.png') no-repeat;*/
    }

    .login-form {
      position: relative;
      width: 550px;
      max-width: 100%;
      padding: 80px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #ccc;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: @dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 38px;
        color: @light_gray;
        letter-spacing: 3px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      h3 {
        font-size: 30px;
      }

      p {
        color: #454545;
        font-size: 15px;
        margin-bottom: 40px;
      }
    }

    .top-line {
      height: 5px;
      /*background-color: #1dd1b4;*/
      background-color: #3b79b5;
    }

    .signIn-container {
      // height: 300px;
      // width: 600px;
      padding: 35px 45px;
      /*background-color: rgba(8, 48, 50, .8);*/
      background-color: rgba(23, 40, 59, .8);

      .inp-title {
        display: inline-block;
        // height: 50px;
        /*color: #1dd1b4;*/
        /*color: #3b79b5;*/
        color: #91e4ed;
        margin-bottom: 10px;
      }

      .sign-btn {
        color: #fff;
        margin-top: 20px;
        margin-bottom: 30px;
        border: none 0;
        background-color: #3b79b5;

        &:hover {
          background-color: #91e4ed;
        }
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: @dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
