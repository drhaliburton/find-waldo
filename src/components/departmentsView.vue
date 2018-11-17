<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <router-link v-for="(department, index) in departments" :key="index" tag="div" class='flex-cards' :to="'/departments/' + department.name">
  <generic-card :department="department"></generic-card>
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

<style scoped>
  .content-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .flex-cards {
    flex: 45%;
    margin: 1%;
  }

  .md-card {
    height: 200px;

  }

  @media only screen and (max-width: 950px) {
    .content-container {
      flex-direction: column;
    }

    .flex-cards {
      flex: 100%;
    }

    .md-card {
      height: 150px;
    }
  }
</style>

