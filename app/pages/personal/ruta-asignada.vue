<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Ruta Asignada',
  pageDescription: 'Ruta Asignada',
  pageKeywords: 'Ruta Asignada',
  middleware: ['auth'],
})

useHead({
  title: 'Ruta asignada',
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
    ],
  },
  {
    label: 'Ruta Asignada',
    to: '/personal/ruta-asignada',
  },
]

const { chofer } = useAuthStore()
if (!chofer)
  useAuthStore().fetchChofer()
</script>

<template>
  <div v-if="chofer" class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Ruta Asignada: {{ chofer.ruta.nombre }}
        </h1>
        <h2 class="mb-2 text-xl font-bold text-gray-300">
          [Punto de salida: {{ chofer.ruta.puntoSalida.nombre }}] [Punto de regreso: {{ chofer.ruta.puntoRegreso.nombre }}]
        </h2>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 py-5 m-auto overflow-hidden row-span-10 rounded-2xl">
        <GeograficoLeaflet :locations="[{ name: chofer.ruta.puntoSalida.nombre, lat: Number(chofer.ruta.puntoSalida.latLong.split(',')[0]), lng: Number(chofer.ruta.puntoSalida.latLong.split(',')[1]) }, { name: chofer.ruta.puntoRegreso.nombre, lat: Number(chofer.ruta.puntoRegreso.latLong.split(',')[0]), lng: Number(chofer.ruta.puntoRegreso.latLong.split(',')[1]) }]" :center="[Number(chofer.ruta.puntoSalida.latLong.split(',')[0]), Number(chofer.ruta.puntoSalida.latLong.split(',')[1])]" />
      </main>
    </RouteBreadCrumb>
  </div>
  <div v-else>
    <h1 class="text-2xl font-bold">
      [No tienes ruta asignada]
    </h1>
    <!-- :title="`Ruta Asignada ${chofer.ruta.nombre}`" :open="true"  -->
  </div>
</template>
