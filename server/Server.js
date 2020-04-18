/**
 * @author Johannes Häuser
 */
class Server {
  constructor(conf) {
    this.conf = conf
    this.Users = []
    this.dirty = false
  }

  getUserByName(name) {
    return this.Users.find((User) => User.name === name)
  }

  getUserbyEmail(email) {
    console.log('getUserbyEmail' + email + ' ' + JSON.stringify(this.Users))
    const user = this.Users.find((User) => User.email === email)
    console.log(user)
    return user
  }

  addUser(user) {
    // TODO check for existic user with the name/email
    this.Users.push(user)
  }
}

module.exports = Server
