<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <generic-card v-if="divisions" v-for="(division, index) in divisions" :key="index" :department="division" :click="goToRoute"></generic-card>
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
    goToRoute(division) {
      let path = this.$route.path;
      if (division.children) {
        path = path + '/divisions/' + division.name;
      } else {
        path = path + '/divisions/' + division.name + '/employees';
      }
      this.$router.push(path);
    }
  }
}
</script>

