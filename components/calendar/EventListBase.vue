<template>
  <div class="relative">
    <div>
      <div
        v-if="admin"
        class="bg-gray-200 px-3 py-4 mb-8 flex justify-end -mx-2"
      >
        <button
          class="inline-block py-1 px-2 text-xs rounded text-white bg-indigo-400 hover:bg-indigo-600 mx-1"
          @click.prevent="showEventModal.isOpen = true"
        >
          Neue Veranstaltung
        </button>
        <button
          title="TODO"
          class="inline-block py-1 px-2 text-xs rounded text-white bg-indigo-400 hover:bg-indigo-600 mx-1"
          @click.prevent="showDiscussionModal.isOpen = true"
        >
          Neue Diskussion
        </button>
      </div>

      <CreateEventModal :state="showEventModal" @create="loadEvents" />
      <CreateDiscussionModal :state="showDiscussionModal" />

      <div v-if="loading">Lade Kalender ...</div>
      <div v-else-if="eventsByDate.length > 0">
        <div
          v-for="[date, eventsOnDate] in eventsByDate"
          :key="date.format('YYYY-MM-DD')"
          class="sm:flex py-4"
        >
          <div class="flex-initial sm:mr-8 flex sm:block items-baseline mb-4">
            <span class="block text-xl text-gray-800 order-2">{{
              date.format('MMM')
            }}</span>
            <span
              class="block text-2xl text-right font-bold text-indigo-600 order-1 mr-4 sm:mr-0"
              >{{ date.format('D') }}</span
            >
          </div>
          <div class="flex-auto -mb-8">
            <div
              v-for="event in eventsOnDate"
              :key="event.id"
              class="mb-2 sm:mb-4 sm:flex border-l-4 border-gray-300 py-2 px-6 items-center"
            >
              <div class="mr-8 mb-4 flex-auto">
                <h2 class="text-lg font-bold text-gray-800 mb-2">
                  {{ event.title }}
                  <span
                    v-if="event.visibility !== 'public'"
                    class="text-base italic font-normal text-gray-500"
                    >(nicht öffentlich)</span
                  >
                </h2>

                <!-- eslint-disable-next-line -->
                <p class="max-w-4xl" v-html="event.description"></p>
              </div>
              <div class="flex-none sm:w-48">
                <span v-if="event.start" class="time block" title="Beginn">
                  {{ event.start.format('HH:mm') }}
                </span>
                <span
                  v-if="event.location"
                  class="location block"
                  title="Veranstaltungsort"
                >
                  {{ event.location }}
                </span>
                <span
                  v-if="admin && event.host"
                  class="host block"
                  title="Veranstalter"
                >
                  {{ event.host.name }}
                </span>
                <div
                  v-if="admin"
                  class="-ml-3 bg-gray-200 mt-2 p-3 flex items-center"
                >
                  <div class="flex-auto flex">
                    <button
                      title="Absprache (TODO)"
                      class="mr-6 text-xs rounded text-indigo-500 hover:text-indigo-600 inline-flex"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        class="w-5 h-5 mr-3"
                      >
                        <path
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                      </svg>
                      <span class="font-bold">17</span>
                    </button>
                  </div>

                  <button
                    title="Veröffentlichen"
                    :class="[
                      'inline-block ml-1 mr-2 text-xs rounded',
                      event.visibility === 'public'
                        ? 'text-green-500 hover:text-red-400'
                        : 'text-gray-500 hover:text-green-500'
                    ]"
                    @click.prevent="publishEvent(event)"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-5 h-5"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    title="Bearbeiten (TODO)"
                    class="inline-block ml-1 mr-2 text-xs rounded text-gray-500 hover:text-indigo-600"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-5 h-5"
                    >
                      <path
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    title="Löschen"
                    class="inline-block ml-1 text-xs rounded text-gray-500 hover:text-red-600"
                    @click.prevent="deleteEvent(event.id)"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-5 h-5"
                    >
                      <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="">
        Keine Veranstaltungen verfügbar
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import CreateEventModal from '~/components/calendar/CreateEventModal.vue'
import CreateDiscussionModal from '~/components/calendar/CreateDiscussionModal.vue'

dayjs.locale('de')

export default {
  components: {
    CreateEventModal,
    CreateDiscussionModal
  },
  props: {
    startDate: {
      type: String,
      default: '2020-01-01'
    },
    endDate: {
      type: String,
      default: '2020-12-31'
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      events: [],
      loading: true,
      showEventModal: { isOpen: false },
      showDiscussionModal: { isOpen: false }
    }
  },
  computed: {
    eventsByDate() {
      const events = this.events
      const eventsByDate = new Map()

      for (let i = 0, l = events.length; i < l; i++) {
        const event = events[i]
        const eventDate = event.start.format('YYYY-MM-DD')

        if (eventsByDate.has(eventDate)) {
          const day = eventsByDate.get(eventDate)
          day.push(event)
          day.sort((a, b) => {
            return a.start.isBefore(b.start) ? -1 : 1
          })
        } else {
          eventsByDate.set(eventDate, [event])
        }
      }

      return Array.from(eventsByDate)
        .map(([date, events]) => {
          return [dayjs(date), events]
        })
        .sort((a, b) => {
          return a[0].isBefore(b[0]) ? -1 : 1
        })
    }
  },
  watch: {
    startDate() {
      this.loadEvents()
    },
    endDate() {
      this.loadEvents()
    }
  },
  created() {
    this.loadEvents()
  },
  methods: {
    async loadEvents() {
      this.loading = true

      try {
        const endpoint = this.admin
          ? '/api/event/listPrivate'
          : '/api/event/list'
        const events = await this.$axios.$get(endpoint)

        this.events = events.map((event) => {
          event.start = dayjs(event.start)

          return event
        })

        this.loading = false
      } catch (err) {
        // TODO: Error state
      }
    },
    async deleteEvent(eventId) {
      try {
        const endpoint = `/api/event/${eventId}`
        const res = await this.$axios.delete(endpoint)

        if (res.status === 204) {
          this.events = this.events.filter((event) => {
            return event.id !== eventId
          })
        } else {
          throw new Error('Veranstaltung konnte nicht gelöscht werden')
        }
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }
    },
    async publishEvent(event, newPublicState) {
      try {
        const endpoint = `/api/event/${event.id}/publish`
        console.log('UPDATING STATE TO ', event.visibility !== 'public')
        const res = await this.$axios.put(endpoint, {
          public: event.visibility !== 'public'
        })

        if (res.status === 200) {
          const i = this.events.indexOf(event)
          event.visibility = res.data.visibility

          if (i >= 0) {
            // Force update of nested prop
            this.$set(this.events, i, event)
          }
        } else {
          throw new Error('Veranstaltung konnte nicht veröffentlicht werden')
        }
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }
    }
  }
}
</script>

<style scoped>
.time,
.location,
.host {
  background-size: 20px 20px;
  background-position: left 6px;
  background-repeat: no-repeat;
  padding: theme('spacing.1') 0 theme('spacing.1') theme('spacing.8');
}

.time {
  background-image: url('~assets/icon/time.png');
}
.location {
  background-image: url('~assets/icon/location.png');
}

.host {
  background-image: url('~assets/icon/host.png');
}

.shadow-soft {
  box-shadow: 20px 20px 60px #c7c7c7, -20px -20px 60px #ffffff;
}
</style>
