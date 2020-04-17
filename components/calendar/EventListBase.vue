<template>
  <div>
    <div v-if="loading">Lade Kalender ...</div>
    <div v-else>
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
            :key="event.title"
            class="mb-2 sm:mb-4 sm:flex border-l-4 border-gray-300 py-2 px-6"
          >
            <div class="mr-8 mb-4 flex-auto">
              <h2 class="text-lg font-bold text-gray-800 mb-2">
                {{ event.title }}
              </h2>
              <!-- eslint-disable-next-line -->
              <p class="max-w-4xl" v-html="event.description"></p>
            </div>
            <div class="flex-none sm:w-48">
              <span v-if="event.start" class="time block">
                {{ event.start.format('HH:mm') }}
              </span>
              <span v-if="event.location" class="location block">
                {{ event.location }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/de'

dayjs.locale('de')

export default {
  props: {
    startDate: {
      type: String,
      default: '2020-01-01'
    },
    endDate: {
      type: String,
      default: '2020-12-31'
    }
  },
  data() {
    return {
      events: [],
      loading: true
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
        const events = await this.$axios.$get('/api/publicEvents')

        this.events = events.map((event) => {
          event.start = dayjs(event.start)

          return event
        })

        this.loading = false
      } catch (err) {
        // TODO: Error state
      }
    }
  }
}
</script>

<style scoped>
.time,
.location {
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
</style>
