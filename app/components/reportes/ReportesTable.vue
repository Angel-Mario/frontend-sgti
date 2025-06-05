<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { LazyReportesInsertModal } from '#components'

// Table Ref
const childRef = useTemplateRef('child')

// Filter Options for search parameters
const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'asunto', label: 'Asunto' },
  { id: 'texto', label: 'Texto' },
  { id: 'fecha', label: 'Fecha' },
]
const fetchRoute = 'gestion/reportes'
const defaultSortingValue = 'fecha'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

// Overlay Hooks
const overlay = useOverlay()
const toast = useToast()

// Modal for Insert Item
const modal = overlay.create(LazyReportesInsertModal, {
  props: {
    open: false,
    refresh: childRef?.value?.refreshMet
      ? childRef?.value?.refreshMet
      : () => {},
  },
})
// Modal estate controller
async function openInsertModal() {
  modal.patch({
    open: true,
    refresh: childRef?.value?.refreshMet
      ? childRef?.value?.refreshMet
      : () => {},
  })
  modal.open()
}
// Row Dropdown definition
function getRowItems(row: Row<Reporte>) {
  return [
    {
      label: 'Descargar .xslx',
      icon: 'i-custom-excel',
      onSelect() {
        const jsonData
          = { id: row.original.id, asunto: row.original.asunto, texto: row.original.texto, fecha: row.original.fecha }

        exportJsonToExcel(jsonData, {
          filename: `Reporte_${row.original.asunto}`,
          sheetName: 'Reporte',
        })

        toast.add({
          title: 'La descarga del reporte ha comenzado',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Reporte>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'asunto',
    header: ({ column }) => makeColumnHeader(column, 'Asunto', UButton),
    id: 'Asunto',
  },
  {
    accessorKey: 'texto',
    header: ({ column }) => makeColumnHeader(column, 'Texto', UButton),
    id: 'Texto',
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => makeColumnHeader(column, 'Fecha', UButton),
    id: 'Fecha',
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
  <TableMain
    ref="child"
    :columns="columns"
    :default-sorting-value="defaultSortingValue"
    :fetch-route="fetchRoute"
    :filter-options="filterOptions"
    :remove="false"
    @open-insert-modal="openInsertModal"
  />
</template>
