import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when logging
 * in a user.
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

/**
 * Validator to validate the payload when creating
 * a new user account.
 */
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    handle: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value) => {
        const user = await db.from('users').where('handle', value).first()
        return !user
      }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)
