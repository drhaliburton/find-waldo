<!-- Renders one employees details -->

<template>
<div class="content-container">
  <employee-card v-if="employee" :employee="employee[0]"></employee-card>
  <br>
  <address-card v-if="employee" :employee="employee[0]"></address-card>
  <div class="text-center">
  <md-button href="mailto:hey-your-data-is-bad@gov.ca">
    Report an Issue
  </md-button>
  </div>
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
  margin: 10px auto;
  justify-content: center;
  display: flex;
  width: 100%;
}

.md-card {
  position: sticky;
}

.text-center {
  width: 100%;
  margin: 30px auto;
}

.md-icon.md-theme-default.md-icon-font {
      margin-right: 3px !important;
}
</style>
