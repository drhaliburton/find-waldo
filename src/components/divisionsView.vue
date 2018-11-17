<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <router-link v-if="divisions" v-for="(division, index) in divisions" :key="index" tag="div" :to="divisionRoute(division)">
    <generic-card :department="division"></generic-card>
  </router-link>
</div>
</template>

<script>
import genericCard from '@/components/partials/genericCard.vue'
export default {
  name: 'divisionsView',
  computed: {
    divisions() {
      return this.$store.state.division;
    },
  },
  components: {
    genericCard
  },
  watch: {
    '$route.params.departmentName' (name) {
      this.$store.dispatch('getDivisions', this.$route.params.departmentName)
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

