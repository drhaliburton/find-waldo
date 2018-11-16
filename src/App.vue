<template>
  <div id="app">
    {{employees}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      employees: false
    }
  },
  components: {
    HelloWorld
  },
  created() {
    axios.get('/api/employees.json')
      .then(res => this.employees = res.data);
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
</style>
