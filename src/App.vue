<template>
  <div id="app">
    <div class="content-container">
      <employee-card v-for="(employee, index) in employees" :key="index" :employee="employee"></employee-card>
    </div>
  </div>
</template>

<script>
import employeeCard from './components/employeeCard.vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      employees: false
    }
  },
  components: {
    employeeCard
  },
  created() {
    axios.get('/api/employees.json')
      .then(res => this.employees = res.data.employees);
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
  margin-top: 60px;
}

body {
  background-color: #819db1;
}

.content-container {
  max-width: 800px;
  height: 100vh;
  background-color: #fafafa;
  margin: auto;
}

a {
  color: black;
}
</style>
