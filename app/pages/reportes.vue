<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Reportes',
  pageDescription: 'Lista de reportes',
  pageIcon: 'i-lucide-users',
  pageKeywords: 'reportes, lista, admin',
  name: 'reportes',
  middleware: ['admin'],
})

useHead({
  title: 'Lista de Reportes',
})

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/home',
  },
  {
    label: 'Reportes',
    to: '/reportes',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Reportes
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 overflow-hidden row-span-9 rounded-2xl">
        <ReportesTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
<!-- const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'asunto', label: 'Asunto' },
  { id: 'texto', label: 'Texto' },
  { id: 'fecha', label: 'Fecha' },
] -->
