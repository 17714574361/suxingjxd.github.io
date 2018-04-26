<template>
  <div id="app" @click="clear">
    <actionbar :is-login="isLogin"></actionbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Actionbar from 'base/actionbar/Actionbar'
  // import bus from "common/js/eventBus";
  import AV from 'leancloud-storage'
  import {getEl} from "api/dom";

  export default {
    name: 'App',
    data() {
      return {
        isLogin: false
      }
    },
    components: {
      Actionbar
    },
    created() {

    },
    mounted() {
      let self = this;
      eventBus.$on('isLogin', (arg) => {
        self.isLogin = arg
      })
      var currentUser = AV.User.current();
      if (currentUser) {
        this.isLogin = true;
      }

    },
    methods: {
      clear(ev) {
        let tar = ev.target;
        if (tar.className.indexOf('headimg') === -1) {
          this.$children[0].$data.isShowMenu = false;
        }

      }
    }
  }
</script>

<style>
  @import "common/css/reset.css";
  html,body,#app{
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
