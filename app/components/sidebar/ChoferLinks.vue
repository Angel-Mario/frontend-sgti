<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { chofer } = useAuthStore()

const getItems = computed(() => {
  return chofer && chofer.vehiculo
    ? [{
        label: 'Reportar Avería',
        icon: 'i-lucide-badge-x',
        to: '/vehicular/reportar-averia',
      }, {
        label: 'Ruta Asignada',
        icon: 'i-lucide-route',
        to: '/personal/ruta-asignada',
      }, {
        label: 'Solicar Piezas',
        icon: 'i-lucide-cog',
        to: '/vehicular/solicitar-pieza',
      }, {
        label: 'Solicitar Apoyo',
        icon: 'i-lucide-phone-call',
        to: '/vehicular/solicitar-apoyo',
      }]
    : [{}]
})

const items = reactive<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      description: 'Home',
      to: '/home',
    },
    ...getItems.value,
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
