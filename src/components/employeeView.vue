<!-- Renders one employees details -->

<template>
<div class="content-container">
  <employee-card v-if="employee" :employee="employee[0]"></employee-card>
  <br>
  <address-card v-if="employee" :employee="employee[0]"></address-card>
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
  data() {
    return {
      employee: false,
    }
  },
  watch: {
    '$route.params.id' (id) {
      this.$store.dispatch('getEmployee', id)
    },
    'stateEmployee' (employee) {
      this.employee = employee;
    }
  },
  computed: {
    stateEmployee() {
      return this.$store.state.employee;
    },
  },
  created() {
    this.$store.dispatch('getEmployee', this.$route.params.id)
  },
}

</script>

<style scoped>
.content-container {
  margin: 10px 20px;
}
</style>
