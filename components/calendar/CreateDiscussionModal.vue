<template>
  <Modal :state="state">
    DISCUSSION MODAL
  </Modal>
</template>

<script>
import Modal from '~/components/layout/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    state: {
      type: Object,
      required: true
    }
  }
}
</script>
