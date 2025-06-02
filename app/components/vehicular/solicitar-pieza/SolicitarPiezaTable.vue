<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const childRef = useTemplateRef('child')

const authStore = useAuthStore()
const query = shallowRef('')

const fetchRoute = 'vehicular/solicitudes-piezas'
const toast = useToast()
// header: ({ column }) => makeColumnHeader(column, 'Cargo', UButton),
const { data, refresh } = useFetch<Omit<SolicitudPieza, 'chofer'>[]>(
  '/vehicular/solicitudes-piezas/load-solicitud-pieza-form-data',
  { ...makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`) },
)

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')

// Row Dropdown definition
function getRowItems(row: Row<Omit<SolicitudPieza, 'chofer'>>) {
  return [
    {
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      onSelect() {
        handleDeleteRows(
          fetchRoute,
          refresh,
          childRef?.value?.deleteSelection
            ? childRef?.value?.deleteSelection
            : () => {},
          [{ id: row.original.id }],
          authStore.token ? `Bearer ${authStore.token}` : '',
        )
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Omit<SolicitudPieza, 'chofer'>>[] = [
  makeColumnSelect<Omit<SolicitudPieza, 'chofer'>>(UCheckbox),
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
        aceptado: 'success' as const,
        rechazado: 'error' as const,
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
    id: 'actions',
    cell: ({ row }) => {
      return h(
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
    },
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-fit max-h-full border-2 border-(--ui-border) rounded-2xl">
    <div class="flex flex-col gap-y-2 justify-start  overflow-y-auto px-4 py-3.5 gap-x-3 border-(--ui-border-accented) cool-scrollbar-dark">
      <h1 class="mx-2 text-xl font-bold">
        Registro de Solicitudes de Piezas
      </h1>
      <VehicularSolicitarPiezaInsertForm :refresh="refresh" class="mx-2" />
      <UCollapsible v-if="data && data.length > 0" class="flex flex-col w-full gap-2">
        <UButton
          class="group"
          label="Listado de Solicitudes de Piezas"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
        />

        <template #content>
          <TableMini
            ref="child"
            :columns="columns as TableColumn<unknown>[]"
            :data="data || []"
            :fetch-route="fetchRoute"
            :insert="false"
            @delete="refresh()"
          />
        </template>
      </UCollapsible>
    </div>
  </div>
</template>
