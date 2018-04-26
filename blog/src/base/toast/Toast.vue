<template>
  <div class="toast" v-if="isShowToast">
    <span class="toast-text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      toast_time: {
        type: Number,
        default: 3000
      },
      isShowToast: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    mounted() {
      setTimeout(function () {
        this.isShowToast = false;
      },this.toast_time);
    }
  }
</script>

<style scoped>
  .toast {
    padding: 20px;
    text-align: center;
  }

  .toast-text {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    color: #fff;
    padding: 5px 10px;
    font-size: 14px;
  }
</style>
