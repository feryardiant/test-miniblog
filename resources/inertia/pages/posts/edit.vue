<script setup lang="ts">
import PostsController from '#controllers/posts_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/vue3'
import FormField from '~/components/form-field.vue'
import PublicLayout from '~/layouts/public.vue'
import { User } from '~/types'

const props = defineProps<{
  auth: User
  post: InferPageProps<PostsController, 'edit'>['post']
}>()

const form = useForm({
  title: props.post.title,
  content: props.post.content,
})

const submit = () => {
  form.put(`/posts/${props.post.slug}`)
}
</script>

<template>
  <Head :title="`Create Post by ${auth.fullName} - Mini Blog`" />

  <PublicLayout :auth="auth">
    <div class="flex flex-col gap-6 w-3xl mx-auto">
      <form class="space-y-6" @submit.prevent="submit">
        <FormField for="title" label="Title" :error="form.errors.title">
          <input
            id="title"
            v-model="form.title"
            name="title"
            type="text"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            :class="{ 'border-red-500': form.errors.title }"
          />
        </FormField>

        <FormField for="content" label="Content" :error="form.errors.content">
          <textarea name="content" id="content" v-model="form.content" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" :class="{ 'border-red-500': form.errors.content }"></textarea>
        </FormField>

        <div>
          <button
            type="submit"
            :disabled="form.processing"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="form.processing">Loading...</span>
            <span v-else>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </PublicLayout>
</template>
