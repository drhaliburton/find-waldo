<!-- List all branch -->

<template>
<div class="content-container">
</div>
</template>

<script>


export default {
  name: 'branchView',
  props: {
  },
  data() {
    return {
      branch: false,
    }
  },
  watch: {
    '$route.params.branchName' (name) {
      console.log(id, 'name')
    },
  },
  created() {
    console.log(this.$route.params.branchName)
  }
}

</script>

