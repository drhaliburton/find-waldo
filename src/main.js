import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css';

import VueMaterial from 'vue-material'

import employeeView from './components/employeeView.vue'
import departmentView from './components/departmentView.vue'
import divisionView from './components/divisionView.vue'
import employeesView from './components/employeesView.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/'},
  { path: '/employee/:id', component: employeeView },
  { path: '/department/:name', component: departmentView },
  { path: '/department/:name/divisions/:name', component: divisionView },
  { path: '/department/:name/divisions/:name/employees', component: employeesView },

]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
