<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { DateTime } from 'luxon'
import { User } from '~/types'

defineProps<{
  author: User
  date?: string
}>()

function toLocalDate(date: string): string {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)
}
</script>

<template>
  <p class="leading-7">
    <span
      >By
      <Link :href="`/users/${author.handle}`" class="text-blue-700 hover:text-blue-500 underline">{{
        author.fullName
      }}</Link></span
    >
    <time v-if="date" :datetime="date"> at {{ toLocalDate(date) }}</time>
  </p>
</template>
