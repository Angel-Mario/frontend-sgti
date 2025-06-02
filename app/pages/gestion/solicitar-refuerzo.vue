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
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Solicitar Refuerzo
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        Solicitar Refuerzo
      </main>
    </RouteBreadCrumb>
  </div>
</template>
