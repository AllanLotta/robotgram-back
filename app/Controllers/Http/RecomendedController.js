'use strict'
const User = use('App/Models/User')
const Follower = use('App/Models/Follower')
class RecomendedController {
  async index ({ auth }) {
    const followers = await Follower.query()
      .where('user_id', auth.user.id)
      .fetch()

    /**
     * in followers i receive a object and i need to make it  a array
     */
    const getArray = Object.values(followers)[0]
    const followersId = []

    Object.values(getArray).forEach(Element => {
      followersId.push(Element.follower_id)
    })
    const users = await User.query()
      .limit(6)
      .whereNotIn('id', followersId)
      .whereNot('id', auth.user.id)
      .fetch()
    return users
  }
}

module.exports = RecomendedController
