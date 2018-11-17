<!-- Lists all the departments within one organization -->

<template>
<div class="content-container">
  <router-link v-for="(department, index) in departments" :key="index" tag="div" :to="'/departments/' + department.name">
    <a>{{department.name}}</a>
  </router-link>
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
  },
}

</script>

