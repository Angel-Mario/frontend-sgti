<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'
import { VehicularCombustibleAsignadoTable } from '#components'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Combustibles asignados',
  pageDescription: 'Listado de combustibles asignados',
  pageKeywords: 'chofer, admin',
  name: 'combustibles_asignados',
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
    label: 'Vehicular',
    children: [
      {
        label: 'Averías',
        to: '/vehicular/averias',
      },
      {
        label: 'Combustibles asignados',
        to: '/vehicular/combustibles-asignados',
      },
      {
        label: 'Hojas de ruta',
        to: '/vehicular/hojas-ruta',
      },

      {
        label: 'Vehículos',
        to: '/vehicular/vehiculos',
      },
      {
        label: 'Solicitudes de Piezas',
        to: '/vehicular/solicitudes-piezas',
      },
    ],
  },
  {
    label: 'Combustibles asignados',
    to: '/vehicular/combustibles-asignados',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Asignación de combustibles
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
        <VehicularCombustibleAsignadoTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
