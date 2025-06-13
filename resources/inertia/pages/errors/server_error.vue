<script setup lang="ts">
import PublicLayout from '~/layouts/public.vue'

defineProps<{ error: any }>()
</script>

<template>
  <PublicLayout>
    <div class="title">Server Error</div>

    <span>{{ error.message }}</span>
  </PublicLayout>
</template>
