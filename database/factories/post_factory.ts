import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import { UserFactory } from './user_factory.js'
import { DateTime } from 'luxon'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    const title = faker.word.words(5)

    return {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      content: faker.lorem.paragraphs(3),
      publishedAt: DateTime.fromJSDate(
        faker.date.between({
          from: DateTime.now().minus({ days: 30 }).toJSDate(),
          to: DateTime.now().toJSDate(),
        })
      ),
    }
  })
  .state('unpublished', (post) => (post.publishedAt = undefined))
  .relation('author', () => UserFactory)
  .build()
