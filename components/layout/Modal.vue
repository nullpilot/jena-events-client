<template>
  <transition name="fade">
    <div
      v-show="state && state.isOpen"
      class="modal fixed inset-0 z-40 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white p-12 rounded relative sm:m-4 flex-initial max-h-full overflow-y-auto"
        @click.stop=""
      >
        <button class="absolute top-0 right-0 text-xs p-2" @click="closeModal">
          Schließen
        </button>

        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.state.isOpen = false
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.float-enter-active,
.float-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.float-enter-to,
.floating-menu {
  transform: translateY(0);
}
.float-enter,
.float-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
