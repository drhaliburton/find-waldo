<!-- Lists all the employees within one organization -->

<template>
<div class="content-container">
  <h1>Employees</h1>
  <user-card v-if="employees.length" v-for="(employee, index) in employees" :key="index" :user="employee" :click="goToRoute"></user-card>
  <address-card v-if="employees.length" :employee="employees[0]"></address-card>
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
  created() {
      this.$store.dispatch('getFilteredEmployees', this.$route.params)
  },
  computed: {
    employees() {
      return this.$store.state.filteredEmployees;
    },
  },
  methods: {
    goToRoute(employee) {
      this.$router.push('/employee/' + employee.id);
    }
  },
  beforeDestroy() {
    this.$store.commit('filteredEmployees', false)
  }
}
</script>

