<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Find a Government Employee</span>
        <img class="yukon-logo" src="https://yukon.ca/sites/yukon.ca/themes/yukon_wxt/logo-white.svg">
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <br><br>
          <md-field>
            <label>Search</label>
            <md-input v-model="initial"></md-input>
          </md-field>
        </md-toolbar>

        <div class="full-control">
          <div class="list">
            <md-list :md-expand-single="true">
              <md-list-item v-for="(department, index) in departments" :key="index" :department="department">
                <md-icon>whatshot</md-icon>
                <span class="md-list-item-text">{{department.name}}</span>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </md-app-drawer>

      <md-app-content>
        <div class="md-layout md-gutter md-alignment-center">
          <slot></slot>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

export default {
  name: 'Frame',
  props: {
    employees: Object,
    departments: Array
  },
  data() {
    return {
      expanded: false,
      expandNews: false,
      initial: '',
    }
  }
}
</script>

<style lang="scss" scoped>
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

   // Demo purposes only
  .md-drawer {
    width: 100%;
    max-width: 300px;
  }

  .md-content {
   background-color: #fafafa;
  }
</style>

