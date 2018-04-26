<template>
  <div>
    <div class="form">
      <edit-text font-class="iconfont icon-mail" text-type="text" hint="请输入邮箱"
                 @on-result-change="onResultChangeUser"></edit-text>
      <divider></divider>
      <edit-text font-class="iconfont icon-icon-" text-type="password" hint="请输入密码"
                 @on-result-change="onResultChangePaw"></edit-text>
      <divider></divider>
      <my-button :click="to_login" size="larger" value="登录"></my-button>
      <toast :isShowToast="isShowToast" :text="toast_text"></toast>
    </div>
  </div>
</template>

<script>
  import EditText from 'base/edit_text/EditText'
  import MyButton from 'base/my_button/MyButton'
  import Divider from 'base/divider/Divider'
  import Toast from 'base/toast/Toast'
  import Regular from 'api/regular'
  import AV from 'leancloud-storage'
  import toLogin from "../../common/js/login";
  // import Bus from "common/js/bus";

  /**
   * data:
   *  username: 邮箱，账号
   *  password: 密码
   *  toast_text: 提示信息
   *  isShowToast: 是否显示提示信息
   */
  export default {
    data() {
      return {
        username: '',
        password: '',
        toast_text: '',
        isShowToast: false,
      }
    },
    mounted() {
      //当用户不存在的时候表示没有登录
      if (!AV.User.current()) {
        eventBus.$emit('isLogin', false)
      }
    },
    components: {
      EditText,
      MyButton,
      Toast,
      Divider
    },
    methods: {
      onResultChangeUser(val) {
        this.username = val
      },
      onResultChangePaw(val) {
        this.password = val
      },
      //登录按钮
      to_login() {
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
        } else {
          this.isShowToast = false;
        }

        let context = this;

        //登录
        toLogin(this.username, this.password, (loginedUser) => {

          context.isShowToast = false;
          eventBus.$emit('isLogin', true)
          context.$router.push({path: '/'})
          console.log(loginedUser)

        }, (err) => {

          context.isShowToast = true;
          context.toast_text = '登录失败，检查账号和密码是否正确';
          console.log(1)
          console.log(err.toString())

        })

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
