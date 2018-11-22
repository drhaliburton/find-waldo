<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title"><md-icon>face</md-icon><br>{{user.first_name}} {{user.last_name}}</div>
          <div class="md-subhead">
            {{user.title}}
        </div>
      </md-card-header>
      <md-button>
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
  mounted() {
    this.$el.addEventListener('click', ()=> {
      this.click(this.user);
    })
  }
}
</script>

<style lang="scss" scoped>

.md-card-header, .md-card-content {
  text-align: center;
}

.md-card-content {
  text-align: center !important;
}

.md-icon {
  font-size: 25px !important;
  padding: 0 15px;
  margin-top: -5px;
}


</style>