
<template>
<div class="content-container">
  <router-link v-if="units" v-for="(unit, index) in units" :key="index" tag="div" :to="unitRoute(unit)">
    <a>{{unit.name}}</a>
  </router-link>
</div>
</template>
<script>


export default {
  name: 'unitView',
  props: {
  },
  data() {
    return {
      unit: false,
    }
  },
  computed: {
    units() {
      return this.$store.state.units;
    }
  },
  created() {
    if (!this.units) {
      this.$store.dispatch('getunits', this.$route.params.branchName)
    }
  },
  watch: {
    '$route.params.branchName' (name) {
      this.$store.dispatch('getunits', this.$route.params.branchName)
    },
  },
  methods: {
    unitRoute(unit) {
      let path = this.$route.path;
      if (unit.children) {
        path = path + '/units/' + unit.name;
      } else {
        path = path + '/units/' + unit.name + '/employees';
      }
      return path;
    }
  }
}

</script>

