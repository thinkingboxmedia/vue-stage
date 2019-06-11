import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueStage from '@/vue-stage'
Vue.use(vueStage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
