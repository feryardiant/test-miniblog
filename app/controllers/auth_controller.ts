import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  /**
   * Show login form
   */
  async showLoginForm({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * Handle login
   */
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    session.flash('success', 'Welcome back!')
    return response.redirect().toRoute('posts.index')
  }

  /**
   * Show register form
   */
  async showRegisterForm({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  /**
   * Handle registration
   */
  async register({ request, auth, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create(data)
    await auth.use('web').login(user)

    session.flash('success', 'Account created successfully!')
    return response.redirect().toRoute('posts.index')
  }

  /**
   * Handle logout
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'You have been logged out!')
    return response.redirect().toRoute('home')
  }
}
