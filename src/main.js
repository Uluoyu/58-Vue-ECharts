import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//引入全局样式文件
import './assets/css/global.less'
import './assets/font/iconfont.css'
//请求基准路劲的配置
axios.defaults.baseURL = 'http://localhost:8888/data/'
//将axios对象挂载到Vue原型对象上去
//别的组件中使用this.$http
Vue.prototype.$http = axios
//将全局的echarts对象挂载到Vue原型对象上去
//别的组件中使用this.$echarts
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
