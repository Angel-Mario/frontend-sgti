<script lang="ts" setup>
definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Puntos de Combustible',
  pageDescription: 'Lista de Puntos de Combustible',
  pageIcon: 'i-lucide-user',
  pageKeywords: 'puntos de combustible, lista, punto de combustible, admin',
  name: 'puntos-combustible',
  middleware: ['auth'],
})
const { user } = useAuthStore()
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <GeograficoPuntosCombustibleAdmin v-if="user?.roles.includes('admin')" />
    <GeograficoPuntosCombustibleSuministrador v-else-if="user?.roles.includes('suministrador')" />
  </div>
</template>
