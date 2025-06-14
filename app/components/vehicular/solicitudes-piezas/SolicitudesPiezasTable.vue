<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

// Table Ref
const childRef = useTemplateRef('child')

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'estado', label: 'Estado' },
  { id: 'tipo', label: 'Tipo de pieza' },
  { id: 'vehiculo', label: 'Vehículo' },
]
const fetchRoute = 'vehicular/solicitudes-piezas'
const defaultSortingValue = 'Tipo de pieza'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const toast = useToast()
const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')

const authStore = useAuthStore()
const router = useRouter()

function getAcceptReject(estado: string, id: string) {
  const aceptar = {
    label: 'Aceptar',
    icon: 'i-lucide-circle-check',
    async onSelect() {
      $fetch(`${fetchRoute}/${id}`, {
        ...makePostPatchOptions(
          `Se ha aceptado correctamente la solicitud de piezas`,
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
          `Se ha rechazado correctamente la solicitud de piezas`,
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
function getRowItems(row: Row<SolicitudPieza>) {
  return [
    ...getAcceptReject(row.original.estado, row.original.id),
  ]
}

// Const Columns  Table
const columns: TableColumn<SolicitudPieza>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'tipo',
    header: ({ column }) => makeColumnHeader(column, 'Tipo de pieza', UButton),
    id: 'Tipo de pieza',
  },
  {
    accessorKey: 'cantidad',
    header: ({ column }) => makeColumnHeader(column, 'Cantidad', UButton),
    id: 'Cantidad',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
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
    accessorKey: 'chofer',
    header: ({ column }) => makeColumnHeader(column, 'Vehículo', UButton),
    cell: ({ row }) => {
      const chofer = row.getValue('Vehículo') as SolicitudPiezaChofer
      return chofer
        ? h('div', { class: 'flex flex-row justify-center' }, [
            h('div', undefined, [
              h(
                'p',
                undefined,
                chofer.vehiculo.matricula,
              ),
              h(
                'p',
                undefined,
                `Capacidad: ${chofer.vehiculo.capacidad}`,
              ),
            ]),
            h(
              UButton,
              {
                color: 'primary',
                variant: 'solid',
                size: 'md',
                class: 'text-xs cursor-pointer h-fit my-auto ms-2 me-2',
                onClick: () => {
                  router.push(
                    `/vehicular/vehiculos?column=id&search=${chofer.vehiculo.id}`,
                  )
                },
              },
              () => h(UIcon, { name: 'i-lucide-square-arrow-out-up-right' }),
            ),
          ])
        : '[Sin vehículo]'
    },
    id: 'Vehículo',
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
    :remove="false"
    :footer="false"
  />
</template>
