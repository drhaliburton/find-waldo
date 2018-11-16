<template>
<div class="employee-card-content" :class="{'content-expanded': contentExpanded}">
  <br>
  <b><md-icon>face</md-icon>{{employee.name}} can help you with:</b>
  <ul>
    <li v-for="(skill, index) in employee.skills" :key="index">{{skill}}</li>
  </ul>
  <b><md-icon>{{roleInfo.department.icon}}</md-icon>{{roleInfo.department.label}}</b>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin tempor eros, sed semper nunc aliquet at. Duis pulvinar risus quis libero ultricies fermentum. Etiam ullamcorper at est ornare consequat.  <br><br>
  <b><md-icon>{{roleInfo.division.icon}}</md-icon>{{roleInfo.division.label}}</b>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin tempor eros, sed semper nunc aliquet at. Duis pulvinar risus quis libero ultricies fermentum. Etiam ullamcorper at est ornare consequat.  <br><br>
  <b><md-icon>{{roleInfo.title.icon}}</md-icon>{{roleInfo.title.label}}</b>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin tempor eros, sed semper nunc aliquet at. Duis pulvinar risus quis libero ultricies fermentum. Etiam ullamcorper at est ornare consequat.<br><br>
</div>
</template>

<script>
export default {
  name: 'employee',
  props: {
    employee: Object,
    roleInfo: Object,
    contentExpanded: Boolean,
  },
  data() {
    return {
      departmentLookup: {
        "Highways and Public Works": ''
      }
    }
  },
}
</script>

<style scoped>
b {
    display: flex;
    align-items: center;
}

ul {
  margin-top: 0;
}

.md-icon {
  font-size: 18px!important;
  margin-left: 0 !important;
}
</style>