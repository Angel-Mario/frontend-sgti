<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Asignar Combustible',
  pageDescription: 'Asignar Combustible',
  pageKeywords: 'asignar combustible, asignar, combustible, admin',
  name: 'asignar-combustible',
  middleware: ['sumin'],
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
    label: 'Asignar Combustible',
    to: '/gestion/asignar-combustible',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Gestión de Combustible Asignado
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        <GestionCombustibleTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
