<script setup lang="ts">
defineProps<{
  for: string
  label: string
  error?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="email" class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div>
      <slot />

      <div v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</div>
    </div>
  </div>
</template>
