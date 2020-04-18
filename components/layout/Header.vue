<template>
  <nav class="flex bg-indigo-600 shadow-xl z-10 py-2">
    <div class="container mx-auto flex items-center flex-wrap sticky px-4">
      <!-- Logo -->
      <div class="flex items-center">
        <Logo></Logo>
      </div>
      <!-- Collapse Button -->
      <div class="flex sm:hidden ml-auto">
        <button type="button" @click="isOpen = !isOpen">
          <svg class="fill-current h-10 w-10" viewBox="0 0 24 24">
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
      <!-- Nav Items -->
      <div
        :class="!isOpen && 'hidden'"
        class="w-full block sm:flex sm:ml-auto sm:items-center sm:w-auto"
      >
        <nuxt-link
          :to="{ name: 'veranstaltungsplaner' }"
          class="block mt-4 mx-0 sm:inline-block sm:mx-4 sm:mt-0 menu-link"
        >
          Veranstaltungen verwalten
        </nuxt-link>
        <a
          href="#"
          class="inline-block bg-white text-indigo-600 font-bold hover:bg-indigo-900 hover:text-white mt-4 px-4 py-2 leading-none border-none rounded-full sm:mt-0"
        >
          Login
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '~/components/layout/Logo.vue'

export default {
  name: 'Header',
  components: {
    Logo
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
nav {
  color: white;
}

@screen sm {
  .menu-link {
    position: relative;
  }

  .menu-link::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 2px solid;
    transition: transform 150ms ease-out;
    transform: scaleX(0);
  }

  .menu-link:hover::after {
    transform: scaleX(1);
  }
}
</style>
