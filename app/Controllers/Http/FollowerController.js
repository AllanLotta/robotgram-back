'use strict'

const Follower = use('App/Models/Follower')

class FollowerController {
  async index ({ params }) {
    const followers = await Follower.query()
      .where('user_id', params.user_id)
      .with('user')
      .fetch()

    return followers
  }

  async store ({ params, request, auth }) {
    if (params.user_id != auth.user.id) {
      return { error: 'User_id not authenticated' }
    }
    const data = request.only(['follower_id'])

    const checkExists = await Follower.query()
      .where('user_id', auth.user.id)
      .fetch()

    /**
     * in checkExists i receive a object and i need to make it  a array
     */
    const getArray = Object.values(checkExists)[0]
    const followersId = []

    Object.values(getArray).forEach(Element => {
      followersId.push(Element.follower_id)
    })
    const followingUsers = followersId.filter(r => r == data.follower_id)

    if (followingUsers.length > 0) {
      return { error: 'You already follow this user' }
    }

    const follower = Follower.create({ ...data, user_id: auth.user.id })
    return follower
  }

  async destroy ({ params, auth, response }) {
    if (auth.user.id != params.user_id) {
      return {
        error: 'User_id not authenticated'
      }
    }
    const follower = await Follower.findOrFail(params.id)
    await follower.delete()
  }
}

module.exports = FollowerController
