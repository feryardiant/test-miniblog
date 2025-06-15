import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'

test.group('Posts: Index', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should render all posts pages', async ({ browserContext, visit, route }) => {
    const user = await UserFactory.create()
    await browserContext.loginAs(user)

    const page = await visit(route('posts.index'))

    await page.assertElementsText('h3', ['Recent Posts'])
  })
})
