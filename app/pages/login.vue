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
  <div class="flex justify-center w-screen h-screen light:bg-gradient-to-br light:from-slate-100 light:via-white light:to-blue-100 dark:bg-navbardark-700">
    <LoginPanel />
  </div>
</template>
