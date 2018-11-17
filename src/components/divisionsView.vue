<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">

</div>
</template>

<script>


export default {
  name: 'divisionsView',
  props: {
  },
  components: {
  },
  computed: {
    divisions() {
      return this.$store.state.divisions;
    }
  }
}

</script>

