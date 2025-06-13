/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')

// Home page
router.get('/', [HomeController, 'index']).as('home')

// Authentication routes
router
  .group(() => {
    router.get('/login', [AuthController, 'showLoginForm']).as('auth.login')
    router.post('/login', [AuthController, 'login'])
    router.get('/register', [AuthController, 'showRegisterForm']).as('auth.register')
    router.post('/register', [AuthController, 'register'])
  })
  .middleware(middleware.guest())

router.post('/logout', [AuthController, 'logout']).as('auth.logout').middleware(middleware.auth())

// Protected routes
router
  .group(() => {
    // Posts routes
    router.get('/posts', [PostsController, 'index']).as('posts.index')
    router.get('/posts/create', [PostsController, 'create']).as('posts.create')
    router.post('/posts', [PostsController, 'store']).as('posts.store')
    router.get('/posts/:slug', [PostsController, 'show']).as('posts.show')
    router.get('/posts/:slug/edit', [PostsController, 'edit']).as('posts.edit')
    router.put('/posts/:slug', [PostsController, 'update']).as('posts.update')
    router.delete('/posts/:slug', [PostsController, 'destroy']).as('posts.destroy')

    // User profile routes
    router.get('/users', [UsersController, 'index']).as('users.index')
    router.get('/users/:handle', [UsersController, 'show']).as('users.show')
    router.get('/profile', [UsersController, 'profile']).as('users.profile')
  })
  .middleware(middleware.auth())
