<template>
  <div class="video-wrapper" v-if="show">
    <video-player v-bind="$attrs" ref="videoPlayer"/>
    <div class="close" @click="$emit('update:show', false)"></div>
  </div>
</template>

<script>
import videoPlayer from './videoPlayer'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    videoPlayer
  },
  watch: {
    show (n) {
      if (n === false) {
        this.$refs['videoPlayer'] && this.$refs['videoPlayer'].dispose()
      }
    }
  },
  beforeDestroy () {
    this.$refs['videoPlayer'] && this.$refs['videoPlayer'].dispose()
  }
}
</script>

<style lang="less" scoped>
.video-wrapper{
  width: 480px;
  height: 270px;
  padding: 0;
  border: 3px solid #eee;
  position: absolute;
  left: 0;
  top: 70px;
  z-index: 0;
  .close{
    position: absolute;
    cursor: pointer;
    right: 2px;
    top: 2px;
    width: 25px;
    height: 25px;
    /*background: url('~@image/home/i_close.png');*/
    background-size: 100% 100%;
    z-index: 1;
  }
}
</style>
