<template>
  <Modal :state="state">
    <form action="" class="w-full max-w-lg" @submit.prevent="createEvent">
      <h1 class="font-bold text-xl mb-8">Neue Veranstaltung</h1>

      <p class="mb-6 text-sm">
        Hier können Sie eine neue Veranstaltung anlegen. Bitte beachten Sie,
        dass diese vorerst nicht öffentlich gemacht wird und nur von anderen
        Veranstaltern eingesehen werden kann. Sie können das Event unter
        <a href="#">Meine Veranstaltungen</a> offiziell und damit öffentlich
        einsehbar machen.
      </p>

      <label for="title" class="form-label" required>
        Name der Veranstaltung
      </label>
      <input id="title" v-model="form.title" type="text" class="form-element" />

      <label for="description" class="form-label">
        Beschreibung
      </label>
      <textarea
        id="description"
        v-model="form.description"
        type="text"
        class="form-element"
        required
      ></textarea>

      <label for="date" class="form-label">
        Datum & Uhrzeit
      </label>
      <div class="sm:flex sm:-mx-1">
        <input
          id="date"
          v-model="form.date"
          type="date"
          class="form-element sm:mx-1"
          required
        />
        <input
          id="time"
          v-model="form.time"
          type="time"
          class="form-element sm:mx-1"
          required
          pattern="[0-9]{2}:[0-9]{2}"
        />
      </div>

      <label for="location" class="form-label">
        Veranstaltungsort
      </label>
      <input
        id="location"
        v-model="form.location"
        type="text"
        class="form-element"
      />

      <div class="flex justify-end sm:mx-1 mt-8">
        <button
          v-if="submitStatus === ''"
          type="submit"
          class="inline-block py-2 px-4 text-sm rounded text-white bg-indigo-400 hover:bg-indigo-600 sm:-mr-1 w-full sm:w-1/2 font-medium"
        >
          Veranstaltung eintragen
        </button>
        <p v-else class="font-bold text-center">
          Das Event wurde angelegt!
        </p>
      </div>
    </form>
  </Modal>
</template>

<script>
import dayjs from 'dayjs'
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
  },
  data() {
    const now = dayjs()

    return {
      form: {
        title: '',
        description: '',
        location: '',
        date: now.format('YYYY-MM-DD'),
        time: now.add(1, 'h').format('hh:00')
      },
      submitStatus: ''
    }
  },
  methods: {
    async createEvent() {
      const data = this.form

      try {
        const res = await this.$axios.post('/api/event/create', data)

        if (res.status === 200) {
          this.submitStatus = 'SUCCESS'
          this.$emit('create')
          return
        } else {
          console.error(res)
          throw new Error('Veranstaltung konnte nicht angelegt werden')
        }
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }

      this.submitStatus = ''
    }
  }
}
</script>

<style>
.form-label,
.form-element {
  display: block;
  width: 100%;
}

.form-label {
  margin-bottom: theme('spacing.2');
}
.form-element {
  border: 1px solid theme('colors.gray.400');
  padding: theme('spacing.1') theme('spacing.2');
  border-radius: theme('borderRadius.default');
  margin-bottom: theme('spacing.4');
  background-color: theme('colors.white');
}

.form-element:disabled {
  background-color: theme('colors.gray.400');
  color: theme('colors.gray.700');
}

textarea.form-element {
  min-height: 4em;
}

.form-element:focus {
  border-color: theme('colors.indigo.400');
  box-shadow: 0 0 0 1px theme('colors.indigo.400');
  outline: 0;
}
</style>
