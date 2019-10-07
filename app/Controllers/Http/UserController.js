'use strict'

const User = use('App/Models/User')

class UserController {
  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    return user
  }

  async store ({ request }) {
    const data = request.only([
      'username',
      'fullname',
      'email',
      'password',
      'bio',
      'avatar'
    ])
    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
