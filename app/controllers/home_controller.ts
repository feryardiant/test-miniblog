import Post from '#models/post'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Show list of posts
   */
  async index({ inertia, auth, session }: HttpContext) {
    const posts = await Post.query()
      .preload('author')
      .orderBy('published_at', 'desc')
      .paginate(1, 10)

    const authWeb: number | undefined = session.get('auth_web')
    let currentUser: User | null = null

    if (authWeb) {
      currentUser = await User.find(authWeb)
    }

    return inertia.render('home', {
      auth: auth.user || currentUser,
      posts: posts.serialize(),
    })
  }
}
