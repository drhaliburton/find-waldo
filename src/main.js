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

import employeeConfig from './employeeConfig.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/departments'},
  { path: '/employee/:id', component: employeeView },
  { path: '/departments/', component: departmentsView },
  { path: '/departments/:departmentName', component: divisionsView },
  { path: '/departments/:departmentName/employees', component: employeesView },
  { path: '/departments/:departmentName/divisions/:divisionName', component: branchView },
  { path: '/departments/:departmentName/divisions/:divisionName/employees', component: employeesView },
  { path: '/departments/:departmentName/divisions/:divisionName/branch/:branchName/employees', component: employeesView },
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    employees: false,
    employee: false,
    divisions: false,
    division: false,
    branches: false,
    branch: false,
    units: false,
    unit: false,
    departments: false,
    department: false,
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
      let indexCounter = 0;
      axios.get('/api/employees.json')
        .then(res => {
          let employeesWithData = res.data.employees.map((employee, index) => {
            employee.languages = employeeConfig[0].languages;
            employee.skills = employeeConfig[0].skills;
            employee.id = index;
            // indexCounter = employeeConfig.length ? indexCounter = 0 : indexCounter++;
            return employee;
          });
          commit('employees', employeesWithData)
        });

      axios.get('/api/organization.json')
        .then(res => {
          let divisionsArray = [];
          let branchesArray = [];
          let unitsArray = [];
          let departments = res.data.children.map((dep, depIndex) => {
            dep.id = depIndex;
            if (dep.children) {
              let divisions = dep.children.map((division, divisionIndex) => {
                division.id = divisionIndex;
                division.department = dep.name;
                if (division.children) {
                  let branches = division.children.map((branch, branchIndex) => {
                    branch.id = branchIndex;
                    branch.division = division.name;
                    if (branch.children) {
                      let units = branch.children.map((unit, unitIndex) => {
                        unit.id = unitIndex;
                        unit.branch = branch.name;
                        return unit;
                      })
                      branch.children = units;
                      unitsArray = [...unitsArray, ...units];
                      return units;
                    }
                    return branch;
                  })
                  branchesArray = [...branchesArray, ...branches]
                  division.children = branches;
                  return division;
                }
                return division;
              })
              divisionsArray = [...divisionsArray, ...divisions]
              dep.children = divisions;
            }
            return dep;
          })
          commit('divisions', divisionsArray)
          commit('division', divisionsArray[0])
          commit('branches', branchesArray)
          commit('branch', branchesArray[0])
          commit('units', unitsArray)
          commit('unit', unitsArray[0])
          commit('departments', departments)
        });
    },
    getEmployee({commit, state}, id) {
      const employee = state.employees.filter(employee => employee.id == id);
      commit('employee', employee);
    },
    getDivisions({ commit, state }, departmentName) {
      const division = state.divisions.filter(division => departmentName == division.department);
      commit('division', division);
    },
    getBranches({ commit, state }, divisionName) {
      const branch = state.branches.filter(branch => branch.division == divisionName)
      commit('branch', branch);
    },
    getUnits({ commit, state }, branchName) {
      const unit = state.units.filter(unit => unit.branch == branchName);
      commit('unit', unit);
    },
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
