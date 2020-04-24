const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserByName) {
  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      function(email, password, done) {
        console.log('auth ' + email + ' ' + password)
        getUserByEmail(email, function(user) {
          console.log('user: ' + JSON.stringify(user))
          if (user === undefined) {
            return done(null, false, { message: 'No user with that email' })
          }
          if (user.validPassword(password)) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        })
      }
    )
  )
  passport.serializeUser((user, done) => done(null, user.name))
  passport.deserializeUser((name, done) => {
    return done(null, getUserByName(name))
  })
}

module.exports = initialize
