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

import employeeConfig from './components/employeeConfig.js'

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
  { path: '/departments/:departmentName/divisions/:divisionName/branches/:branchName/employees', component: employeesView },
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    employees: false,
    employee: false,
    filteredEmployess: false,
    divisions: false,
    division: false,
    branches: false,
    branch: false,
    units: false,
    unit: false,
    departments: false,
    department: false,
    depArray: [],
  },
  mutations: {
    departments(state, data) {
      state.departments = data;
    },
    department(state, data) {
      state.department = data;
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
    filteredEmployees(state, data) {
      state.filteredEmployees = data;
    }
  },
  actions: {
    getContent({commit}) {
      let indexCounter = 0;
      let depLookup = {};
      let divisionLookup = {};
      let branchLookup = {};
      let unitLookup = {};

      axios.get('/api/organization.json')
        .then(res => {
          let divisionsArray = [];
          let branchesArray = [];
          let unitsArray = [];
          let departments = res.data.children.map((dep) => {
            depLookup[dep.name] = { name: dep.name, employees: [] }
            if (dep.children) {
              let divisions = dep.children.map((division) => {
                division.department = dep.name;
                if (division.children) {
                  let branches = division.children.map((branch) => {
                    branch.division = division.name;
                    if (branch.children) {
                      let units = branch.children.map((unit) => {
                        unitLookup[unit.name] = { name: unit.name, employees: [] }
                        unit.branch = branch.name;
                        return unit;
                      })
                      branch.children = units;
                      unitsArray = [...unitsArray, ...units];
                      return units;
                    } else {
                      branchLookup[branch.name] = { name: branch.name, employees: [] }
                    }
                    return branch;
                  })
                  branchesArray = [...branchesArray, ...branches]
                  division.children = branches;
                } else {
                  divisionLookup[division.name] = { name: division.name, employees: [] }
                }
                return division;
              })
              divisionsArray = [...divisionsArray, ...divisions]
              dep.children = divisions;
            } else {
              depLookup[dep.name] = { name: dep.name, employees: [] }
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
        })
        .then(() => {
          axios.get('/api/employees-long.json')
            .then(res => {
              let employeesWithData = res.data.employees.map((employee, index) => {
                depLookup[employee.department].employees.push(employee);
                employee.languages = employeeConfig[0].language;
                employee.skills = employeeConfig[0].skills;
                employee.id = index;
                indexCounter > employeeConfig.length - 1 ? indexCounter = 0 : indexCounter++;

                if (employee.unit) {
                  unitLookup[employee.unit].employees.push(employee)
                  return employee;
                }
                if (employee.branch && branchLookup[employee.branch]) {
                  branchLookup[employee.branch].employees.push(employee)
                  return employee;
                } else {
                  branchLookup[employee.branch] = {
                    name: employee.branch,
                    employees: [employee],
                  }
                }
                if (employee.division && divisionLookup[employee.division]) {
                  divisionLookup[employee.division].employees.push(employee)
                  return employee;
                } else {
                  divisionLookup[employee.division] = {
                    name: employee.division,
                    employees: [employee],
                  }
                }
                if (employee.department) {
                  depLookup[employee.department].employees.push(employee)
                  return employee;
                }
              });
              commit('employees', employeesWithData)
            });
        })
    },
    getEmployee({commit, state}, id) {
      const employee = state.employees.filter(employee => employee.id == id);
      commit('employee', employee);
    },
    getFilteredEmployees({commit, state}, routes) {
      // let filteredEmployees = state.employees.filter(employee => {
      //   if (routes.branchName && (employee.branch == routes.branchName) && (employee.division == routes.divisionName) && (employee.department == routes.departmentName)) {
      //     return employee;
      //   }
      //   if (routes.divisionName && (employee.division == routes.divisionName)) {
      //     return employee;
      //   }
      //   if (routes.departmentName && (employee.department == routes.departmentName)) {
      //     return employee;
      //   }
      //   return false;
      // })
      commit('filteredEmployees', filteredEmployees);
    },
    getDivisions({ commit, state }, departmentName) {
      const division = state.divisions.filter(division => {
        return departmentName == division.department
      });
      commit('division', division);
    },
    getDepartment({ commit, state }, departmentName) {
      const department = state.departments.filter(department => {
        return departmentName == department.name;
      });
      commit('department', department);
    },
    getBranches({ commit, state }, divisionName) {
      const branch = state.branches.filter(branch => {
        return branch.division == divisionName
      })
      commit('branch', branch);
    },
    getUnits({ commit, state }, branchName) {
      const unit = state.units.filter(unit => {
        return unit.branch == branchName
      });
      commit('unit', unit);
    },
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
