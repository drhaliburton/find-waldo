<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Find a Government Employee</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-field>
            <label>Search</label>
            <md-input v-model="initial"></md-input>
          </md-field>
        </md-toolbar>

        <div class="full-control">
          <div class="list">
            <md-list :md-expand-single="expandSingle">
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
import employeeView from '@/components/employeeView';

export default {
  name: 'Frame',
  props: {
    employees: Object,
    departments: Array
  },
  components: {
    employeeView
  },
  data() {
    return {
      expandSingle: false,
      expandNews: false,
      initial: '',
    }
  }

}

</script>

<style lang="scss" scoped>

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

