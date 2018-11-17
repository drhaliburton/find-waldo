<template>

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
  }
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
</style>