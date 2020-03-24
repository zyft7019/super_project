<template >
  <videoPlayer id="videoPlayer" class="common-player videoPlayer" :options="playerOptions" :src="this.src" ref="videoPlayer"></videoPlayer>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
export default {
  props: {
    src: {
      type: String
    }
  },
  components: {
    videoPlayer
  },
  watch: {
    src: {
      handler (src) {
        src && this.setSrc(src)
      }
    }
  },
  data () {
    return {
      playerOptions: {
        flash: {
          swf: '/static/video-js.swf'
        },
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。

        sources: [{
          type: 'rtmp/mp4',
          src: this.src || 'rtmp://192.168.20.186:1935/live/aaa'
          // src: "rtmp://192.168.20.23:1935/0101/r197",
        }],
        techOrder: ['flash'],
        controls: true, // 用于表示能够操作视频播放与停止的用户界面，属于逻辑属性
        width: 100, // 内容属性：表示视频的横宽。
        height: 100// 内容属性：表示视频的纵高
      }
    }
  },
  methods: {
    setSrc (src) {
      this.playerOptions = Object.assign(this.playerOptions, {
        sources: [{
          type: 'rtmp/mp4',
          src: this.src
        }]
      })
    },
    dispose () {
      // this.$refs['videoPlayer'].player.pause()
      this.$refs['videoPlayer'].player && this.$refs['videoPlayer'].player.dispose()
    }
  }
}
</script>
<style>
  @media screen and (max-width: 1920px) {
    #videoPlayer {
      height: 100%;
      width: 100%;
      display: inline-block;
      text-align: center;
    }
  }
  @media screen and (min-width: 3840px) {
    #videoPlayer {
      height: 100%;
      width: 70%;
      display: inline-block;
      text-align: center;
      position: relative;
      top: 0;
      left: 50%;
      transform: translate(-50%);
    }
  }
</style>
