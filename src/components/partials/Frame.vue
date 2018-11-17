<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Find a Government Employee</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button class="md-icon-button md-dense" @click="toggleMenu">
            <md-icon>chevron_left</md-icon>
          </md-button>
          <md-field>
            <label>Search</label>
            <md-input v-model="initial"></md-input>
            <div class="md-toolbar-section-end">
            </div>
          </md-field>
        </md-toolbar>

        <md-list>
            <md-icon>whatshot</md-icon>
              <router-link v-for="(department, index) in departments" :key="index" tag="div" :to="'/departments/' + department.name">
                <md-list-item class='foo-block'>
                  {{department.name}}
                </md-list-item>
              </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
  name: 'frame',
  data() {
    return {
      initial: '',
      menuVisible: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    }
  },
  created() {
    if (!this.$store.state.departments) {
      this.$store.dispatch('getContent');
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    max-width: 300px;
  }

    .yukon-logo {
    margin-left: auto;
    margin-right: 5px;
    width: 10%;
    max-width: 90px;
  }

  .md-toolbar.md-theme-default.md-transparent {
    padding-top: 13px;
  }

  input {
    caret-color: black !important;
  }

  .md-app {
    border: 1px solid rgba(#000, .12);
  }

  .md-content {
   background-color: #fafafa;
  }
</style>