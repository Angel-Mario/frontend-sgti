<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Reportar Avería',
  pageDescription: 'Reportar Avería',
  pageKeywords: 'Reportar Avería',
  middleware: ['auth'],
})

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/home',
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
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Averías
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        <VehicularReportarAveriaTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
