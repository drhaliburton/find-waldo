import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css';

import VueMaterial from 'vue-material'

import employeeView from './components/employeeView.vue'
import departmentsView from './components/departmentsView.vue'
import divisionsView from './components/divisionsView.vue'
import employeesView from './components/employeesView.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/'},
  { path: '/employee/:id', component: employeeView },
  { path: '/departments/', component: departmentsView },
  { path: '/departments/:name/divisions', component: divisionsView },
  { path: '/departments/:name/divisions/:name/employees', component: employeesView },

]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
