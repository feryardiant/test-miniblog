<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import NotFound from '~/components/not-found.vue'
import PublicLayout from '~/layouts/public.vue'
import { Post, User } from '~/types'

defineProps<{
  auth?: User
  author: User
  posts: Post[]
}>()
</script>

<template>
  <Head title="Mini Blog - All Posts" />

  <PublicLayout :auth="auth">
    <h3 class="text-4xl leading-10">Recent Posts</h3>

    <div class="flex flex-col gap-10 w-3xl mx-auto">
      <template v-if="posts.length > 0">
        <div v-for="post of posts" :key="post.id">
          <PostHeader
            :title="post.title"
            :slug="post.slug"
            :author="auth"
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
