import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Authentication: Login', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should render login page', async ({ client }) => {
    const response = await client.get('/login').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')
  })
})
