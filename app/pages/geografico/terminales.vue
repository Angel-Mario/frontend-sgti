<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Terminales',
  pageDescription: 'Lista de Terminales',
  pageKeywords: 'terminales, lista, terminal',
  name: 'terminales',
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
    label: 'Terminales',
    to: '/geografico/terminales',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Terminales
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        <GeograficoTerminalesTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
