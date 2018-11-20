<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <h1>Yukon Government Departments</h1>
  <generic-card v-if="department.children" v-for="(department, index) in departments" :key="index" :department="department" :click="() => goToRoute(department, index)"></generic-card>
</div>
</template>

<script>
  import genericCard from '@/components/partials/genericCard.vue'

  export default {
  name: 'genericView',
  props: ['content', 'formatRoute'],
  components: {
    genericCard
  },
  computed: {
    departments() {
      return this.content;
    }
  },
  methods: {
    goToRoute(department, index) {
      let path = '/';
      if (department.children) {
        path = path + 'departments/'+ index;
      } else {
        path = path + 'departments/'+ index + '/employees';
      }
      console.log(path)
      this.$router.push(path);
    }
  }
}

</script>

<style>

</style>

