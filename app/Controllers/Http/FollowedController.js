'use strict'
const Follower = use('App/Models/Follower')
class FollowedController {
  async index ({ params }) {
    const follows = await Follower.query()
      .where('follower_id', params.user_id)
      .with('user')
      .fetch()
    return follows
  }
}

module.exports = FollowedController
