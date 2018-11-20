<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <h1>Yukon Government Departments</h1>
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
      console.log('asdfasdf')
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

<style>

</style>

