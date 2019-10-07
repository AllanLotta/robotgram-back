'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { username, password } = request.all()
    const token = await auth.attempt(username, password)
    let user = []
    if (token) {
      user = await User.query()
        .where('username', username)
        .first()
    }
    user.merge({ authorization: token })
    const { id, avatar, email, fullname, authorization } = user
    return { id, username, email, fullname, avatar, authorization }
  }
}

module.exports = SessionController
