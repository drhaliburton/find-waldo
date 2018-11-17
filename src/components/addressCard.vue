<template>
<md-card>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{employee.office}}</div>
        <div class="md-subhead">
          {{employee.address}}, <span v-if="employee.suite">{{employee.suite}}</span><br>
          {{employee.community}}, {{employee.postal_code}}<br>
          PO {{employee.po_box}}<br>
          <div>Mailcode: {{employee.mailcode}}</div>
        </div>
      </md-card-header-text>
    </md-card-header>


    <md-card-actions md-alignment="left">
      <md-button :href="mapsPath" target="_blank">
        <md-icon>directions</md-icon>
        Directions
      </md-button>
      <md-button :href="mapsPath" target="_blank">
        <md-icon>place</md-icon>
        Map
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>

export default {
  name: 'addressCard',
  props: {
    employee: Object
  },
  computed: {
    mapsPath() {
      return `http://maps.google.com/?q=${this.employee.office} ${this.employee.address} ${this.employee.postal_code}`
    },
    mapsQuery() {
      return `?q=${this.employee.office} ${this.employee.address} ${this.employee.postal_code}`
    }
  },
}
</script>

<style>
.md-card{
  max-width: 800px;
  width: 100%;
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

.card-content {
  text-align: right;
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


p {
  text-align: left;
  margin-bottom: 0;
}

.mapouter{text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}
</style>