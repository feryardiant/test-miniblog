<script setup lang="ts">
import { User } from '~/types'
import { Link } from '@inertiajs/vue3'

defineProps<{
  auth?: User
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <Link href="/" class="text-2xl font-bold text-indigo-600"> Mini Blog </Link>
            </div>
            <div class="flex items-center space-x-4 text-sm font-medium">
              <template v-if="auth">
                <Link href="/posts/create" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Create Post</Link>
                <Link
                  href="/profile"
                  as="button"
                  class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md"
                >
                  {{ auth.fullName }}
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md"
                >
                  Logout
                </Link>
              </template>
              <template v-else>
                <Link
                  href="/login"
                  class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </template>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-500">
          <p>&copy; 2024 Mini Blog. Made with ❤️ using AdonisJS, Inertia.js & Vue.js</p>
        </div>
      </div>
    </footer>
  </div>
</template>
