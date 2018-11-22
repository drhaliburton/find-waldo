<!-- List all branch -->

<template>
<div class="content-container">
  <h1>{{branches.name}} Branches
      <md-button class="action-button" @click="viewEmployees">View All Employees</md-button>
  </h1>
  <generic-card v-if="!branch[0]" v-for="(branch, index) in branchArray" :key="index" :department="branch || branch[0]" :click="() => goToRoute(branch, index)"></generic-card>
</div>
</template>

<script>
import genericCard from '@/components/partials/genericCard.vue'

export default {
  name: 'branchView',
  props: ['content'],
  components: {
    genericCard
  },
  computed: {
    branches() {
      return this.content[this.$route.params.index].children[this.$route.params.divIndex];
    }
  },
  data() {
    return {
      branchArray: []
    }
  },
  created() {
    this.parseBranches()
  },
  mounted() {
    if (!this.branches) {
      this.$router.go(-1)
    }
  },
  methods: {
    goToRoute(branch, index) {
      let path = this.$route.path;
      if (branch && branch.children) {
        path = path + '/branches/' + index;
      } else {
        path = path + '/branches/' + index + '/employees';
      }
      this.$router.push(path)
    },
    parseBranches() {
      let results = [];
      this.branches.children.map(branch => {
        if (branch.length) {
          branch.map(b => {
            results.push(b)
          })
        } else {
          results.push(branch)
        }
      })
      this.branchArray = results;
    },
    viewEmployees() {
      this.$router.push((this.$route.path + '/employees'))
    }
  },
}

</script>

