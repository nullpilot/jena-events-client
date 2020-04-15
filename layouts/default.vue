<template>
  <div>
    <Header />

    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/layout/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>
a,
button {
  @apply transition-colors duration-200 ease-out;
}
</style>
