<template>
<md-app-drawer md-permanent="full">
  <md-toolbar class="md-transparent" md-elevation="0">
    Navigation
  </md-toolbar>

  <md-list>
    <md-list-item>
      <md-icon>move_to_inbox</md-icon>
      <span class="md-list-item-text">Community Services</span>
    </md-list-item>

    <md-list-item>
      <md-icon>send</md-icon>
      <span class="md-list-item-text">Economic Development</span>
    </md-list-item>

    <md-list-item>
      <md-icon>delete</md-icon>
      <span class="md-list-item-text">Education</span>
    </md-list-item>

    <md-list-item>
      <md-icon>error</md-icon>
      <span class="md-list-item-text">Energy Mines and Resources</span>
    </md-list-item>
  </md-list>
</md-app-drawer>
</template>

<script>
export default {
  name: 'appDrawer',
}
</script>

<style lang="scss" scoped>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
