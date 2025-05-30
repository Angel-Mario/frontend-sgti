<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const childRef = useTemplateRef('child')

const authStore = useAuthStore()
const query = shallowRef('')

const fetchRoute = '/vehicular/averias'
const toast = useToast()
// header: ({ column }) => makeColumnHeader(column, 'Cargo', UButton),
const { data, refresh } = useFetch<ReportarAveriaPage>(
  '/vehicular/averias/load-averia-form-data',
  { ...makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`) },
)

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Row Dropdown definition
function getRowItems(row: Row<Averia>) {
  return [
    {
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      onSelect() {
        handleDeleteRows(
          fetchRoute,
          childRef?.value?.refreshMet ? childRef?.value?.refreshMet : () => {},
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
const columns: TableColumn<Averia>[] = [
  makeColumnSelect<Averia>(UCheckbox),
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'complejidad',
    header: ({ column }) => makeColumnHeader(column, 'Complejidad', UButton),
    id: 'Complejidad',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'descripcion',
    header: ({ column }) => makeColumnHeader(column, 'Descripción', UButton),
    id: 'Descripción',
  },
  {
    accessorKey: 'tipo',
    header: ({ column }) => makeColumnHeader(column, 'Tipo', UButton),
    cell: ({ row }) =>
      row.getValue('Tipo')
        ? row.getValue('Tipo')
        : '[Sin tipo de avería]',
    id: 'Tipo',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'piezas_necesarias',
    header: ({ column }) => makeColumnHeader(column, 'Piezas Necesarias', UButton),
    cell: ({ row }) =>
      row.getValue('Piezas Necesarias')
        ? row.getValue('Piezas Necesarias')
        : 'No se necesitan piezas',
    id: 'Piezas Necesarias',
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
  <TableMini
    v-if="data"
    ref="child"
    :columns="columns as TableColumn<unknown>[]"
    :data="data?.averias || []"
    :fetch-route="fetchRoute"
    :insert="false"
    @delete="refresh()"
  />
</template>
