<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      description: 'Home',
      to: '/home',
    },
    {
      label: 'Reportar Avería',
      icon: 'i-lucide-badge-x',
      // to: "/reporte-averia",
    },
    {
      label: 'Ruta Asignada',
      icon: 'i-lucide-route',
      // to: "/ruta-asignada",
    },
    {
      label: 'Solicar Piezas',
      icon: 'i-lucide-cog',
      // to: "/solicitud-pieza",
    },
  ],
])
</script>

<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    orientation="vertical"
    :items="items"
    class="data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
  />
</template>
