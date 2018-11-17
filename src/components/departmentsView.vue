<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <router-link v-for="(department, index) in departments" :key="index" tag="div" :to="'/departments/' + department.name">
    <a>{{department.name}}</a>
  </router-link>
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
    departments() {
      return this.$store.state.departments;
    }
  },
}

</script>

