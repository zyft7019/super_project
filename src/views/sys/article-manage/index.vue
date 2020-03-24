<!-- 文章管理 -->
<template>
    <div class="article-manage">
      <content-from :key="key"></content-from>
    </div>
</template>

<script>
    import contentFrom from '@/components/content-from'
    export default {
        name: "index.vue",
        components: { contentFrom },
        computed: {
            key() {
                console.log(this.$route.name)
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        }
    }
</script>

<style scoped>
  .article-manage {
    background-color: #fff;
    padding: 10px;
    overflow: auto;
  }
</style>
