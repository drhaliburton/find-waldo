<!-- List all branch -->

<template>
<div class="content-container">
  <router-link v-if="branches" v-for="(branch, index) in branches" :key="index" tag="div" :to="branchRoute(branch)">
    <a>{{branch.name}}</a>
  </router-link>
</div>
</template>
<script>


export default {
  name: 'branchView',
  props: {
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
    branchRoute(branch) {
      let path = this.$route.path;
      if (branch.children) {
        path = path + '/branches/' + branch.name;
      } else {
        path = path + '/branches/' + branch.name + '/employees';
      }
      return path;
    }
  }
}

</script>

