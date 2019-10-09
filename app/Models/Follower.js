'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Follower extends Model {
  userFollowed () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

  userFollower () {
    return this.belongsTo('App/Models/User', 'follower_id', 'id')
  }
}

module.exports = Follower
