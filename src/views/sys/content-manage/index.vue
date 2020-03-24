<template>
  <div class="content-wrap wrapper-content">
      <article-list :key="key"></article-list>
  </div>
</template>
<script>
    import articleList from '@/components/article-list'

    export default {
        // 添加组件
        components: {articleList},
        computed: {
            key() {
                console.log(this.$route.name)
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>
<style lang="less" scoped></style>
