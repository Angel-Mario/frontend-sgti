<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Solicitar Refuerzo',
  pageDescription: 'Solicitar Refuerzo',
  pageKeywords: 'solicitar refuerzo, solicitar, refuerzo, admin',
  name: 'solicitar-refuerzo',
  middleware: ['auth'],
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
        label: 'Asignar Combustible',
        to: '/gestion/asignar-combustible',
      },
      {
        label: 'Puntos de Combustible',
        to: '/geografico/puntos-combustible',
      },
      {
        label: 'Solicitar Refuerzo',
        to: '/gestion/solicitar-refuerzo',
      },
    ],
  },
  {
    label: 'Solicitar Refuerzo',
    to: '/gestion/solicitar-refuerzo',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <main class="w-full px-3 pb-2 overflow-hidden row-span-11 rounded-2xl">
        <GestionRefuerzoTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
