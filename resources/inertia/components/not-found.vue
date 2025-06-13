<script setup lang="ts">
defineProps<{
  resource: string
}>()
</script>

<template>
  <div class="text-center">
    <p>No {{ resource }} found.</p>
  </div>
</template>
