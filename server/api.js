const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { google } = require('googleapis')
const dayjs = require('dayjs')
const SCOPES = ['https://www.googleapis.com/auth/calendar']

async function initApi({ publicId, privateId }) {
  const authClient = await getAuth(SCOPES)
  const calendar = google.calendar({ version: 'v3', auth: authClient })

  router.get('/event/list', async function(req, res) {
    const events = await getCalendarEvents(calendar, publicId)

    res.send(events)
  })

  router.get('/event/listPrivate', async function(req, res) {
    const events = await getCalendarEvents(calendar, privateId)

    res.send(events)
  })

  router.post('/event/create', bodyParser.json(), async function(req, res) {
    const { title, description, location, date, time } = req.body
    const start = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm')
    const event = {
      summary: title,
      description,
      location,
      start: {
        dateTime: start.format(),
        timeZone: 'Europe/Berlin'
      },
      end: {
        dateTime: start.add(1, 'h').format(),
        timeZone: 'Europe/Berlin'
      }
    }

    const eventRes = await calendar.events.insert({
      calendarId: privateId,
      resource: event
    })

    return res.sendStatus(eventRes.status)
  })

  router.delete('/event/:id', async function(req, res) {
    const eventId = req.params.id

    const deleteRes = await calendar.events.delete({
      calendarId: privateId,
      eventId
    })

    res.sendStatus(deleteRes.status)
  })

  return router
}

async function getCalendarEvents(calendar, calendarId) {
  const eventRes = await calendar.events.list({ calendarId })
  const events = eventRes.data.items.map((event, i) => {
    return {
      id: event.id,
      title: event.summary,
      location: event.location || '',
      description: event.description || '',
      start: event.start.dateTime,
      end: event.end.dateTime,
      host: getHostInfo(event, i)
    }
  })

  return events
}

function getHostInfo(event, i) {
  return {
    id: i % 2,
    name: i % 2 ? 'Testveranstalter' : 'Demoveranstalter',
    editable: i % 2 // Check against session if the requester is the owner
  }
}

async function getAuth(scopes) {
  // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables.
  const auth = new google.auth.GoogleAuth({ scopes })
  const authClient = await auth.getClient()

  // obtain the current project Id
  const projectId = await auth.getProjectId()
  console.info(`Authorized for project ${projectId}`)

  return authClient
}

module.exports = initApi
