<!-- Renders one employees details -->

<template>
<div class="content-container">
  <employee-card :employee="employee"></employee-card>
  <br>
  <address-card :employee="employee"></address-card>
  <br><br>
  <md-button href="mailto:complaints@gov.ca">
    <!-- <md-icon>phone</md-icon> -->
    Report an Issue
  </md-button>
</div>
</template>

<script>
import employeeCard from '@/components/partials/employeeCard';
import addressCard from '@/components/partials/addressCard';

export default {
  name: 'employeeView',
  props: {
    employee: Object
  },
  components: {
    employeeCard,
    addressCard
  },
  watch: {
    '$route.params.id' (id) {
      console.log(id, 'id')
    },
  },
  created() {
    console.log(this.$route.params.id)
  }
}

</script>

<style scoped>
.content-container {
  margin: 10px 20px;
}
</style>
