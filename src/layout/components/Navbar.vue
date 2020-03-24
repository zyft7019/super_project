<template>
  <div class="top-bar">
      <div class="nav-logo">ZYFT</div>
      <!-- #91e4ed bg:#545c64 -->
      <!-- background-color="#d6dde4"
        text-color="#3c5063"
        active-text-color="red" -->
      <el-menu
        :default-active="activeIndex"
        class="comMenu"
        mode="horizontal"
        @select="handleSelect"
        :router="true">
        <el-menu-item :index="item.url" v-for="item in navData" :key="item.id">{{ item.name }}</el-menu-item>
      </el-menu>
      <div class="logout">
        <span>
          <img src="@/assets/image/bg/user_login.png" alt="">
          {{ userMsg.username }}
        </span>
        <span class="line"></span>
        <el-button class="btn" type="text" @click="logout">退出</el-button>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                userMsg: {},
                loginMsg: {},
                activeIndex: '',
                navData: []
            }
        },
        methods: {
            getNavList() {
                this.navData = require('./nav-data').default
                this.userMsg = JSON.parse(window.localStorage.getItem('userMsg'))
                this.loginMsg = JSON.parse(window.localStorage.getItem('login_msg'))
                // if (this.loginMsg) {
                //     this.activeIndex = this.$route.path
                // } else {
                //     this.$message.warning('你还没有登录，请先登录！')
                //     this.$router.push('/login')
                // }
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            // 退出
            logout() {
                this.$confirm('是否退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!',
                        duration: 1000
                    });
                    window.localStorage.removeItem('userMsg')
                    window.localStorage.removeItem('login_msg')
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
        mounted() {
            this.getNavList()
        }
    }
</script>
<style lang="less">
  .el-menu.el-menu--horizontal {
    border: none 0 !important;
  }
</style>

<style lang="less" scoped>
  .top-bar {
    display: flex;
    line-height: 60px;
    color: #3c5063;
    background-color: #d6dde4;
    // background-color: #3a3f4b;
    // box-shadow: 0px 3px 10px red;
    /*background-color: #545c64;  #767b87*/

    .nav-logo {
      width: 240px;
      height: 60px;
      padding: 0 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 24px;
      background-color: #354556;
      img {
        height: 45px;
      }
    }

    .logout {
      position: absolute;
      right: 20px;
      display: flex;

      span {
        // color: #fff;
        display: flex;
        align-items: center;

        img {
          display: inline-block;
          width: 20px;
          margin-right: 10px;
        }
      }

      .line::after {
        content: '|';
        padding: 0 15px;
        color: #3c5063;
      }

      .btn {
        color: #3c5063;
        font-size: 14px;
        &:hover {
          color: #91e4ed;
        }
      }
    }
  }
</style>

