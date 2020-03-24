<template>
  <div>
    <router-link :to="`/test/${i}`" v-for="i in links" :key="i" class="links">{{i}}</router-link>
    <h3>e</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: ['a','b','c','d','e','f','g','h','i']
    }
  }
}
</script>

<style>
.links {
  margin: 0 20px;
}
</style>
