<template>
  <div id="app" v-if="departments">
    <app-frame :formatRoute="formatRoute">
      <breadcrumb :content="departments"></breadcrumb>
      <!-- <md-field v-if="!this.$route.path.includes('employee/')">
        <label>Search</label>
        <md-input v-model="searchQuery"></md-input>
        <div class="md-toolbar-section-end">
        </div>
      </md-field> -->
      <router-view v-if="employees" :content="departments" :formatRoute="formatRoute"></router-view>
    </app-frame>
  </div>
</template>

<script>
import appFrame from '@/components/partials/app-frame.vue'
import breadcrumb from '@/components/partials/breadcrumb.vue'


export default {
  name: 'app',
  components: {
    appFrame,
    breadcrumb,
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
    },
    routeHistory() {
      return this.$router;
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

::-webkit-scrollbar
{
    width: 0px;
}
::-webkit-scrollbar-track-piece
{
    background-color: transparent;
    -webkit-border-radius: 6px;
}


.md-toolbar.md-theme-default.md-primary,
.md-field.md-theme-default:before {
  background-color: #244C5A !important;
}

.md-field.md-theme-default.md-focused label, {
  color: #244C5A;
}

.md-app-internal-drawer, .md-app-side-drawer .md-app-container {
  width: 100%;
}

.md-drawer-active {
  .breadcrumb {
    margin: 10px;
  }
  .content-container {
    margin: 0 auto;
  }
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
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-left: 40px;
}

a {
  color: black;
}

h1 {
  width: 100%;
  font-weight: 600;
  margin: 40px 10px;
  line-height: 30px;
}

.md-app:not(.md-overlap).md-theme-default {
    height: 100vh;
    overflow-x: hidden;
    margin-top: -1px;
    margin-left: -1px;
    margin-right: -1px;
}

.md-drawer.md-persistent-mini:not(.md-active) .md-list-item-content {
  padding: 0 !important;
}

.md-card {
  margin: 10px !important;
  .md-button {
    margin: 10px;
  }
}

.md-content {
  width: 100% !important;
  .md-card-content{
    min-height: 100px;
  }
}


@media only screen and (max-width: 1050px) {
  .md-card {
    width: 100% !important;
  }

  .md-drawer {
    display: none;
  }

  .md-app-scroller {
    padding-left: 0 !important;
  }
  .breadcrumb {
    margin-left: 10px !important;
  }
  .content-container {
    margin-left: 0px;
  }
}

.md-card {
  width: 30%;
  height: auto;
  margin: 10px;
}
.text-center {
  margin: auto;
  text-align: center;
}

html {
  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;
}

.md-overlay {
  display: none;
}

.action-button {
  display: block;
  margin: 20px auto;
}
.md-app-container {
  padding-left: 60px;
}

.md-active {
  .md-app-container {
    padding-left: 0px;
  }
}

  .yukon-logo {
    margin-right: 25px;
    width: 10%;
    max-width: 90px;
  }

@media only screen and (max-width: 600px) {
  .md-button {
    display: block;
  }

  .md-card-actions {
    flex-wrap: wrap;
    margin: auto;
  }
  .md-card-actions.md-alignment-left {
    justify-content: center;
    .md-button {
      margin: 10px auto;
    }
  }
}

.md-list-item-content {
    padding: 0px 5px;
    -webkit-box-pack: left;
    -ms-flex-pack: left;
    justify-content: left;
    width: 275px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}
</style>
