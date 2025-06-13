<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import NotFound from '~/components/not-found.vue'
import PublicLayout from '~/layouts/public.vue'
import { User } from '~/types'

defineProps<{
  auth: User
  users: User[]
}>()
</script>

<template>
  <Head title="Mini Blog - All Users" />

  <PublicLayout :auth="auth">
    <div v-if="users.length > 0" class="grid grid-cols-3 gap-6 w-4xl mx-auto">
      <div v-for="user of users" :key="user.id" class="flex gap-3 items-center">
        <div class="size-16 bg-gray-400 border-2 border-gray-500 rounded-full"></div>

        <div>
          <Link :href="`/users/${user.handle}`" class="font-bold text-gray-700">{{
            user.fullName
          }}</Link>

          <p class="text-gray-500">
            <span v-if="user.postsCount">{{ user.postsCount }} posts published</span>
            <span v-else>Doesn't have posts</span>
          </p>
        </div>
      </div>
    </div>

    <NotFound v-else resource="users" />
  </PublicLayout>
</template>
