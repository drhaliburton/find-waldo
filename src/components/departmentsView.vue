<!-- List all departments -->

<template>
<div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
  <!-- <department-card v-for="(department, index) in departments" :key="index" :department="department" to:="/departments/${department.name}"></department-card> -->
</div>
</template>

<script>


export default {
  name: 'departmentsView',
  props: {
  },
  data() {
    return {
      department: false,
    }
  },
  components: {
  },
}

</script>

