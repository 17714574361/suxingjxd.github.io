import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.eventBus = new Vue()
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
