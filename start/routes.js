'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.get('users/:id', 'UserController.show')
Route.post('sessions', 'SessionController.store')

Route.get('/files/:id', 'FileController.show')
Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('posts', 'PostController').apiOnly()
  Route.resource('user.follower', 'FollowerController').apiOnly()
  Route.get('/user/:user_id/follows', 'FollowedController.index')
}).middleware(['auth'])
