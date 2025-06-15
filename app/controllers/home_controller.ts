import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Show list of posts
   */
  async index({ inertia }: HttpContext) {
    const posts = await Post.query()
      .preload('author')
      .orderBy('published_at', 'desc')
      .paginate(1, 10)

    return inertia.render('home', {
      posts: posts.serialize(),
    })
  }
}
