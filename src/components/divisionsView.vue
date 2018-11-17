<!-- Lists all the divisions within one department -->

<template>
<div class="content-container">

</div>
</template>

<script>


export default {
  name: 'divisionView',
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

