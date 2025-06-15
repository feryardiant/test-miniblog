<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { User } from '~/types'
import PostMeta from './post-meta.vue'

defineProps<{
  title: string
  slug?: string
  author?: User
  date: string
}>()
</script>

<template>
  <header>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
      <template v-if="slug">
        <Link :href="`/posts/${slug}`" class="text-gray-800 hover:text-gray-700 underline">{{
          title
        }}</Link>
      </template>

      <template v-else>
        {{ title }}
      </template>
    </h2>

    <PostMeta :author="author!" :date="date" />
  </header>
</template>
