<template>
  <!-- <section class="app-main"> -->
  <!-- <side-bar class="sideBar"></side-bar> -->
  <!-- <el-aside>1111111111111111dsfdsf</el-aside> -->
  <!-- <transition name="fade-transform" mode="out-in"> -->
  <!--    <el-scrollbar style="height:calc(100vh - 95px)" wrap-style="overflow-x: hidden;" view-style="height: calc(100vh - 95px);">-->
  <!--       <keep-alive>-->
  <!-- <router-view class="routerView" /> -->
  <!--       </keep-alive>-->
  <!--    </el-scrollbar>-->
  <!--    <div class="backdrop" v-show="backdrop"></div>-->
  <!-- </transition> -->
  <!-- </section> -->

  <el-container class="app-main">
    <el-aside class="sideBar" width="300px">
      <side-bar></side-bar>
    </el-aside>
    <el-main>
      <router-view class="routerView" />
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import sideBar from "./sideBar";
export default {
  name: "AppMain",
  components: { sideBar }
  // computed: {
  //   // cachedViews() {
  //   //   return this.$store.state.tagsView.cachedViews
  //   // },
  //   ...mapState('home', ['backdrop']),
  //   key() {
  //     return this.$route.path
  //   }
  // }
};
</script>

<style lang="less" scoped>
.app-main {
  /* navbar 65; tag-views 30  */
  height: calc(100vh - 61px);
  /*width: 100%;*/
  overflow: hidden;
  // display: flex;
  .sideBar {
    // z-index: 2;
    // width: 280px;
    // border-right: 1px solid #767b87;
    // box-shadow: 1px 0px 10px #767b87;
    background: #ccc;
  }
  // .routerView {
  //   flex: 1;
  // }
}
</style>
