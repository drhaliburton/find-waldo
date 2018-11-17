import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css';

import VueMaterial from 'vue-material'

import employeeView from '@/components/employeeView.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)



const routes = [
  { path: '/'},
  { path: '/employee/:id', component: employeeView },
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
