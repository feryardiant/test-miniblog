import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * Show list of posts
   */
  async index({ inertia, auth }: HttpContext) {
    const users = await User.query().withCount('posts').orderBy('created_at', 'desc')

    return inertia.render('users/index', {
      auth: auth.user,
      users: users.map((user) => ({
        ...user.serialize(),
        postsCount: user.$extras.posts_count,
      })),
    })
  }

  /**
   * Show user profile with their posts
   */
  async show({ auth, params, inertia }: HttpContext) {
    const user = await User.query()
      .where('handle', params.handle)
      .preload('posts', (query) => {
        query.orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return inertia.render('users/show', {
      auth: auth.user,
      author: user,
      posts: user.posts,
    })
  }

  /**
   * Show current user's profile
   */
  async profile({ auth, inertia }: HttpContext) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .preload('posts', (query) => {
        query.orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return inertia.render('users/show', {
      auth: auth.user,
      author: user,
      posts: user.posts,
    })
  }
}
