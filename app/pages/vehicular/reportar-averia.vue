<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Reportar Avería',
  pageDescription: 'Reportar Avería',
  pageKeywords: 'Reportar Avería',
  name: 'reportar-averia',
  middleware: ['car'],
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
    label: 'Reportar Avería',
    to: '/vehicular/reportar-averia',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <main class="w-full px-3 pb-2 overflow-hidden row-span-11 rounded-2xl">
        <VehicularReportarAveriaTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
