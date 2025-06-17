import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator, updatePostValidator } from '#validators/post'

export default class PostsController {
  /**
   * Show list of posts
   */
  async index({ inertia }: HttpContext) {
    const posts = await Post.query().preload('author').orderBy('created_at', 'desc').paginate(1, 10)

    return inertia.render('posts/index', {
      posts: posts.serialize(),
    })
  }

  /**
   * Show form to create a new post
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('posts/create')
  }

  /**
   * Handle creation of a new post
   */
  async store({ request, auth, response, session }: HttpContext) {
    const data = await request.validateUsing(createPostValidator)

    await Post.create({
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      userId: auth.user!.id,
    })

    session.flash('success', 'Post created successfully!')

    return response.redirect().toRoute('posts.index')
  }

  /**
   * Show a single post
   */
  async show({ params, inertia }: HttpContext) {
    const post = await Post.query().where('slug', params.slug).preload('author').firstOrFail()

    return inertia.render('posts/show', { post })
  }

  /**
   * Show form to edit a post
   */
  async edit({ params, inertia, auth, response }: HttpContext) {
    const post = await Post.query().where('slug', params.slug).preload('author').firstOrFail()

    // Only allow post owner to edit
    if (post.userId !== auth.user!.id) {
      return response.abort('You can only edit your own posts', 403)
    }

    return inertia.render('posts/edit', { post })
  }

  /**
   * Handle updating a post
   */
  async update({ params, request, auth, response, session }: HttpContext) {
    const post = await Post.query().where('slug', params.slug).preload('author').firstOrFail()

    // Only allow post owner to update
    if (post.userId !== auth.user!.id) {
      return response.abort('You can only edit your own posts', 403)
    }

    const data = await request.validateUsing(updatePostValidator)

    post.merge(data)

    const updated = await post.save()

    session.flash('success', 'Post updated successfully!')

    return response.redirect().toRoute('posts.show', { slug: updated.slug })
  }

  /**
   * Handle deletion of a post
   */
  async destroy({ params, auth, response, session }: HttpContext) {
    const post = await Post.query().where('slug', params.slug).preload('author').firstOrFail()

    // Only allow post owner to delete
    if (post.userId !== auth.user!.id) {
      return response.abort('You can only delete your own posts', 403)
    }

    await post.delete()

    session.flash('success', 'Post deleted successfully!')

    return response.redirect().toRoute('posts.index')
  }
}
