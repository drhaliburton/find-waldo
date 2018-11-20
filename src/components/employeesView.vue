<!-- Lists all the employees within one organization -->

<template>
<div class="content-container" v-if="filteredEmployees">
  <h1>{{filteredEmployees[0].department}} Employees</h1>
  <user-card v-for="(employee, index) in filteredEmployees" :key="index" :user="employee" :click="goToRoute"></user-card>
  <!-- <router-link v-for="(employee, index) in filteredEmployees" :key="index" tag="div" >
    {{employee}}
  </router-link> -->
</div>
</template>

<script>
import userCard from '@/components/partials/userCard.vue';
import axios from 'axios';
import employeeConfig from './employeeConfig.js'

let indexCounter = 0;

export default {
  name: 'employeesView',
  props: {
  },
  components: {
    userCard,
  },
  // data() {
  //   return {
  //     employees: false
  //   }
  // },
  computed: {
    filteredEmployees () {
      return this.$store.state.employees;
    }
  },
  watch: {
    '$route.params.departmentName' (name) {
      this.$store.dispatch('getFilteredEmployees', this.$route.params)
    },
    // 'filteredEmployees' (employees) {
    //   this.employees = employees;
    // },
    // 'employees' (employees) {

    // }
  },
  mounted() {
      this.$store.dispatch('getFilteredEmployees', this.$route.params)
      // axios.get('/api/employees.json')
      // .then(res => {
      //   let employeesWithData = res.data.employees.map((employee, index) => {
      //     employee.languages = employeeConfig[0].languages;
      //     employee.skills = employeeConfig[0].skills;
      //     employee.id = index;
      //     indexCounter > employeeConfig.length - 1 ? indexCounter = 0 : indexCounter++;
      //     return employee;
      //   });
      //   this.employees = employeesWithData;
      //   });

  },
  methods: {
    goToRoute(employee) {
      this.$router.push('/employee/' + employee.id);
    }
  }
}
</script>

