<template>
  <md-card>
    <md-card-header>

      <md-card-media md-medium>
        <img src="https://vuematerial.io/assets/examples/card-weather.png" alt="People">
      </md-card-media>

      <md-card-header-text>
        <div class="md-title">{{employee.first_name}} {{employee.last_name}}</div>
        <div class="md-subhead">{{employee.title}}</div>
        <md-chip style="background-color: lightgrey">English</md-chip>
        <md-chip style="background-color: lightgrey">French</md-chip>
        <md-chip style="background-color: lightgrey">Support</md-chip>
      </md-card-header-text>

      <md-icon :alt="employee.department">{{departmentLookup[employee.department]}}</md-icon>
      <md-icon :alt="employee.division">{{divisionLookup[employee.division]}}</md-icon>
      <md-icon :alt="employee.title">{{titleLookup[employee.title]}}</md-icon>

    </md-card-header>

    <md-card-content>
      <p>{{employee.first_name}} {{employee.last_name}} is a member of the <b>{{employee.division}}</b> division of the <b>Department of {{employee.department}}.</b></p>
      <role-info :contentExpanded="contentExpanded" :employee="{name: employee.first_name, skills: employee.skills}" :roleInfo="roleInfo"></role-info>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <md-button :href="emailPath">
        <md-icon>mail_outline</md-icon>
        {{employee.email}}
      </md-button>
      <md-button :tel="employee.phone_office">
        <md-icon>phone</md-icon>
        {{employee.phone_office}}
      </md-button>
      <md-button class="float-right" @click="expandContent">
        <md-icon>{{contentExpanded ? 'expand_less' : 'expand_more'}}</md-icon>
        {{contentExpanded ? 'See Less' : 'See More'}}
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import roleInfo from './partials/role-info'

export default {
  name: 'employeeCard',
  props: {
    employee: Object
  },
  components: {
    roleInfo
  },
  data() {
    return {
      contentExpanded: false,
      departmentLookup: {
        "Highways and Public Works": 'directions_car',
      },
      titleLookup: {
        "eServices Web Architect": 'computer',
      },
      divisionLookup: {
        "Information and Communications Technology": 'phone',
      }
    }
  },
  computed: {
    emailPath() {
      return `mailto:${this.employee.email}`;
    },
    roleInfo() {
      let roleInfo = {
        title: {
          label: this.employee.title,
          icon: this.titleLookup[this.employee.title],
        },
        department: {
          label: this.employee.department,
          icon: this.departmentLookup[this.employee.department],
        },
        division: {
          label: this.employee.division,
          icon: this.divisionLookup[this.employee.division],
        }
      }
      return roleInfo;
    }
  },
  methods: {
    expandContent() {
      this.contentExpanded = !this.contentExpanded;
    }
  }
}
</script>

<style>
.md-card{
  max-width: 600px;
  margin: auto;
  background-color: white;
}
.md-card-header,
.md-card-header+.md-card-content {
  text-align: left;
}


.md-card .md-subhead {
  padding-bottom: 10px;
}

.md-card-media.md-medium {
  margin-right: 20px;
}

.md-button-content {
  display: flex;
  align-items: center;
}

.md-icon {
  margin: 0 5px !important;
}

.md-card-actions .md-button+.md-button:last-child {
  margin-left: auto;
  margin-right: 10px;
}

.md-card-content {
  padding: 0 16px !important;
}

.employee-card-content {
  border-top: 1px solid lightgrey;
  text-align: left;
  height: auto;
  max-height: 0;
  transition: max-height .8s ease;
  overflow: hidden;
}

.content-expanded {
  max-height: 400px;
  overflow: scroll;
}
</style>