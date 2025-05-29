<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Rutas',
  pageDescription: 'Lista de Rutas',
  pageKeywords: 'rutas, lista, ruta, admin',
  name: 'rutas',
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
    label: 'Geográfico',
    children: [
      {
        label: 'Puntos Referentes',
        to: '/geografico/puntos-referentes',
      },
      {
        label: 'Rutas',
        to: '/geografico/rutas',
      },
      {
        label: 'Puntos de Combustible',
        to: '/geografico/puntos-combustible',
      },
      {
        label: 'Terminales',
        to: '/geografico/terminales',
      },
    ],
  },
  {
    label: 'Rutas',
    to: '/geografico/rutas',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Rutas
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        <GeograficoRutasTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
