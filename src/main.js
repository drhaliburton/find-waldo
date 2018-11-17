import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css';

import App from './App.vue'
import divisionsView from './components/divisionsView.vue'
import departmentsView from './components/departmentsView.vue'
import branchView from './components/branchView.vue'
import employeesView from './components/employeesView.vue'
import employeeView from './components/employeeView.vue'


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/departments'},
  { path: '/employee/:id', component: employeeView },
  { path: '/departments/', component: departmentsView },
  { path: '/divisions/', component: divisionsView },
  { path: '/divisions/:divisionName/branch', component: branchView },
  { path: '/divisions/:divisionName/branch/:branchName/employees', component: employeesView },
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    employees: false,
    employee: false,
    division: false,
    branch: false,
    unit: false,
    departments: false,
  },
  mutations: {
    departments(state, data) {
      state.departments = data;
    },
    divisions(state, data) {
      state.divisions = data;
    },
    division(state, data) {
      state.division = data;
    },
    branches(state, data) {
      state.branches = data;
    },
    branch(state, data) {
      state.branch = data;
    },
    units(state, data) {
      state.units = data;
    },
    unit(state, data) {
      state.unit = data;
    },
    employees(state, data) {
      state.employees = data;
    },
    employee(state, data) {
      state.employee = data;
    },

  },
  actions: {
    getContent({commit}) {
      axios.get('/api/employees.json')
        .then(res => {
          commit('employees', res.data.employees)
        });

      axios.get('/api/organization.json')
        .then(res => {
          let departments = res.data.children.map((dep, depIndex) => {
            dep.id = depIndex;
            if (dep.children) {
              let divisions = dep.children.map((division, divisionIndex) => {
                division.id = divisionIndex;
                if (division.children) {
                  let branches = division.children.map((branch, branchIndex) => {
                    branch.id = branchIndex;
                    if (branch.children) {
                      let units = branch.children.map((unit, unitIndex) => {
                        unit.id = unitIndex;
                      })
                      commit('units', units);
                      branch.children = units;
                    }
                    return branch;
                  })
                  commit('branches', branches)
                  division.children = branches;
                }
                return division;
              })
              commit('divisions', divisions)
              dep.children = divisions;
            }
            return dep;
          })
          commit('departments', departments)
        });
    },
    getEmployee({commit, state}, email) {
      // const employee = state.employees.filter(employee => employee.email == email);
      commit('employee', state.employees);
    },
    getDivision({ commit, state }, id) {
      const division = state.divisions.filter(division => division.id == id);
      commit('division', division);
    },
    getBranch({ commit, state }, id) {
      const branch = state.branchs.filter(branch => branch.id == id);
      commit('branch', branch);
    },
    getUnit({ commit, state }, id) {
      const unit = state.units.filter(unit => unit.id == id);
      commit('unit', unit);
    },
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
