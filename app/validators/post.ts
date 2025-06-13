import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new post.
 */
export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    content: vine.string().trim().minLength(1),
  })
)

/**
 * Validator to validate the payload when updating
 * a post.
 */
export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    content: vine.string().trim().minLength(1),
  })
)
