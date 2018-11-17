<template>
<div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
  <employee-card :employee="employee"></employee-card>
  <br><br>
  <address-card :employee="employee"></address-card>
</div>
</template>

<script>
import employeeCard from '@/components/employeeCard';
import addressCard from '@/components/addressCard';

export default {
  name: 'employeeView',
  props: {
    employee: Object
  },
  components: {
    employeeCard,
    addressCard
  }
}

</script>

