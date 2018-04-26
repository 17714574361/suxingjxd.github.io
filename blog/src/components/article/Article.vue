<template>
  <div class="article">
    <div class="home-item home-left">
      <div class="home-top">
        <edit-text font-class="iconfont icon-sousuo" text-type="text" hint="搜索"
                   @on-result-change="onResultChangeSearch"></edit-text>
        <my-button :click="to_search" size="larger" value="搜索"></my-button>
        <my-button :click="to_publish" font-class="iconfont icon-tianjiajiahaowubiankuang" class="top-item" size="larger"
                   value="发表"></my-button>
      </div>
      <list-view :data-list="dataList"></list-view>
    </div>
    <div class="home-item home-right">
      <div class="menu by-date">
        <h3 class="menu-title">按日期筛选</h3>
        <ul class="by-date-list">
          <li class="list-item">2018年4月</li>
          <li class="list-item">2018年2月</li>
          <li class="list-item">2018年1月</li>
        </ul>
      </div>
      <div class="menu by-class">
        <h3 class="menu-title">按分类筛选</h3>
        <ul class="by-class-list">
          <li class="list-item">js</li>
          <li class="list-item">css</li>
          <li class="list-item">html</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import EditText from 'base/edit_text/EditText'
  import MyButton from 'base/my_button/MyButton'
  import ListView from 'base/list_view/ListView'
  import AV from 'leancloud-storage'
  import {toArticle} from "../../common/js/article";

  /**
   * data:
   *   search: 搜索框文字
   *   dataList: 要渲染的数据
   */
  export default {
    data() {
      return {
        search: '',
        dataList: []
      }
    },
    components: {
      EditText,
      MyButton,
      ListView
    },
    mounted() {

      //判断此页面是否要100%布局
      eventBus.$emit('is100', false)

      let context = this;
      //查询文章
      toArticle((result) => {
        this.dataList = result
      }, (err) => {

      })

    },
    methods: {
      onResultChangeSearch(val) {
        this.search = val
      },
      //写文章按钮
      to_publish() {
        this.$router.push({path: '/home/publish'})
      },
      //搜索按钮
      to_search() {
        if (this.search === '' || typeof this.search === 'undefined') {
          return
        }
        this.$router.push({path: '/search', query: {'con': this.search}})
      }
    }
  }
</script>

<style scoped>
  .article {
    display: flex;
    justify-content: space-between;
  }

  /*960=700+260*/
  .home-left {
    width: 800px;
    padding-top: 80px;
    padding-bottom: 100px;
  }

  .home-top {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
  }

  .top-item {
    grid-column: 4/6;
  }

  .menu {
    width: 160px;
  }

  .home-right {
    width: 160px;
    padding-top: 30px;
    padding-left: 40px;
  }

  .menu-title {
    padding: 10px 0;
    text-align: left;
  }

  .by-date {
    padding-bottom: 20px;
  }

  .by-class {
    margin-top: 30px;
  }

  .list-item {
    text-align: left;
    cursor: pointer;
    padding: 5px 8px;
  }

  .list-item:hover {
    background: #f0f0f0;
  }
</style>
