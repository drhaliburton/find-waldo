<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{department.name}}</div>
      </md-card-header>

      <md-card-content>
        This is a description about the department.
      </md-card-content>

    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: 'RegularCards',
  props: {
    department: Object,
    divisions: Object
  },
}
</script>

<style lang="scss" scoped>

.md-card-header, .md-card-content {
  text-align: center;
}

.md-card-content {
  text-align: center !important;
}

</style>