# 基于vue的博客系统
### 项目地址：https://17714574361.github.io/suxingjxd.github.io/#/home
#####  注：本项目使用vue+leancloud开发，vue开发前端，leancloud开发后端
# 一、项目需求
    * 发布、编辑、删除文章
    * 文章使用markdown
    * 设置个人基本信息
# 二、项目展示
   注：页面是丑了点，但这不是重点
  ![Alt text](https://17714574361.github.io/suxingjxd.github.io/pic/1.png)
  --------------------------------图1----------------------------------------
  ![Alt text](https://17714574361.github.io/suxingjxd.github.io/pic/2.png)
  ----------------------------------图2--------------------------------------
  ![Alt text](https://17714574361.github.io/suxingjxd.github.io/pic/3.png)
  -----------------------------------图3-------------------------------------
  ![Alt text](https://17714574361.github.io/suxingjxd.github.io/pic/4.png)
  ----------------------------------图4--------------------------------------
  ![Alt text](https://17714574361.github.io/suxingjxd.github.io/pic/5.png)
  ------------------------------------图5------------------------------------
# 三、开发思路
  ## 1. 组件划分
      |
      |——Root:挂载整个应用
          |——App:基础结构
              |——Actionbar:头部
              |——Home:页面主体
              |   |——Index:首页
              |   |——Article：个人中心
              |   |——Publish:发表文章
              |   |——Detail:详情文章
              |——Search:搜索
              |——Setting:设置
              |——Login:登录
              |——Register:注册
  ## 2. 基础组件
      Actionbar:头部组件
      Divider:分割
      EditText:文本框
      ListView：列表
      MyButton：按钮
      Toast：提示信息
  ## 3. 文件结构
        |——src:前端开发源码
            |——api:各种基础api
            |   |——dom.js:与dom有关的代码
            |   |——regular.js:与正则有关的代码
            |——base:基础组件
            |   |——actionbar：头部组件
            |             |——Actionbar.vue
            |   |——divider：分隔组件
            |             |——Divider.vue
            |   |——edit_text：文本框组件
            |             |——EditText.vue
            |   |——list_view：列表组件
            |             |——ListView.vue
            |   |——my_button：按钮组件
            |             |——MyButton.vue
            |   |——toast：提示信息组件
            |             |——Toast.vue
            |——common:通用
            |       |——css
            |           |——iconfont:图标字体
            |                 |——iconfont.css
            |           |——reset.css:重置样式
            |       |——image
            |       |——js：与数据交互的js
            |           |——article.js
            |           |——detail.js
            |           |——index.js
            |           |——listview.js
            |           |——login.js
            |           |——publish.js
            |           |——register.js
            |           |——search.js
            |           |——setting.js
            |——components:组件
            |           |——article：个人中心文章组件
            |                   |——Article.vue
            |           |——detail：详细组件
            |                   |——Detail.vue
            |           |——home：页面主体组件
            |                   |——Home.vue
            |           |——index：首页组件
            |                   |——Index.vue
            |           |——login：登录组件
            |                   |——Login.vue
            |           |——publish：发布文章组件
            |                   |——Publish.vue
            |           |——register：注册组件
            |                   |——Register.vue
            |           |——search：搜索组件
            |                   |——Search.vue
            |           |——setting：设置组件
            |                   |——Setting.vue
            |——router：路由
            |     |——index.js路由
            |——App.vue
            |——main.js
 # 四、开发历程
    #  1. 基础配置
        使用vue-cli脚手架生成一个webpack项目模板
        vue init webpack blog
        
        安装相关依赖
          1. 后端云：npm i leancloud-storage --save
          2. markdown: npm i mavon-editor --save
         
        定义全局eventBus：需要同级组件之间的传参
          打开main.js，注意注释部分
          
          import Vue from 'vue'
          import App from './App'
          import router from './router'
          Vue.config.productionTip = false
          // 添加这行代码
          window.eventBus = new Vue()
          new Vue({
            el: '#app',
            router,
            render: h => h(App)
          })
          
    #  2. 配置基础路径
        打开blog/buiild/webpack.base.conf.js
        找到alias，添加
        'common': resolve('src/common'),
        'components': resolve('src/components'),
        'base': resolve('src/base'),
        'api': resolve('src/api')
    #  3. 准备组件
          按照之前划分好的组件，在src中建立基础目录及组件，组件中不用填写内容
    #  4. 配置路由
          按照前面确定好的页面跳转关系配置路由信息，然后测试界面跳转是否正常。
    #  5. ui开发
