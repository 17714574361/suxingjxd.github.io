<!--
  ActionBar

  属性
  title：设置标题
  isShowBack：是否显示返回按钮

   使用
  在ActionBar的父组件的methods方法中添加例如以下代码，
  通过bus作为中间桥梁实现同级组件的通信
  bus.$on('set_title', (arg) => {
    self.head_title = arg.title
    self.isShowBack = arg.isShowBack
    self.isShowTabs = arg.isShowTabs
  })
  在created方法中添加如下代码，实现页面的数据的更新
  bus.$emit('set_title', {title: "我的", isShowBack: false})
-->
<template>
  <div class="head">
    <h3 class="head_title">
      <router-link to="/" class="head_title_a">{{blog_title}}</router-link>
    </h3>
    <div class="wrapper">
      <div v-if="!isLogin" class="wrapper-text">
        <router-link class="text" to="/login">登录</router-link>
        <router-link class="text" to="/register">注册</router-link>
      </div>
      <div class="wrapper-img" v-if="isLogin">
        <img @click="showMenu" class="img headimg" :src="imgsrc" alt="">
        <ul class="img_menu" v-show="isShowMenu">
          <li class="item" @click="to_mine">个人中心</li>
          <li class="item" @click="to_setting">设置</li>
          <li class="item" @click="loginOut">退出登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import AV from 'leancloud-storage'

  /**
   * props:
   *  isLogin:actionbar是显示头像还是注册登录字样
   * data:
   *  isShowMenu:是否显示菜单
   *  blog_title：actionbar上的标题——博客的名称
   *  imgsrc：头像的地址
   */
  export default {
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShowMenu: false,
        blog_title: '我的博客',
        imgsrc: 'http://via.placeholder.com/40x40'
      }
    },
    mounted() {
      //获取基本数据
      let context = this;
      let currentUser = AV.User.current();
      if (currentUser) {
        let query = new AV.Query('Account');
        query.equalTo('user_id', currentUser.id);
        query.find().then(function (account) {
          // console.log('setting_mounted', account)
          context.imgsrc = account[0].attributes.headurl
          context.blog_title = account[0].attributes.blogname
        }, function (err) {
          console.log(err)
        })
      }
    },
    methods: {
      //点击头像，显示菜单
      showMenu() {
        this.isShowMenu = true
      },
      //退出登录
      loginOut() {
        this.$router.push({path: '/login'})
        AV.User.logOut();
      },
      //设置
      to_setting() {
        this.$router.push({path: '/setting'})
      },
      //个人中心
      to_mine() {
        this.$router.push({path: '/article'})
      }

    }
  }
</script>

<style scoped>

  .head {
    background: #419fff;
    color: #fff;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .head_title {
    font-size: 20px;
    width: 100%;
    text-align: center;
  }

  .head_title_a {
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
  }

  .text {
    text-decoration: none;
    color: #fff;
    margin-left: 20px;
  }

  .wrapper-img {
    position: relative;
  }

  .img {
    border-radius: 100%;
    margin-top: 8px;
    margin-right: 100px;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }

  .img_menu {
    position: absolute;
    left: -40px;
    top: 60px;
    color: #333;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 5px #aaa;
    width: 120px;
  }

  .img_menu .item {
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
  }

  .img_menu .item:hover {
    background: #419fff;
    color: #fff;
  }

  .wrapper-text {
    width: 300px;
  }
</style>
