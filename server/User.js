/**
 * @author Johannes Häuser
 */

const bcrypt = require('bcrypt')

class User {
  constructor(name, email, pw) {
    this.name = name
    this.email = email
    this.hashedPassword = pw
  }

  getName() {
    return this.name
  }

  gethashedpassword() {
    return this.hashedPassword
  }

  getEmail() {
    return this.email
  }

  sethashedpassword(pw) {
    this.hashedPassword = pw
  }

  setName(name) {
    this.name = name
  }

  setEmail(email) {
    this.email = email
  }

  validPassword(password) {
    return bcrypt.compare(password, this.hashedPassword)
  }
}

module.exports = User
