<template>
  <div class="setting">
    <div class="setting-top">
      <img class="img head_img" :src="headurl" alt="">
      <span @click="to_change_img" class="btn">更换头像</span>
      <input type="file" class="file">
    </div>
    <div class="form">
      <div class="form_group">
        <span class="label">邮箱</span>
        <span class="account">{{email}}</span>
      </div>
      <div class="form_group">
        <span class="label">密码</span>
        <edit-text @on-result-change='' hint="请输入新密码" text-type="password" class="et_nickname"></edit-text>
        <span class="btn">修改密码</span>
      </div>
      <div class="form_group">
        <span class="label">昵称</span>
        <edit-text :text="nickname" @on-result-change='onResultChangeNickName' hint="请输入昵称" text-type='text'
                   class="et_nickname"></edit-text>
      </div>
      <div class="form_group">
        <span class="label">博客名称</span>
        <edit-text :text="blogName" @on-result-change='onResultChangeBlogName' hint="请输入博客名称" text-type='text'
                   class="et_blog"></edit-text>
      </div>
      <div class="form_group">
        <span class="label">个人简介</span>
        <textarea v-model="introduce" placeholder="请输入个人简介" class="et_introduce"></textarea>
      </div>
      <div class="form_group">
        <span class="label">个人网址</span>
        <edit-text :text="web" @on-result-change='onResultChangeWeb' hint="http://你的网址" class="et_web"></edit-text>
      </div>
      <div class="form_group">
        <span @click="to_save" class="btn save_btn">保存</span>
        <toast :isShowToast="isShowToast" :text="toast_text"></toast>

      </div>

    </div>
  </div>
</template>

<script>
  import EditText from "base/edit_text/EditText";
  import {getEl} from "api/dom";
  import AV from 'leancloud-storage'
  import Toast from 'base/toast/Toast'
  import {getUserInfo, save_headurl, save_info} from "../../common/js/setting";

  export default {
    data() {
      return {
        email: '',
        nickname: '',
        blogName: '',
        introduce: '',
        web: '',
        isShowToast: false,
        toast_text: '',
        headurl: 'http://via.placeholder.com/100x100'
      }
    },
    components: {
      EditText,
      Toast
    },
    mounted() {
      let context = this;
      let currentUser = AV.User.current();
      context.email = currentUser.attributes.username

      getUserInfo(currentUser.id, (account) => {
        context.headurl = account[0].attributes.headurl
        context.nickname = account[0].attributes.nickname
        context.blogName = account[0].attributes.blogname
        context.introduce = account[0].attributes.introduce
        context.web = account[0].attributes.web
      }, (err) => {

      })


    },
    methods: {
      onResultChangeNickName(val) {
        this.nickname = val
      },
      onResultChangeBlogName(val) {
        this.blogName = val
      },
      onResultChangeWeb(val) {
        this.web = val
      },
      to_save() {
        if (this.nickname === '' || typeof this.nickname === 'undefined') {
          this.isShowToast = true
          this.toast_text = '昵称不能为空'
          return
        }
        if (this.blogName === '' || typeof this.blogName === 'undefined') {
          this.isShowToast = true
          this.toast_text = '博客名称不能为空'
          return
        }
        this.isShowToast = false
        let context = this;
        save_info(this.nickname, this.blogName, this.introduce, this.web, (account) => {
          alert('success');
        }, (err) => {
          alert('fail');
        })

      },
      to_change_img() {
        // console.log(132)
        let file = getEl('file')[0];
        let img = getEl('img');
        file.click()
        file.onchange = function () {
          let file = this.files[0];
          if (window.FileReader) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (ev) {
              // console.log(ev.target.result)
              for (let item of img) {
                item.setAttribute('src', ev.target.result)
              }
              // let localFile = file;

              save_headurl(file, (account) => {
                alert('success');
              }, (err) => {
                alert('fail');
              })


            }

          }
        }

      }
    }
  }
</script>

<style scoped>
  .file {
    position: absolute;
    left: -9999px;
  }

  .setting {
    width: 660px;
    height: 100%;
    margin: 0 auto;
    text-align: left;
    padding-top: 60px;
  }

  .img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  .setting-top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .btn {
    margin-left: 100px;
    color: #419fff;
    border-radius: 16px;
    border: 1px solid #419fff;
    line-height: 30px;
    padding: 0 16px;
    cursor: pointer;
  }

  .form_group {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .label {
    width: 120px;
  }

  .et_nickname {
    background: #f7f7f7;
  }

  .et_introduce {
    width: 100%;
    height: 100px;
    background-color: #f7f7f7;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    resize: none;
    padding: 10px 16px;
    margin-left: 26px;
  }

  .et_web {
    width: 100%;
    margin-left: 20px;
  }

  .save_btn {
    margin-left: 0;
    color: white;
    background: limegreen;
    border-color: limegreen;
  }

  .et_blog {
    width: 100%;
    margin-left: 20px;
  }
</style>
