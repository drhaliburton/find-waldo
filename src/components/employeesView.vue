<!-- Lists all the employees within one organization -->

<template>
<div class="content-container">
  <router-link v-if="employees" v-for="(empoyee, index) in employees" :key="index" tag="div" :to="'/employee/' + employee.id">
    <a>{{empoyee.name}}</a>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'employeesView',
  props: {
  },
  data() {
    return {
      employees: false
    }
  },
  computed: {
    filteredEmployees () {
      return this.$store.state.filteredEmployees;
    }
  },
  watch: {
    '$route.params.departmentName' (name) {
      this.$store.dispatch('getFilteredEmployees', this.$route.params)
    },
    'filteredEmployees' (employees) {
      this.employees = employees;
    },
  },
  mounted() {
    this.$store.dispatch('getFilteredEmployees', this.$route.params)
  },
}
</script>

