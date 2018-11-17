<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <generic-card></generic-card>
</div>
</template>

<script>

  import genericCard from '@/components/partials/genericCard.vue'

  export default {
    name: 'genericView',
    components: {
      genericCard
    },
    watch: {
    '$route.params.id' (id) {
      this.$store.dispatch('getDepartment', id)
    },
  },
  computed: {
    department() {
      console.log(this.$store.state.departments)
      // return this.$store.state.departments[0];
    },
  },
  created() {
    // this.$store.dispatch('getDepartment', this.$route.params.id)
  },
  beforeDestroy() {
    // this.$store.commit('department', false);
  }
  }

</script>

