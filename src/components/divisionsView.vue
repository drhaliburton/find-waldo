<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <router-link v-if="divisions" v-for="(division, index) in divisions" :key="index" tag="div" :to="divisionRoute(division)">
    <a>{{division.name}}</a>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'divisionsView',
  props: {
  },
  components: {
  },
  computed: {
    divisions() {
      return this.$store.state.division;
    }
  },
  watch: {
    '$route.params.departmentName' (name) {
      this.$store.dispatch('getDivisions', this.$route.params.departmentName)
    },
    'divisions' (divisions) {

    },
  },
  mounted() {
    this.$store.dispatch('getDivisions', this.$route.params.departmentName)
  },
  methods: {
    divisionRoute(division) {
      let path = this.$route.path;
      if (division.children) {
        path = path + '/divisions/' + division.name;
      } else {
        path = path + '/divisions/' + division.name + '/employees';
      }
      return path;
    }
  }
}
</script>

