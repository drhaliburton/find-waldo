<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <router-link v-if="divisions" v-for="(division, index) in divisions" :key="index" tag="div" :to="divisionRoute(division)">
    <generic-card :division="division"></generic-card>
  </router-link>
</div>
</template>

<script>

import genericCard from '@/components/partials/genericCard.vue'

export default {
  name: 'divisionsView',
  components: {
    genericCard
  },
  props: {
  },
  data() {
    return {
      divisions: false
    }
  },
  computed: {
    stateDivisions() {
      return this.$store.state.division;
    }
  },
  watch: {
    '$route.params.departmentName' (name) {
      this.$store.dispatch('getDivisions', this.$route.params.departmentName)
    },
    'stateDivisions' (divisions) {
      console.log(divisions)
      this.divisions = divisions;
    },
  },
  mounted() {
    if (this.stateDivisions) {
      this.divisions = this.stateDivisions;
    }
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

