require('dotenv').config()

const fs = require('fs')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const flash = require('express-flash')

const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = require('../nuxt.config.js')
const Server = require('./Server.js')
const initializePassport = require('./passport-config')

const User = require('./User')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// Import API routes
const apiRoutes = require('./api.js')

let server

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(
    '/api',
    await apiRoutes({
      publicId: process.env.PUBLIC_CAL_ID,
      privateId: process.env.PRIVATE_CAL_ID
    })
  )

  // Give nuxt middleware to express
  app.use(nuxt.render)

  fs.readFile('./conf/conf.json', (err, data) => {
    if (err) console.log(err)
    const conf = JSON.parse(data)
    server = new Server(conf)
    initializePassport(
      passport,
      (email) => {
        console.log('email')
        server.getUserbyEmail(email)
      },
      (name) => {
        server.getUserByName(name)
      }
    )

    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      next()
    })

    app.use(express.urlencoded({ extended: false }))
    app.use(flash())
    app.use(
      session({
        secret: server.conf.secret,
        resave: false,
        saveUninitialized: false
      })
    )
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))
  })

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
/*
app.post('/login', checkNotAuthenticated, (req, res) => {
  console.log('login body:' + JSON.stringify(req.body))
  try {
    passport.authenticate(
      'local',
      /*
      {
        successRedirect: '/',
        failureRedirect: '/login'
      },
      function(req, res) {
        console.log('passport user', req.user)
        console.log('end login')
      }
    )
  } catch (e) {
    console.log(e)
  }

}) */

app.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('passport user', req.user)
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  console.log('register body:' + JSON.stringify(req.body))
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User(req.body.name, req.body.email, hashedPassword)
    server.addUser(user)
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
module.exports = app
