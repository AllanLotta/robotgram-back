'use strict'
const Post = use('App/Models/Post')

class PostUserController {
  async index ({ params, auth }) {
    const posts = await Post.query()
      .where('user_id', params.user_id)
      .with('user')
      .with('file')
      .orderBy('created_at', 'desc')
      .fetch()

    return posts
  }
}

module.exports = PostUserController
