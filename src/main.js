import axios from 'axios'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

Vue.config.productionTip = false

store.dispatch('auth/me').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
