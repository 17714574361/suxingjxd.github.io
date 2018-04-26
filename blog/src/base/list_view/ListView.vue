<!--
  属性
    dataList:要渲染的数据
-->
<template>
  <div class="listView">
    <div class="item" v-for="(item,index) in dataList">
      <div class="item-top">
        <div>
          <img class="img" :src="item.attributes.headurl" alt="">
          <span class="nickname">{{item.attributes.nickname}}</span>
          <span class="date">{{item.createdAt.getFullYear()+"-"
          +(item.createdAt.getMonth()+1)+"-"
          +item.createdAt.getDate()+" "
          +item.createdAt.getHours()+":"
          +item.createdAt.getMinutes()}}</span>
        </div>
        <div class="wrapper-menu" v-if="isShowMenu">
          <span @click="show_menu(index)" :index="index" class="more">更多</span>
          <ul class="menu none" :index="index">
            <li @click="edit(item.id,encodeURIComponent(item.attributes.input))" class="edit">编辑</li>
            <li @click="del(item.id)">删除</li>
          </ul>
        </div>
      </div>
      <h3 class="item-title">
        <router-link class="item-title_a" :to="{path:'/home/detail/',query:{id:item.id}}">{{item.attributes.title}}
        </router-link>
      </h3>
      <div class="content" v-html="item.attributes.content"></div>
    </div>

  </div>
</template>

<script>
  import {getEl} from "api/dom";
  import index from "../../router";
  import {to_del} from "../../common/js/listview";

  export default {
    props: {
      dataList: {
        type: Array,
        default: []
      },
      isShowMenu: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      document.onclick = function (ev) {
        let index = ev.target.getAttribute('index');
        let menu = getEl('menu')
        for (let item of menu) {
          if (index + '' === item.getAttribute('index') + '') {
            item.className = 'menu'
          } else {
            item.className = 'menu none'
          }
        }

      }
    },
    data() {
      return {}
    },
    methods: {
      show_menu(index) {
      },
      del(id) {
        console.log(id)
        to_del(id, (success) => {
          window.location.reload()
        }, (err) => {

        })
      },
      edit(id,val) {
        this.$router.push({path: '/home/publish', query: {id: id,val:val}})
      }

    }
  }
</script>

<style scoped>
  .more {
    font-size: 12px;
    cursor: pointer;
  }

  .wrapper-menu {
    position: relative;
  }

  .none {
    display: none;
  }

  .menu {
    font-size: 13px;
    box-shadow: 0 0 5px #333;
    padding: 5px 0;
    position: absolute;
    left: 0;
    top: 24px;
    width: 60px;
    text-align: center;
  }

  .menu li {
    padding: 6px 0px;
    cursor: pointer;
  }

  .menu li:hover {
    background: #dadada;
  }

  .edit {
    border-bottom: 1px solid #ccc;
  }

  .item-title_a {
    color: #333;
    text-decoration: none;
  }

  .item-title:hover {
    text-decoration: underline;
  }

  .item {
    /*width: 670px;*/
    text-align: left;
    margin-top: 10px;
    margin-bottom: 30px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ccc;
  }

  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-title {
    padding: 16px 0;
    font-size: 24px;
  }

  .img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  .nickname {
    margin-left: 16px;
    font-size: 16px;
  }

  .date {
    margin-left: 12px;
    font-size: 14px;
    color: #949494;
  }

  .content {
    /*width: 670px;*/
    height: 60px;
    line-height: 20px;
    font-size: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
