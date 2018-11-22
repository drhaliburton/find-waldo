<!-- Lists all the employees within one organization -->

<template>
<div class="content-container" v-if="employeesArr">
  <h1>{{employeesArr[0].department}} Employees</h1>
  <user-card v-if="employeesArr" v-for="(employee, index) in employeesArr" :key="employee[index]" :user="employee" :click="() => goToRoute(employee)"></user-card>
  <address-card v-if="employeesArr" :employee="employeesArr[0]"></address-card>
</div>
</template>

<script>
import userCard from '@/components/partials/userCard.vue';
import addressCard from '@/components/partials/addressCard.vue'
import axios from 'axios';
// import employeeConfig from './employeeConfig.js'

let indexCounter = 0;

export default {
  name: 'employeesView',
  props: ['content'],
  components: {
    userCard,
    addressCard,
  },
  mounted() {
    this.getFilteredEmployees()
    if (this.employees.length) {
      this.employeesArr = this.employees;
    }
  },
  data() {
    return {
        employeesArr: false,
    }
  },
  computed: {
    employees() {
      return this.$store.state.filteredEmployees;
    },
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== from.path) {
        console.log('hello')
        this.getFilteredEmployees().then(res => {
            this.employeesArr = res
          })
      }
    }
  },
  methods: {
    goToRoute(employee) {
      this.$router.push('/employee/' + employee.id);
    },
    getFilteredEmployees() {
      return this.$store.dispatch('getFilteredEmployees', this.$route.params)
    }
  },
  beforeDestroy() {
    this.$store.commit('filteredEmployees', false)
  }
}
</script>

