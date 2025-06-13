<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import NotFound from '~/components/not-found.vue'
import PostHeader from '~/components/post-header.vue'
import PublicLayout from '~/layouts/public.vue'
import { Post, User } from '~/types'

defineProps<{
  auth?: User
  author: User
  posts: Post[]
}>()
</script>

<template>
  <Head :title="`All posts by ${author.fullName} - Mini Blog`" />

  <PublicLayout :auth="auth">
    <div class="flex flex-col gap-10 w-3xl mx-auto">
      <template v-if="posts.length > 0">
        <div v-for="post of posts" :key="post.id">
          <PostHeader
            :title="post.title"
            :slug="post.slug"
            :author="author"
            :date="String(post.publishedAt)"
          />
        </div>
      </template>

      <template v-else>
        <NotFound resource="posts" />
      </template>
    </div>
  </PublicLayout>
</template>
