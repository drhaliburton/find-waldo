<!-- List all branch -->

<template>
<span>
  <h1>{{this.$route.params.branchName}} Branches</h1>
  <span v-for="(branch, index) in branches" :key="index" @click="goToRoute(branch)">
    <generic-card :department="branch" :click="goToRoute"></generic-card>
  </span>
</span>
</template>

<script>
import genericCard from '@/components/partials/genericCard.vue'

export default {
  name: 'branchView',
  components: {
    genericCard
  },
  data() {
    return {
      branch: false,
    }
  },
  computed: {
    branches() {
      return this.$store.state.branch;
    }
  },
  mounted() {
    if (this.$store.state.branches) {
      this.$store.dispatch('getBranches', this.$route.params.divisionName)
    }
  },
  watch: {
    '$route.params.divisionName' (name) {
      this.$store.dispatch('getBranches', this.$route.params.divisionName)
    },
  },
  methods: {
    goToRoute(branch) {
      let path = this.$route.path;
      if (branch.children) {
        path = path + '/branches/' + branch.name;
      } else {
        path = path + '/branches/' + branch.name + '/employees';
      }
      this.$router.push(path)
    }
  }
}

</script>

