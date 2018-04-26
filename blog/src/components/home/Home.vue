<template>
  <div class="home" :class="{width:!is100}">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        is100:false
      }
    },
    mounted(){
      let self = this;
      eventBus.$on('is100', (arg) => {
        self.is100 = arg
      })
    },
    components:{
    },
    methods: {
    }
  }
</script>

<style scoped>
  .width{
    width: 960px;
  }
  .home{
    height: 100%;
    margin: 0 auto;
  }
</style>
