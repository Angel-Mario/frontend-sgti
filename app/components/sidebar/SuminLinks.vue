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
      label: 'Asginar combustible',
      icon: 'i-lucide-chart-candlestick',
    },
    // GET POST DELETE UPDATE
    {
      label: 'Puntos combustible',
      icon: 'i-lucide-fuel',
      description: 'Lista de puntos de combustible',
    },
    // POST
    {
      label: 'Solicitar Refuerzo',
      icon: 'i-lucide-mail-question',
      description: 'formulario de solicitud de refuerzo',
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
