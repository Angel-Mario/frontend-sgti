<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Solicitar Pieza',
  pageDescription: 'Solicitar Pieza',
  pageKeywords: 'Solicitar Pieza',
  name: 'solicitar-pieza',
  middleware: ['chofer', 'car'],
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
    label: 'Solicitar Pieza',
    to: '/vehicular/solicitar-pieza',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <main class="w-full px-3 pb-2 overflow-hidden row-span-11 rounded-2xl">
        <VehicularSolicitarPiezaTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
