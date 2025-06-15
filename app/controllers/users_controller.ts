import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * Show list of posts
   */
  async index({ inertia }: HttpContext) {
    const users = await User.query().withCount('posts').orderBy('created_at', 'desc')

    return inertia.render('users/index', {
      users: users.map((user) => {
        return {
          ...user.serialize(),
          postsCount: user.$extras.posts_count,
        } as User & { postsCount: number }
      }),
    })
  }

  /**
   * Show user profile with their posts
   */
  async show({ params, inertia }: HttpContext) {
    const user = await User.query()
      .where('handle', params.handle)
      .preload('posts', (query) => {
        query.orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return inertia.render('users/show', {
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
      author: user,
      posts: user.posts,
    })
  }
}
