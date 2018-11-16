<template>
  <md-card>
    <md-card-header>

      <md-card-media md-medium>
        <img src="https://vuematerial.io/assets/examples/card-weather.png" alt="People">
      </md-card-media>

      <md-card-header-text>
        <div class="md-title">{{user.first_name}} {{user.last_name}}</div>
        <div class="md-subhead">{{user.title}}</div>
        <md-chip style="background-color: lightgrey">English</md-chip>
        <md-chip style="background-color: lightgrey">French</md-chip>
        <md-chip style="background-color: lightgrey">Support</md-chip>
      </md-card-header-text>

    </md-card-header>

    <md-card-actions md-alignment="left">
      <md-button :href="emailPath">
        <md-icon>mail_outline</md-icon>
        {{user.email}}
      </md-button>
      <md-button :tel="user.phone_office">
        <md-icon>phone</md-icon>
        {{user.phone_office}}
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    user: Object
  },
  computed: {
    emailPath() {
      return `mailto:${this.user.email}`;

    }
  }
}
</script>

<style>
.md-card-header {
  text-align: left;
}

.md-card-media.md-medium {
  margin-right: 20px;
}
</style>

