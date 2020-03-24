<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import { getSocket } from '@/utils/socket'
export default {
  // mounted () {
  //   getSocket('/topic/test', msg => {
  //     console.log(msg)
  //   }, { selector: 'frontend msg' })
  // }
}
</script>

<style lang="stylus">
body
  height 100%
  margin 0
html
  height 100%
#app
  font-family 'Microsoft Yahei', Helvetica, Arial, '宋体', arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height 100%
  background-color #eee
  /*background-color #00a050*/
  color #646b73
ol, ul
  list-style none
  padding 0
  margin 0
</style>
