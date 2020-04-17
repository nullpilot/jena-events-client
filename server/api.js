const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/calendar']

async function initApi({ publicId, privateId }) {
  const authClient = await getAuth(SCOPES)
  const calendar = google.calendar({ version: 'v3', auth: authClient })
  // const privateCal = await getCalendar(calendar, privateId)
  // const publicCal = await getCalendar(calendar, publicId)

  router.get('/publicEvents', async function(req, res) {
    const eventRes = await calendar.events.list({ calendarId: publicId })
    const events = eventRes.data.items.map((event) => {
      return {
        title: event.summary,
        location: event.location || '',
        description: event.description || '',
        start: event.start.dateTime,
        end: event.end.dateTime
      }
    })

    res.send(events)
  })

  return router
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
