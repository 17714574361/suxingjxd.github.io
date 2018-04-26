<template>
  <div class="detail">
    <h2 class="detail-title">{{this.result.attributes.title}}</h2>
    <div class="base-info">
      <div>
        <img class="img" :src="this.result.attributes.headurl" alt="">
      </div>
      <div>
        <p class="nickname">{{this.result.attributes.nickname}}</p>
        <p class="other">{{this.result.createdAt.getFullYear()+"-"
          +(this.result.createdAt.getMonth()+1)+"-"
          +this.result.createdAt.getDate()+" "
          +this.result.createdAt.getHours()+":"
          +this.result.createdAt.getMinutes()}}</p>
      </div>
    </div>
    <div class="content" v-html="this.result.attributes.content"></div>
  </div>
</template>

<script>
  import AV from 'leancloud-storage'
  import toDetail from "../../common/js/detail";

  /**
   * id:文章的id
   * result: 文章的结果值
   */
  export default {
    data() {
      return {
        id: '',
        result: ''
      }
    },
    mounted() {
      eventBus.$emit('is100', false)

      this.id = this.$route.query.id;

      let context = this;

      toDetail(this.id, (result) => {
        context.result = result;
      }, (err) => {
        alert('查询文章失败')
      })

    }
  }
</script>

<style scoped>
  .detail {
    padding-bottom: 100px;
    /*padding: 0 300px 100px 300px;*/
    text-align: left;
    width: 640px;
    margin: 0 auto;
  }

  .detail-title {
    margin-top: 60px;

  }

  .base-info {
    display: flex;
    margin-top: 30px;
  }

  .img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 14px;
  }

  .other {
    font-size: 14px;
    color: #949494;
    padding-top: 8px;
  }

  .content {
    margin-top: 30px;
  }
</style>
