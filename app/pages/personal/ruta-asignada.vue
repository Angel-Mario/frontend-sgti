<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Ruta Asignada',
  pageDescription: 'Ruta Asignada',
  pageKeywords: 'Ruta Asignada',
  middleware: ['route'],
})

useHead({
  title: 'Ruta asignada',
})

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/home',
  },
  {
    slot: 'dropdown' as const,
    icon: 'i-lucide-ellipsis',
    children: [
      {
        label: 'Reportar Avería',
        to: '/vehicular/reportar-averia',
      },
      {
        label: 'Ruta Asignada',
        to: '/personal/ruta-asignada',
      },
      {
        label: 'Solicitar Pieza',
        to: '/vehicular/solicitar-pieza',
      },
      {
        label: 'Solicitar Apoyo',
        to: '/vehicular/solicitar-apoyo',
      },
    ],
  },
  {
    label: 'Ruta Asignada',
    to: '/personal/ruta-asignada',
  },
]

const { chofer } = useAuthStore()
if (!chofer)
  useAuthStore().fetchChofer()
</script>

<template>
  <div v-if="chofer" class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <PersonalRutaAsignada />
    </RouteBreadCrumb>
  </div>
  <div v-else>
    <RouteBreadCrumb :items="items">
      <h1 class="text-2xl font-bold">
        [No tienes ruta asignada]
      </h1>
    </RouteBreadCrumb>
  </div>
</template>
