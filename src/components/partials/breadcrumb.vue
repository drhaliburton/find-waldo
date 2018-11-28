<template>
<div class="breadcrumb">
  <router-link tag="span" :to="'/'">Home</router-link>
  <router-link tag="span" v-for="(item, index) in routerHistory" :key="index" :to="(index == routerHistory.length - 1 ? item.path + '/employees/' : item.path)">
    <md-icon>navigate_next</md-icon>
    {{item.name}}
  </router-link>
</div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    content: Array,
  },
  data() {
    return {
      routerHistory: [],
    }
  },
  watch: {
    '$route' (route) {
      this.getRouterHistory()
    },
  },
  methods: {
    getRouterHistory() {
      if (this.$route.name !== 'employee') {
         let lookup = this.content;
          let routerArray = []
          if (this.$route.params.index) {
            routerArray.push({name: this.content[this.$route.params.index].name, path: '/departments/' + this.$route.params.index})
          }

          if (this.$route.params.divIndex) {
            routerArray.push({name: this.content[this.$route.params.index].children[this.$route.params.divIndex].name, path: '/departments/' + this.$route.params.index + '/divisions/' + this.$route.params.divIndex})
          }

          if (this.$route.params.branchIndex) {
            routerArray.push({name: this.content[this.$route.params.index].children[this.$route.params.divIndex].children[this.$route.params.branchIndex].name, path: '/departments/' + this.$route.params.index + '/divisions/' + this.$route.params.divIndex + '/branches/' + this.$route.params.branchIndex})
          }
          this.routerHistory = routerArray;
          this.$store.commit('setRouterHistory', routerArray);
      } else {
        this.routerHistory = this.$store.state.routerHistory;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
b {
    display: flex;
    align-items: center;
}

ul {
  margin-top: 0;
}

.md-icon {
  font-size: 18px!important;
  margin: 0 3px 0 0;
}

.breadcrumb {
  text-align: left;
  margin: 10px 30px 15px;

  span {
    font-size: 16px;
    padding: 10px 0;
    .md-icon {
      text-decoration: none;
      margin-bottom: 2px;
    }
    &:hover {
      cursor: pointer;
      color: #0097A9;
    }
  }

}

</style>