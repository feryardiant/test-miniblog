<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import PostHeader from '~/components/post-header.vue'
import PublicLayout from '~/layouts/public.vue'
import { Post, User } from '~/types'

defineProps<{
  auth?: User
  post: Post
}>()

function render(content: string): string {
  const paragraphs = content.split('\n')

  return paragraphs.map((p) => `<p class="block mb-4">${p}</p>`).join('')
}
</script>

<template>
  <Head :title="`${post.title} by ${post.author.fullName} - Mini Blog`" />

  <PublicLayout :auth="auth">
    <div class="flex flex-col gap-6 w-3xl mx-auto">
      <PostHeader :title="post.title" :author="post.author as User" :date="String(post.publishedAt)" />

      <main v-html="render(post.content)" />
    </div>
  </PublicLayout>
</template>
