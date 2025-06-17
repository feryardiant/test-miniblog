<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { User } from '~/types'
import PostMeta from './post-meta.vue'

defineProps<{
  title: string
  slug?: string
  author?: User
  date: string
}>()

const { props } = usePage<{ auth: User }>()

function ownedBy(author?: User) {
  return props.auth.id === author?.id
}
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

    <div class="flex justify-between items-baseline">
      <PostMeta :author="author!" :date="date" />

      <p v-if="ownedBy(author)" class="flex gap-2">
        <Link :href="`/posts/${slug}/edit`" class="text-gray-800 hover:text-gray-700 underline">Edit</Link>

        <Link :href="`/posts/${slug}`" method="delete" class="text-gray-800 hover:text-gray-700 underline">Delete</Link>
      </p>
    </div>
  </header>
</template>
