<template>
  <div class="sticky inset-x-0 top-0 z-10 bg-white">
    <div class="container mx-auto flex px-8 py-4 items-center justify-between">
      <div class="logo">
        <Logo></Logo>
      </div>

      <div class="menu">
        <nuxt-link to="events/" class="menu-link">Event-Kalender</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/layout/Logo.vue'

export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<style class="scoped">
.menu-link {
  display: block;
  color: theme('colors.gray.800');
  font-weight: 600;
  font-size: theme('fontSize.sm');
  padding: theme('spacing.3') theme('spacing.4');
  position: relative;
}

.menu-link::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 theme('spacing.4');
  border-top: 2px solid theme('colors.indigo.600');
  transition: transform 150ms ease-out;
  transform: scaleX(0);
}

.menu-link:hover::before {
  transform: scaleX(1);
}

.menu-link:hover {
  color: theme('colors.indigo.700');
  font-weight: 600;
}
</style>
