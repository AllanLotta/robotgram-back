'use strict'
const Post = use('App/Models/Post')
const Follower = use('App/Models/Follower')

class PostController {
  async index ({ request, response, view, auth }) {
    const followers = await Follower.query()
      .where('user_id', auth.user.id)
      .fetch()

    /**
     * in followers i receive a object and i need to make it  a array
     */
    const getArray = Object.values(followers)[0]
    const followersId = [auth.user.id]

    Object.values(getArray).forEach(Element => {
      followersId.push(Element.follower_id)
    })

    const posts = await Post.query()
      .with('user')
      .with('file')
      .whereIn('user_id', followersId)
      .orderBy('created_at', 'desc')
      .fetch()

    return posts
  }

  async store ({ request, response, auth }) {
    const data = request.only(['file_id', 'description'])

    const post = await Post.create({ ...data, user_id: auth.user.id })
    return post
  }

  async show ({ params }) {
    const post = await Post.findOrFail(params.id)
    await post.load('user')
    await post.load('file')
    return post
  }

  async update ({ params, request }) {
    const post = await Post.findOrFail(params.id)
    // if you get error on posts: check if on update post the file_id go to null
    const data = request.only(['description'])

    post.merge(data)

    await post.save()

    return post
  }

  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}

module.exports = PostController
