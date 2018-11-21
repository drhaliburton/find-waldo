<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <h1>{{divisions.name}} Divisions</h1>
  <generic-card v-if="divisions" v-for="(division, index) in divisions.children" :key="index" :department="division" :click="() => goToRoute(division, index)"></generic-card>
</div>
</template>

<script>
import genericCard from '@/components/partials/genericCard.vue'

export default {
  name: 'divisionsView',
  components: {
    genericCard
  },
  props: ['content', 'formatRoute'],
  computed: {
    divisions() {
      return this.content[this.$route.params.index];
    },
  },
  components: {
    genericCard
  },
  mounted() {
    console.log('hello', this.content)
},
  methods: {
    goToRoute(division, index) {
      let path = this.$route.path;
      if (division.children) {
        path = path + '/divisions/' + index;
      } else {
        path = path + '/divisions/' + index + '/employees';
      }
      console.log(path)
      this.$router.push(path);
    }
  }
}
</script>

