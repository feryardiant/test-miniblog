import PostModel from '#models/post'

import UserModel from '#models/user'

interface Collection<T> {
  data: Array<T>
}

export type Post = PostModel

export type PostCollection = Collection<PostModel>

export type User = UserModel & { postsCount?: number }

export type UserCollection = Collection<UserModel>
