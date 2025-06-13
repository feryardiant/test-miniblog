import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { PostFactory } from './post_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const fullName = faker.person.fullName()

    return {
      fullName,
      handle: fullName.toLowerCase().replace(/\s+/g, '-'),
      email: faker.internet.email(),
      password: 'password',
    }
  })
  .relation('posts', () => PostFactory)
  .build()
