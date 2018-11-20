
<template>
<div class="content-container">
  <h1>Units</h1>
  <generic-card v-for="(unit, index) in units" :key="index" @click="() => goToRoute(unit, index)" :department="unit" :click="goToRoute"></generic-card>
</div>
</template>


<script>
import genericCard from '@/components/partials/genericCard.vue'

export default {
  name: 'unitView',
  props: ['content'],
  components: {
    genericCard,
  },
  computed: {
    units() {
      return this.content[this.$route.params.index].children[this.$route.params.divIndex].children[this.$route.params.unitIndex].children;
    }
  },
  methods: {
    goToRoute(unit, index) {
      let path = this.$route.path + '/units/' + index + '/employees';
      console.log(path)
      return path;
    }
  }
}

</script>

