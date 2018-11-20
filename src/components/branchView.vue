<!-- List all branch -->

<template>
<div class="content-container">
  <h1>{{branches.name}} Branches</h1>
  <generic-card v-if="!branch[index]" v-for="(branch, index) in branches" :key="index" :department="branch" :click="() => goToRoute(branch, index)"></generic-card>
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
      return this.content[this.$route.params.index].children[this.$route.params.divIndex].children;
    }
  },
  methods: {
    goToRoute(branch, index) {
      console.log(branch)
      let path = this.$route.path;
      if (branch && branch.children) {
        path = path + '/branches/' + index;
      } else {
        path = path + '/branches/' + index + '/employees';
      }
      this.$router.push(path)
    }
  }
}

</script>

