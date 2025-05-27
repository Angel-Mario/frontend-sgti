<script lang="ts" setup>
definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Home',
  pageDescription: 'Pagina de inicio',
  pageIcon: 'i-lucide-house',
  middleware: ['auth'],
})
useHead({
  title: 'Home',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
</script>

<template>
  <div class="flex justify-center w-full h-screen">
    <Home />
  </div>
</template>
