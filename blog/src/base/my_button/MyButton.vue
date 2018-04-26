<!--
  Button组件

  属性
  value：设置按钮上的文字
  size:设置按钮大小，有三种[larger,middle,small]
  color：设置按钮的背景色，有三种[primary,warm,success]
  click：设置按钮的点击事件
-->
<template>
  <div>
    <span :class="fontClass"></span>
    <button @click="click" class="button" :class="[size,color]">{{value}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '点击'
      },
      size: {
        type: String,
        default: 'small'
      },
      color: {
        type: String,
        default: 'primary'
      },
      click: {
        type: Function,
        default: function () {
        }
      },
      fontClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .button {
    border: none;
    color: #fff;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  .primary {
    background: #419fff;
  }

  .warm {
    background: red;
  }

  .success {
    background: limegreen;
  }

  .larger {
    width: 100%;
    height: 30px;
    font-size: 15px;
  }

  .middle {
    width: 50%;
    height: 30px;
  }

  .small {
    width: 60px;
    height: 26px;
  }
</style>
