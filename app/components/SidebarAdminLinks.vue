<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Personal',
      icon: 'i-lucide-book-open',
      defaultOpen: true,
      children: [
        //GET UPDATE DELETE POST
        {
          label: 'Usuarios',
          description: 'Lista de usuarios',
          icon: 'i-lucide-user',
          to: '/personal/usuarios'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Adminstradores',
          description: 'Lista de admins',
          icon: 'i-lucide-user-cog',
          to: '/personal/administradores'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Choferes',
          icon: 'i-lucide-users',
          description: 'Lista de choferes',
          to: '/personal/choferes'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Suministradores',
          icon: 'i-lucide-user-pen',
          description: 'Lista de suministradores',
          to: '/personal/suministradores'
        },
      ]
    },
    //GET POST
    {
      label: 'Reportes',
      icon: 'i-lucide-scroll-text',
      to: '/reportes',
    },
    {
      label: 'Ruta',
      icon: 'i-lucide-map',
      to: '/components',
      children: [
        //GET UPDATE DELETE POST
        {
          label: 'Puntos referencia',
          icon: 'i-lucide-signpost',
          description: 'Display a list of links.',
          to: '/components/navigation-menu'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Rutas',
          icon: 'i-lucide-route',
          description: 'Display a modal within your application.',
          to: '/components/modal'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Terminales',
          icon: 'i-lucide-caravan',
          description: 'Use NuxtLink with superpowers.',
          to: '/components/link'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Hojas de ruta',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/components/pagination'
        },
      ]
    },
    {
      label: 'Servicios',
      icon: 'i-lucide-file-volume-2',
      to: '/components',
      children: [
        //GET UPDATE DELETE POST
        {
          label: 'Horario',
          icon: 'i-lucide-calendar-cog',
          description: 'Display a list of links.',
          to: '/components/navigation-menu'
        },
        //GET UPDATE DELETE POST
        {
          label: 'Refuerzos',
          icon: 'i-lucide-route',
          description: 'Display a modal within your application.',
          to: '/components/modal'
        },
      ]
    },
    {
      label: 'Vehícular',
      icon: 'i-lucide-bus-front',
      children: [
        {
          //GET UPDATE DELETE POST
          label: 'Combustibles asignados',
          icon: 'i-lucide-chart-candlestick',
          description: 'Display a toast within your application.',
          to: '/composables/use-toast'
        },
        {
          //GET UPDATE DELETE POST
          label: 'Omnibus',
          icon: 'i-lucide-bus',
          description: 'Define shortcuts for your application.',
        },
        //GET
        {
          label: 'Puntos combustible',
          icon: 'i-lucide-fuel',
          description: 'Define shortcuts for your application.',
        },
      ]
    },
  ],
])
</script>

<template>
  <UNavigationMenu highlight highlight-color="primary" orientation="vertical" :items="items"
    class="data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48" />
</template>