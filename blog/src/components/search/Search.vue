<template>
  <div class="home-item">
    <div class="home-top">
      <edit-text font-class="iconfont icon-sousuo" text-type="text" hint="搜索"
                 @on-result-change="onResultChangeSearch"></edit-text>
      <my-button :click="to_search" size="larger" value="搜索"></my-button>
    </div>
    <list-view :data-list="dataList"></list-view>
  </div>
</template>

<script>
  import EditText from 'base/edit_text/EditText'
  import MyButton from 'base/my_button/MyButton'
  import ListView from 'base/list_view/ListView'
  import AV from 'leancloud-storage'
  import toSearch from "../../common/js/search";

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
      let context = this;
      console.log('context.$route.query.con', context.$route.query.con)
      eventBus.$emit('is100', false)
      toSearch(this.$route.query.con, (result) => {
        context.dataList = result
      }, (err) => {

      })

    },
    methods: {
      onResultChangeSearch(val) {
        this.search = val
      },
      to_search() {
        console.log(11)
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
    width: 640px;
    margin: 0 auto;
    padding: 60px 120px;
  }

  .home-top {
    display: grid;
    grid-template-columns: 8fr 1fr;
    padding-bottom: 30px;
  }
</style>
