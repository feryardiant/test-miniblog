<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import PostMeta from '~/components/post-meta.vue'
import PublicLayout from '~/layouts/public.vue'
import { User, PostCollection } from '~/types'

defineProps<{
  auth?: User
  posts: PostCollection
}>()
</script>

<template>
  <Head title="Mini Blog - Share Your Thoughts" />

  <!-- Hero Section -->
  <PublicLayout :auth="auth">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Share Your
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Thoughts
        </span>
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A simple platform to write, share, and discover amazing stories from people around the
        world. Join our community of writers and readers today.
      </p>

      <div class="space-x-4">
        <!-- Empty -->
      </div>
    </div>

    <section>
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Recent Posts</h2>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div v-for="post of posts.data" :key="post.id">
          <h3 class="text-3xl font-semibold leading-10">
            <Link :href="`/posts/${post.slug}`">{{ post.title }}</Link>
          </h3>

          <PostMeta :author="post.author as User" :date="String(post.publishedAt)" />
        </div>
      </div>
    </section>
  </PublicLayout>
</template>
