<template>
  <body>
    <Top/>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </body>
</template>

<script>
  import Top from '@/components/Top.vue'

  export default {
    name: 'MainLayout',
    components: {
      Top
    }
  }
</script>

<style scoped>
</style>