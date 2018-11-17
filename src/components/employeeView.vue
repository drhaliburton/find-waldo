<!-- Renders one employees details -->

<template>
<div class="content-container" v-if="employee">
  <employee-card :employee.sync="employee"></employee-card>
  <br>
  <address-card :employee.sync="employee"></address-card>
  <br><br>
  <md-button href="mailto:hey-your-data-is-bad@gov.ca">
    Report an Issue
  </md-button>
</div>
</template>

<script>
import employeeCard from '@/components/partials/employeeCard';
import addressCard from '@/components/partials/addressCard';

export default {
  name: 'employeeView',
  components: {
    employeeCard,
    addressCard
  },
  watch: {
    '$route.params.id' (id) {
      this.$store.dispatch('getEmployee', id)
    },
  },
  computed: {
    employee() {
      return this.$store.state.employees[0];
    },
  },
  created() {
    this.$store.dispatch('getEmployee', this.$route.params.id)
  },
  beforeDestroy() {
    this.$store.commit('employee', false);
  }
}

</script>

<style scoped>
.content-container {
  margin: 10px 20px;
}
</style>
