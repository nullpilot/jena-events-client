<template>
  <div>
    <Section>
      <h1 class="text-4xl font-bold text-indigo-600 mb-8">
        Jena Event Kalender
      </h1>

      <EventListBase start="2020-01-01" end="2020-12-31" />
    </Section>
  </div>
</template>

<script>
import Section from '~/components/layout/Section.vue'
import EventListBase from '~/components/calendar/EventListBase.vue'

export default {
  components: {
    Section,
    EventListBase
  }
}
</script>
