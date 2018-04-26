<template>
  <div class="home-item">
    <div class="home-top">
      <edit-text font-class="iconfont icon-sousuo" text-type="text" hint="搜索"
                 @on-result-change="onResultChangeSearch"></edit-text>
      <my-button :click="to_search" size="larger" value="搜索"></my-button>
    </div>
    <list-view :isShowMenu='isShowMenu' :data-list="dataList"></list-view>
  </div>
</template>

<script>
  import EditText from 'base/edit_text/EditText'
  import MyButton from 'base/my_button/MyButton'
  import ListView from 'base/list_view/ListView'
  import AV from 'leancloud-storage'
  import {toIndex} from "../../common/js";

  export default {
    data() {
      return {
        search: '',
        dataList: [],
        isShowMenu: false
      }
    },
    components: {
      EditText,
      MyButton,
      ListView
    },
    mounted() {
      console.log('mmmm')
      let context = this;
      eventBus.$emit('is100', false)
      toIndex((result) => {
        this.dataList = result
      }, (err) => {

      })


    },
    methods: {
      onResultChangeSearch(val) {
        this.search = val
      },
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
  .home-item {
    padding: 60px 120px;
  }

  .home-top {
    display: grid;
    grid-template-columns: 8fr 1fr;
    padding-bottom: 30px;
  }


</style>
