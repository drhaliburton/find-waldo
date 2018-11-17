<!-- Lists all the divisions within one organization -->

<template>
<div class="content-container">
  <generic-card></generic-card>
</div>
</template>

<script>
  import genericCard from '@/components/partials/genericCard.vue'

  export default {
    name: 'divisionsView',
    props: {
    },
    components: {
      genericCard,
    },
    computed: {
      divisions() {
        return this.$store.state.divisions;
      }
    }
  }

</script>

