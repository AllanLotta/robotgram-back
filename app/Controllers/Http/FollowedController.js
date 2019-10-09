'use strict'
const Follower = use('App/Models/Follower')
class FollowedController {
  async index ({ params }) {
    const followers = await Follower.query()
      .where('follower_id', params.user_id)
      .fetch()

    /**
     * in followers i receive a object and i need to make it  a array
     */
    const getArray = Object.values(followers)[0]
    const followsId = []

    Object.values(getArray).forEach(Element => {
      followsId.push(Element.user_id)
    })

    const follows = await Follower.query()
      .whereIn('user_id', followsId)
      .with('user')
      .fetch()

    return follows
  }
}

module.exports = FollowedController
