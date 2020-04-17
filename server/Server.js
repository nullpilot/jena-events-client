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
    const user = this.Users.find((User) => User.email === email)
    return user
  }

  addUser(user) {
    this.Users.push(user)
  }
}

module.exports = Server
