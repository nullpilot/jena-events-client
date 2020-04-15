<template>
  <div>
    <div v-if="loading">Lade Kalender ...</div>
    <div v-else>
      <div
        v-for="[date, eventsOnDate] in eventsByDate"
        :key="date.format('YYYY-MM-DD')"
        class="sm:flex py-4 border-b border-gray-400"
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
            :key="event.name"
            class="mb-8 sm:flex"
          >
            <div class="mr-8 mb-4">
              <h2 class="text-lg font-bold text-gray-800">{{ event.name }}</h2>
              <p class="max-w-4xl">
                {{ event.description }}
              </p>
            </div>
            <div>
              <span class="time block">{{ event.date.format('HH:mm') }}</span>
              <span class="location block">{{ event.location }}</span>
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
        const eventDate = event.date.format('YYYY-MM-DD')

        if (eventsByDate.has(eventDate)) {
          const day = eventsByDate.get(eventDate)
          day.push(event)
          day.sort((a, b) => {
            return a.date.isBefore(b.date) ? 1 : -1
          })
        } else {
          eventsByDate.set(eventDate, [event])
        }
      }

      return Array.from(eventsByDate).map(([date, events]) => {
        return [dayjs(date), events]
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
          event.date = dayjs(event.date)

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
