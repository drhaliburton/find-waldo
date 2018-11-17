<!-- Lists all the employees within one division -->

<template>
<div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">

</div>
</template>

<script>


export default {
  name: 'employeesView',
  props: {
  },
  components: {
  },
  watch: {
    '$route.params.name' (name) {
      console.log(id, 'name')
    },
  },
  created() {
    console.log(this.$route.params.name)
  }
}

</script>

