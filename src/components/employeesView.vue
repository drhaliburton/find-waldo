<!-- Lists all the employees within one organization -->

<template>
<div class="content-container">
</div>
</template>

<script>
import userCard from '@/components/partials/userCard.vue';
import axios from 'axios';
import employeeConfig from './employeeConfig.js'

let indexCounter = 0;

export default {
  name: 'employeesView',
  props: ['content'],
  components: {
    userCard,
  },
  mounted() {
      this.$store.dispatch('getFilteredEmployees', this.$route.params)
  },
  computed: {
    employees() {
      return this.$store.state.filteredEmpoyees;
    }
  },
  methods: {
    goToRoute(employee) {
      this.$router.push('/employee/' + employee.id);
    }
  }
}
</script>

