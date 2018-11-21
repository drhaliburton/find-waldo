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
import unitView from './components/unitView.vue'

import employeeConfig from './components/employeeConfig.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(VueRouter)

function formatRoute(name) {
  if (name) {
    console.log
    let path = name.includes(',') ? name.replace(",", "").toLowerCase().split(' ') : name.toLowerCase().split(' ');
    path = path.map((word, index) => {
      if (index + 1 !== path.length) {
        return (word + '-');
      } else {
        return word;
      }
    })
    let route = path.join('');
    return route;
  } else {
    return 'misc'
  }
}

const routes = [
  { path: '/', component: departmentsView },
  { path: '/employee/:id', component: employeeView },
  { path: '/departments/', component: departmentsView },
  { path: '/departments/:index', component: divisionsView },
  { path: '/departments/:index/employees', component: employeesView },
  { path: '/departments/:index/divisions/:divIndex', component: branchView },
  { path: '/departments/:index/divisions/:divIndex/employees', component: employeesView },
  { path: '/departments/:index/divisions/:divIndex/branches/:branchIndex', component: unitView },
  { path: '/departments/:index/divisions/:divIndex/branches/:branchIndex/employees', component: employeesView },
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    employees: false,
    employee: false,
    filteredEmployess: [],
    divisions: false,
    division: false,
    branches: false,
    branch: false,
    units: false,
    unit: false,
    departments: false,
    dep: false,
    depArray: [],
  },
  mutations: {
    departments(state, data) {
      state.departments = data;
    },
    dep(state, data) {
      state.dep = data;
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

          res.data.children.map((dep) => {
            if (dep.children) {
              let divisions = dep.children.map((division) => {
                division.department = dep.name;
                if (division.children) {
                  let branches = division.children.map((branch) => {
                    branch.division = division.name;
                    if (branch.children) {
                      let units = branch.children.map((unit) => {
                        unitLookup[formatRoute(unit.name)] = { name: unit.name, employees: [] }
                        unit.branch = branch.name;
                        return unit;
                      })
                      branch.children = units;
                      unitsArray = [...unitsArray, ...units];
                      return units;
                    } else {
                      branchLookup[formatRoute(branch.name)] = { name: branch.name, employees: [] }
                    }
                    return branch;
                  })
                  branchesArray = [...branchesArray, ...branches]
                  division.children = branches;
                } else {
                  divisionLookup[formatRoute(division.name)] = { name: division.name, employees: [] }
                }
                return division;
              })
              divisionsArray = [...divisionsArray, ...divisions]
              dep.children = divisions;
            } else {
              depLookup[formatRoute(dep.name)] = { name: dep.name, employees: [] }
            }
            return dep;
          })
          commit('departments', res.data.children)
        })
        .then(() => {
          axios.get('/api/employees-long.json')
            .then(res => {
              let employeesWithData = res.data.employees.map((employee, index) => {

                employee.languages = employeeConfig[0].language;
                employee.skills = employeeConfig[0].skills;
                employee.id = index;
                indexCounter > employeeConfig.length - 1 ? indexCounter = 0 : indexCounter++;

                if (employee.unit && !unitLookup[formatRoute(employee.unit)]) {
                  unitLookup[formatRoute(employee.unit)] = {
                    name: employee.unit,
                    employees: [employee],
                  }
                }

                if (employee.branch && !branchLookup[formatRoute(employee.branch)]) {
                  branchLookup[formatRoute(employee.branch)] = {
                    name: employee.branch,
                    employees: [employee],
                  }
                }

                if (employee.division && !divisionLookup[formatRoute(employee.division)]) {
                  divisionLookup[formatRoute(employee.division)] = {
                    name: employee.division,
                    employees: [employee],
                  }
                }

                if (employee.department && !depLookup[formatRoute(employee.department)]) {
                  depLookup[formatRoute(employee.department)] = {
                    name: employee.department,
                    employees: [employee],
                  }
                }

                if (employee.unit) {
                  unitLookup[formatRoute(employee.unit)].employees.push(employee)
                }

                if (employee.branch) {
                  branchLookup[formatRoute(employee.branch)].employees.push(employee)
                }

                if (employee.division) {
                  divisionLookup[formatRoute(employee.division)].employees.push(employee)
                }

                if (employee.department) {
                  depLookup[formatRoute(employee.department)].employees.push(employee)
                }

                return employee;
              });
              commit('employees', employeesWithData)
              commit('dep', depLookup)
              commit('divisions', divisionLookup)
              commit('branches', branchLookup)
              commit('units', unitLookup)
            });
        })
    },
    getEmployee({commit, state}, id) {
      const employee = state.employees.filter(employee => employee.id == id);
      commit('employee', employee);
    },
    getFilteredEmployees({commit, state}, params) {
      let filteredEmployees = false;
      let depName = false;
      let divName = false;
      let branchName = false;

      if (params.index && state.dep[formatRoute(state.departments[params.index].name)]) {
        filteredEmployees = state.dep[formatRoute(state.departments[params.index].name)].employees
        depName = state.departments[params.index].name;
      }
      if (params.divIndex && state.divisions[formatRoute(state.departments[params.index].children[params.divIndex].name)]) {
        filteredEmployees = state.divisions[formatRoute(state.departments[params.index].children[params.divIndex].name)].employees
        divName = state.departments[params.index].children[params.divIndex].name;
      }
      if (params.branchIndex && state.branches[formatRoute(state.departments[params.index].children[params.divIndex].children[params.branchIndex].name)]) {
        filteredEmployees = state.branches[formatRoute(state.departments[params.index].children[params.divIndex].children[params.branchIndex].name)].employees;
        branchName = state.departments[params.index].children[params.divIndex].children[params.branchIndex].name;
      }
      // if (state.units[formatRoute(params.units)]) {
      //   filteredEmployees = state.units[formatRoute(state.branches[params.branchIndex].name)].employees;
      // }
      let filtered = filteredEmployees.filter(employee => {
        let result = false;
        if (employee.department === depName) {
          result = employee;
        }
        if (employee.department === depName && employee.division === divName) {
          result = employee;
        }
        if (employee.department === depName && employee.division === divName && employee.branch === branchName) {
          result = employee;
        }
        if (result) {
          return result;
        }
      })
      console.log(filtered);
      commit('filteredEmployees', filtered);
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
