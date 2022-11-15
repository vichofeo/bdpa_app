import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(BootstrapVue);
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2)
import 'material-icons/iconfont/material-icons.css'
import vuetify from './plugins/vuetify'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
