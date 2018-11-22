<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <h1>{{divisions.name}} Divisions
      <md-button class="action-button" @click="viewEmployees">View All Employees</md-button>
  </h1>
  <generic-card v-if="divisionArray" v-for="(division, index) in divisionArray" :key="index" :department="division" :click="() => goToRoute(division, index)"></generic-card>
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
  data() {
    return {
      divisionArray: []
    }
  },
  computed: {
    divisions() {
      return this.content[this.$route.params.index];
    },
  },
  components: {
    genericCard
  },
  created() {
    this.parseDivisions()
  },
  watch: {
    'divisions' (div) {
      this.parseDivisions()
    },
  },
  methods: {
    goToRoute(division, index) {
      let path = this.$route.path;
      if (division.children) {
        path = path + '/divisions/' + index;
      } else {
        path = path + '/divisions/' + index + '/employees';
      }
      this.$router.push(path);
    },
    parseDivisions() {
      let results = [];
      this.divisions.children.map(division => {
        if (division.length) {
          division.map(b => {
            results.push(b)
          })
        } else {
          results.push(division)
        }
      })
      this.divisionArray = results;
    },
    viewEmployees() {
      this.$router.push((this.$route.path + '/employees'))
    }
  }
}
</script>

