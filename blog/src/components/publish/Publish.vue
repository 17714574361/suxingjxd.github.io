<template>
  <div class="publish">
    <div class="publish-top">
      <h2>标题</h2>
      <textarea v-model="article_title" placeholder="请输入标题" class="article-title"></textarea>
    </div>
    <mavon-editor codeStyle="xcode" @save="publish" class="editor" v-model="value"/>
    <div class="wrapper-toast">
      <toast :is-show-toast="isShowToast" :text="toast_text"></toast>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import _ from 'lodash'
  import Toast from 'base/toast/Toast'
  import AV from 'leancloud-storage'
  import {toPublish, toLoad, toUpdateArticle} from "common/js/publish";
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    data() {
      return {
        value: '',
        size: 0,
        toast_text: '',
        isShowToast: false,
        article_title: ''
      }
    },
    mounted() {
      eventBus.$emit('is100', false)
      let id = this.$route.query.id
      let val = this.$route.query.val
      this.value = decodeURIComponent(val)

      if (id) {
        console.log(id)
        toLoad(id, (result) => {
          this.article_title = result.attributes.title
        }, (err) => {

        })
      }
    },
    components: {
      Toast,
      mavonEditor
    },
    computed: {},
    methods: {
      publish(val, render) {
        // console.log(val,render)
        this.value = val
        this.render = render
        if (this.article_title === '' || typeof this.article_title === 'undefined') {
          this.isShowToast = true;
          this.toast_text = '标题不能为空';
          return;
        }
        if (this.value === '' || typeof this.value === 'undefined') {
          this.isShowToast = true;
          this.toast_text = '文章不能为空';
          return;
        }
        this.isShowToast = false;
        let id = this.$route.query.id
        if (id) {
          toUpdateArticle(id, this.article_title, val, render, (result) => {

          }, (err) => {

          })
        } else {
          toPublish(this.article_title, val, render, (result) => {
            alert('发布成功');
          }, (err) => {
            alert('发布失败');
          })
        }

      }
    }
  }
</script>

<style scoped>
  .editor {
    height: 100%;
    /*overflow: hidden;*/
  }

  .publish-top {
    display: flex;
    align-items: center;
  }

  .publish-top h2 {
    padding: 0 30px;
    width: 200px;
  }

  .article-title {
    width: 100%;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    padding: 0 10px;
    font-weight: bold;
    border: none;
    background: #eeeeee;
    resize: none;
  }

  .editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  .publish {
    height: 100%;
  }

  .toolbar ul {
    display: flex;
  }

  .toolbar ul li {
    cursor: pointer;
    margin: 0 10px;
  }

  .wrapper-toast {
    position: absolute;
    width: 100%;
    right: 0;
    bottom: 100px;
    z-index: 9999;
  }
</style>
