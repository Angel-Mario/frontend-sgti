<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

// Table Ref
const childRef = useTemplateRef('child')

// Filter Options for search parameters
const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'estado', label: 'Estado' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'terminal', label: 'Terminal' },
]
const fetchRoute = 'gestion/solicitud-refuerzo'
const defaultSortingValue = 'Fecha'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

// Overlay Hooks
const overlay = useOverlay()
const toast = useToast()

const authStore = useAuthStore()

function getAcceptReject(estado: string, id: string) {
  const aceptar = {
    label: 'Aceptar',
    icon: 'i-lucide-circle-check',
    async onSelect() {
      $fetch(`${fetchRoute}/${id}`, {
        ...makePostPatchOptions(
          `Se ha aceptado correctamente la solicitud de refuerzo`,
          { estado: 'aceptada' },
          () => {
            childRef?.value?.refreshMet()
          },
          toast,
          `Bearer ${authStore.getToken}`,
        ),
        method: 'POST',
      })
    },
  }
  const rechazar = {
    label: 'Rechazar',
    icon: 'i-lucide-circle-x',
    async onSelect() {
      $fetch(`${fetchRoute}/${id}`, {
        ...makePostPatchOptions(
          `Se ha rechazado correctamente la solicitud de refuerzo`,
          { estado: 'rechazada' },
          () => {
            childRef?.value?.refreshMet()
          },
          toast,
          `Bearer ${authStore.getToken}`,
        ),
        method: 'POST',
      })
    },
  }
  if (estado === 'pendiente') {
    return [aceptar, {
      type: 'separator',
    }, rechazar]
  }
  else {
    return []
  }
}

// Row Dropdown definition
function getRowItems(row: Row<SolicitudRefuerzo>) {
  return [
    ...getAcceptReject(row.original.estado, row.original.id),
  ]
}

// Const Columns  Table
const columns: TableColumn<SolicitudRefuerzo>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'terminal',
    header: ({ column }) => makeColumnHeader(column, 'Terminal', UButton),
    id: 'Terminal',
    cell: ({ row }) => {
      const terminal = row.getValue('Terminal') as SolicitudRefuerzoTerminal

      return h('p', undefined, terminal.nombre)
    },
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => makeColumnHeader(column, 'Fecha', UButton),
    id: 'Fecha',
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => makeColumnHeader(column, 'Estado', UButton),
    cell: ({ row }) => {
      const color = {
        aceptada: 'success' as const,
        rechazada: 'error' as const,
        pendiente: 'primary' as const,
      }[row.getValue('Estado') as string]
      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('Estado'))
    },
    id: 'Estado',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },

  {
    accessorKey: 'capacidadTotal',
    header: 'Capacidad Total',
    id: 'Capacidad Total',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },

  {
    accessorKey: 'vehiculos',
    header: 'Vehículos',
    id: 'Vehículos',
    cell: ({ row }) => {
      const vehiculos = row.getValue('Vehículos') as SolicitudRefuerzoVehiculo[]

      return h(
        'div',
        { class: 'flex items-center gap-3 sm:max-w-48 md:max-w-96' },
        vehiculos.map((vehiculo, index) =>
          h('p', `${vehiculo.matricula}${index === vehiculos.length - 1 ? '' : ','}`),
        ),
      )
    },
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      return row.getValue('Estado') === 'pendiente'
        ? h(
            'div',
            { class: 'text-right' },
            h(
              UDropdownMenu,
              {
                'content': {
                  align: 'end',
                },
                'items': getRowItems(row),
                'aria-label': 'Actions dropdown',
              },
              () =>
                h(UButton, {
                  'icon': 'i-lucide-ellipsis-vertical',
                  'color': 'neutral',
                  'variant': 'ghost',
                  'class': 'ml-auto',
                  'aria-label': 'Actions dropdown',
                }),
            ),
          )
        : ''
    },
  },
]
</script>

<template>
  <TableMain
    ref="child"
    :columns="columns"
    :default-sorting-value="defaultSortingValue"
    :fetch-route="fetchRoute"
    :filter-options="filterOptions"
    :insert="false"
    :delete="false"
    :desc="true"
    :footer="false"
  />
</template>
