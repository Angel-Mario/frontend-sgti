<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Solicitudes de Piezas',
  pageDescription: 'Listado de solicitudes de piezas',
  pageKeywords: 'vehiculo, admin',
  name: 'solicitudes-piezas',
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
    label: 'Solicitudes de Piezas',
    to: '/vehicular/solicitudes-piezas',
  },
]
</script>
