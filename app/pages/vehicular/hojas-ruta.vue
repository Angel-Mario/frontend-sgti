<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Hojas de Ruta',
  pageDescription: 'Hojas de Rut',
  pageKeywords: 'Hojas de Rut',
  name: 'hojas-de-ruta',
  middleware: ['admin'],
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
    label: 'Hojas de Ruta',
    to: '/vehicular/reportar-averia',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Editor de Plantilla de Hoja de ruta
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-auto row-span-10 rounded-2xl">
        <RutaViewer />
      </main>
    </RouteBreadCrumb>
  </div>
</template>

<style></style>
