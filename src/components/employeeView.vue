<!-- Renders one employees details -->

<template>
<div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
  <employee-card :employee="employee"></employee-card>
  <br><br>
  <address-card :employee="employee"></address-card>
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

