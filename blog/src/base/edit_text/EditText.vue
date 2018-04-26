<!--
  EditText
  属性
  fontClass:设置字体图片
  hint：设置提示
  textType：设置input的类型
  text:设置值

  使用
  在调用该组件时，需要添加on-result-change事件，此事件用来同步数据，当EditText数据改变是，外部的数据也改变
  例如 ：
  <edit-text :hint="hint_user" :textType="type_user" @on-result-change="onResultChangeUser"></edit-text>
  然后在methods方法中设置
   onResultChangeUser(val) {
     this.username = val
   }

-->
<template>
  <div class="editText">
    <span class="font" :class="fontClass"></span><input class="editText_input" :type="textType" v-model="text"
                                                        :placeholder="hint">
  </div>
</template>

<script>
  export default {
    props: {
      fontClass: {
        type: String,
        default: ''
      },
      hint: {
        type: String,
        default: ''
      },
      textType: {
        type: String,
        default: 'text'
      },
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    updated() {
      let editText_input = document.getElementsByClassName('editText_input')[0]
      editText_input.setAttribute('type', this.props.textType)
    },
    watch: {
      text(val) {
        this.$emit('on-result-change', val)
      }
    }
  }
</script>

<style scoped>
  @import '../../common/css/iconfont/iconfont.css';

  .editText {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3px;
  }

  .editText input {
    width: 100%;
    height: 30px;
    padding: 0 6px;
    border: none;
    background: none;
    outline: none;
  }

  .font {

  }
</style>
