<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Personal',
      icon: 'i-lucide-book-open',
      defaultOpen: true,
      children: [
        {
          label: 'Usuarios',
          description: 'Lista de usuarios',
          icon: 'i-lucide-user',
          to: '/personal/usuarios'
        },
        {
          label: 'Adminstradores',
          description: 'Lista de admins',
          icon: 'i-lucide-user-cog',
          to: '/personal/admin-adminstrador'
        },
        {
          label: 'Choferes',
          icon: 'i-lucide-users',
          description: 'Lista de choferes',
          to: '/personal/choferes'
        },
        {
          label: 'Suministradores',
          icon: 'i-lucide-user-pen',
          description: 'Lista de suministradores',
          to: '/personal/admin-suministrador'
        },
      ]
    },
    {
      label: 'Vehícular',
      icon: 'i-lucide-bus-front',
      children: [
        {
          label: 'Averías',
          icon: 'i-lucide-badge-x',
          description: 'Display a modal/slideover within your application.',
          to: '/composables/use-overlay'
        },
        {
          label: 'Combustibles asignados',
          icon: 'i-lucide-chart-candlestick',
          description: 'Display a toast within your application.',
          to: '/composables/use-toast'
        },
        {
          label: 'Omnibus',
          icon: 'i-lucide-bus',
          description: 'Define shortcuts for your application.',
        },
        {
          label: 'Puntos combustible',
          icon: 'i-lucide-fuel',
          description: 'Define shortcuts for your application.',
        },
        {
          label: 'Solicitud de Piezas',
          icon: 'i-lucide-cog',
          description: 'Define shortcuts for your application.',
        },
      ]
    },
    {
      label: 'Ruta',
      icon: 'i-lucide-map',
      to: '/components',
      children: [


        {
          label: 'Puntos referencia',
          icon: 'i-lucide-signpost',
          description: 'Display a list of links.',
          to: '/components/navigation-menu'
        },
        {
          label: 'Rutas',
          icon: 'i-lucide-route',
          description: 'Display a modal within your application.',
          to: '/components/modal'
        },
        {
          label: 'Terminales',
          icon: 'i-lucide-caravan',
          description: 'Use NuxtLink with superpowers.',
          to: '/components/link'
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/components/pagination'
        },
      ]
    }
  ],
])
</script>

<template>
  <UNavigationMenu highlight highlight-color="primary" orientation="vertical" :items="items"
    class="data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48" />
</template>