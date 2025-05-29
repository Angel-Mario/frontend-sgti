<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/home',
  },
  {
    label: 'Puntos de Combustible',
    to: '/geografico/puntos-combustible',
  },
]
</script>

<template>
  <RouteBreadCrumb :items="items">
    <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
      <h1 class="text-2xl font-bold">
        Puntos de Combustible
      </h1>
      <USeparator color="primary" type="solid" />
    </section>
    <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
      <GeograficoPuntosCombustibleTable />
    </main>
  </RouteBreadCrumb>
</template>
