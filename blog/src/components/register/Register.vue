<template>
  <div>
    <div class="form">
      <edit-text font-class="iconfont icon-mail" text-type="text" hint="请输入邮箱"
                 @on-result-change="onResultChangeUser"></edit-text>
      <divider></divider>
      <edit-text font-class="iconfont icon-icon-" text-type="password" hint="请输入密码"
                 @on-result-change="onResultChangePaw"></edit-text>
      <divider></divider>
      <edit-text font-class="iconfont icon-icon-" text-type="password" hint="请确认密码"
                 @on-result-change="onResultChangeRePaw"></edit-text>
      <divider></divider>
      <edit-text font-class="iconfont icon-yonghu1" text-type="text" hint="请确认昵称"
                 @on-result-change="onResultChangeNickName"></edit-text>
      <divider></divider>
      <my-button :click="to_register" size="larger" value="注册"></my-button>
      <toast :is-show-toast="isShowToast" :text="toast_text"></toast>
    </div>
  </div>
</template>


<script>
  import EditText from 'base/edit_text/EditText'
  import MyButton from 'base/my_button/MyButton'
  import Toast from 'base/toast/Toast'
  import Regular from 'api/regular'
  import AV from 'leancloud-storage'
  import Divider from 'base/divider/Divider'
  import toRegister from "../../common/js/register";

  //初始化leancloud
  AV.init('xqIvIKnYLIcAbE8XiktLGiRB-gzGzoHsz',
    'ts9zN6qUeQrFa9V8Q5vngCGj')

  /**
   * username: 用户名
   * password: 密码
   * repassword: 重复密码
   * nickname: 昵称
   * toast_text: 提示信息
   * isShowToast: 是否显示提示信息
   */
  export default {
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        nickname: '',
        toast_text: '',
        isShowToast: false,
      }
    },
    components: {
      EditText,
      MyButton,
      Toast,
      Divider
    },
    mounted() {
      //是否为100%布局
      eventBus.$emit('is100', false)
    },
    methods: {
      to_register() {
        if (this.username === '' || typeof this.username === 'undefined') {
          this.isShowToast = true;
          this.toast_text = '邮箱不能为空';
          return
        } else {
          this.isShowToast = false;
        }
        if (!Regular.checkEmail(this.username)) {
          this.isShowToast = true;
          this.toast_text = '邮箱格式不正确';
          return
        } else {
          this.isShowToast = false;
        }
        if (this.password === '' || typeof this.password === 'undefined') {
          this.isShowToast = true;
          this.toast_text = '密码不能为空';
          return
        } else {
          this.isShowToast = false;
        }
        if (this.repassword !== this.password) {
          this.isShowToast = true;
          this.toast_text = '两次密码不一致';
          return
        } else {
          this.isShowToast = false;
        }
        if (this.nickname === '' || typeof this.nickname === 'undefined') {
          this.isShowToast = true;
          this.toast_text = '昵称不能为空';
        } else {
          this.isShowToast = false;
        }
        let context = this;
        toRegister(this.username, this.password, this.nickname, (result) => {
          context.$router.push({path:'/login'})
        }, (err) => {

        })


      },
      onResultChangeUser(val) {
        this.username = val
      },
      onResultChangePaw(val) {
        this.password = val
      },
      onResultChangeRePaw(val) {
        this.repassword = val
      },
      onResultChangeNickName(val) {
        this.nickname = val
      }
    }
  }
</script>

<style scoped>
  .form {
    width: 300px;
    margin: 100px auto;
  }
</style>
