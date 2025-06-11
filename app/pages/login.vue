<script lang="ts" setup>
definePageMeta({
  layout: 'login',
  pageTitle: 'Login',
  pageDescription: 'Login to your account',
  pageIcon: 'i-lucide-log-in',
  pageKeywords: 'login, sign in',
})

useHead({
  title: 'Iniciar Sesión',
})
</script>

<template>
  <div class="flex justify-center w-screen h-screen dark bg-navbardark-700">
    <LoginPanel />
  </div>
</template>
