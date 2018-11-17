<template>
  <div id="app">
    <div class="content-container">
      <app-frame :employees="employees" :departments="departments"></app-frame>
    </div>
  </div>
</template>

<script>
import appFrame from './components/Frame.vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      employees: false,
      departments: false
    }
  },
  components: {
    appFrame
  },
  created() {
    axios.get('/api/employees.json')
      .then(res => this.employees = res.data.employees);
    axios.get('/api/departments.json')
      .then(res => this.departments = res.data.departments);
  },


}
</script>

<style>
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
  background-color: white;
  margin: auto;
}

a {
  color: black;
}
</style>
