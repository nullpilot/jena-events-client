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
button,
input {
  @apply transition-colors duration-200 ease-out;
}

a.link {
  color: theme('colors.indigo.500');
}
a.link:hover {
  color: theme('colors.indigo.700');
  text-shadow: 0.125em 0.125em 0.125em rgba(0, 0, 0, 0.2);
}
</style>
