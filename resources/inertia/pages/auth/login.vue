<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
})

const submit = () => {
  form.post('/login')
}
</script>

<template>
  <Head title="Sign In" />

  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="text-center">
          <Link href="/" class="text-3xl font-bold text-indigo-600"> Mini Blog </Link>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            <Link href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
      </div>

      <div class="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': form.errors.email }"
              />
              <div v-if="form.errors.email" class="mt-1 text-sm text-red-600">
                {{ form.errors.email }}
              </div>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': form.errors.password }"
              />
              <div v-if="form.errors.password" class="mt-1 text-sm text-red-600">
                {{ form.errors.password }}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="form.processing"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="form.processing">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
