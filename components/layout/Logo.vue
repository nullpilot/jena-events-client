<template>
  <nuxt-link class="flex items-center logo-link" :to="{ name: 'index' }">
    <svg
      fill="transparent"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      class="w-10 h-10 logo mr-2"
    >
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      ></path>
    </svg>

    <span class="text-3xl tracking-tight">KulturPlaner Jena</span>
  </nuxt-link>
</template>

<style scoped>
.logo-link {
  animation: 1s appear;
}

.logo {
  transition: fill 150ms ease-out;
}

.logo-link:hover {
  color: theme('colors.indigo.900');
}

.logo-link:hover .logo {
  fill: theme('colors.indigo.100');
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
