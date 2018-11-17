<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <generic-card v-for="(department, index) in departments" :key="index" :department="department" :click="goToRoute"></generic-card>
</div>
</template>

<script>
  import genericCard from '@/components/partials/genericCard.vue'

  export default {
  name: 'genericView',
  components: {
    genericCard
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    }
  },
  methods: {
    goToRoute(department) {
      let path = this.$route.path;
      if (department.children) {
        path = path + '/' + department.name;
      } else {
        path = path + '/' + department.name + '/employees';
      }
      this.$router.push(path);
    }
  }
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

