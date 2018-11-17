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
              <md-list-item md-expand :md-expanded.sync="expandNews" v-for="(department, index) in departments" :key="index" :department="department">
                <md-icon>whatshot</md-icon>
                <span class="md-list-item-text">{{department.name}}</span>
                <md-list slot="md-expand">
                  <md-list-item class="md-inset" v-for="(division, id) in department.divisions" :key="id" :division="division">{{division}}</md-list-item>
                </md-list>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </md-app-drawer>

      <md-app-content>
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="100" md-flex-xlarge="100">
              <employee-card v-for="(employee, index) in employees" :key="index" :employee="employee"></employee-card>
          </md-layout>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import employeeCard from '@/components/employeeCard';

export default {
  name: 'Frame',
  props: {
    employees: Object,
    departments: Object
  },
  components: {
    employeeCard,
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
</style>

