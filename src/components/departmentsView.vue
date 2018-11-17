<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">

</div>
</template>

<script>


export default {
  name: 'departmentsView',
  props: {
  },
  components: {
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    }
  }
}

</script>

