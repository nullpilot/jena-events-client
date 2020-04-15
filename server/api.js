const express = require('express')
const router = express.Router()
const mockEvents = require('./mockEvents.js')

// define the home page route
router.get('/publicEvents', function(req, res) {
  res.send(mockEvents)
})

module.exports = router
