<script setup lang="ts">
import PostsController from '#controllers/posts_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'
import NotFound from '~/components/not-found.vue'
import PostHeader from '~/components/post-header.vue'
import PublicLayout from '~/layouts/public.vue'
import { User } from '~/types'

defineProps<{
  auth?: User
  author: User
  posts: InferPageProps<PostsController, 'index'>['posts']
}>()
</script>

<template>
  <Head title="Mini Blog - All Posts" />

  <PublicLayout :auth="auth">
    <h3 class="text-center text-4xl leading-10 mb-8">Recent Posts</h3>

    <div class="flex flex-col gap-10 w-3xl mx-auto">
      <template v-if="posts.data.length > 0">
        <div v-for="post of posts.data" :key="post.id">
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
