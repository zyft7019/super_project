<template>
  <div class="view-wrapper">
    <navbar/>
    <app-main/>
  </div>
</template>

<script>
import { AppMain, Navbar} from './components'
export default {
  components: {
    AppMain,
    Navbar
  }
}
</script>

<style lang="stylus" scoped>
.view-wrapper
  /*height 100%*/
  /*background-color #00a2d4*/
</style>
