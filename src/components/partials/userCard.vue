<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{user.first_name}} {{user.last_name}}</div>
                <div class="md-subhead">        {{user.title}}

                  </div>
      </md-card-header>

          <md-button @click="click(department)">
          View More
        </md-button>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: 'RegularCards',
  props: {
    user: Object,
    click: Function,
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