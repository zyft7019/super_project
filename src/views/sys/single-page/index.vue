<template>
  <div class="content-wrap wrapper-content">
    <single-from :key="key"></single-from>
  </div>
</template>
<script>
    import singleFrom from '@/components/single-from'

    export default {
        // 添加组件
        components: {singleFrom},
        computed: {
            key() {
                console.log(this.$route.name)
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>
<style lang="less" scoped></style>
