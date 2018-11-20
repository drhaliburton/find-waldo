<template>
  <div id="app" v-if="departments">
    <app-frame :formatRoute="formatRoute">
      <md-field v-if="!this.$route.path.includes('employee/')">
        <label>Search</label>
        <md-input v-model="searchQuery"></md-input>
        <div class="md-toolbar-section-end">
        </div>
      </md-field>
      <router-view v-if="employees" :content="departments" :formatRoute="formatRoute"></router-view>
    </app-frame>
  </div>
</template>

<script>
import appFrame from '@/components/partials/Frame.vue'

export default {
  name: 'app',
  components: {
    appFrame
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  mounted() {
    this.$store.dispatch('getContent');
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    },
    employees() {
      return this.$store.state.employees;
    }
  },
  methods: {
    formatRoute(name) {
       if (name) {
        let path = name.includes(',') ? name.replace(",", "").toLowerCase().split(' ') : name.toLowerCase().split(' ');
        path = path.map((word, index) => {
          if (index + 1 !== path.length) {
            return (word + '-');
          } else {
            return word;
          }
        })
        let route = path.join('');
        return route;
      } else {
        return 'misc'
      }
    }
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
@import "~vue-material/dist/theme/all";

.md-app-container {
  overflow-x: hidden !important;
}

.md-toolbar.md-theme-default.md-primary,
.md-field.md-theme-default:before {
  background-color: #244C5A !important;
}

.md-field.md-theme-default.md-focused label, {
  color: #244C5A;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #819db1;
}

.content-container {
  max-width: 1500px;
  margin: auto;
}

a {
  color: black;
}

h1 {
  width: 100%;
  font-weight: 600;
  margin: 40px 10px;
}
.md-app:not(.md-overlap).md-theme-default {
    height: 100vh;
    overflow-x: hidden;
    margin-top: -1px;
    margin-left: -1px;
    margin-right: -1px;
}

  .content-container {
    display: flex;
    flex-wrap: wrap;
  }

  .md-card {
    margin: 10px !important;
  }


  @media only screen and (max-width: 1050px) {

    .md-card {
      width: 100% !important;
    }
  }

  .md-card {
    width: 30%;
    height: auto;
    margin: 10px;
  }

</style>
