<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import {
  LazyGeograficoLeafletModal,
  LazyGeograficoTerminalesInsertModal,
} from '#components'

const childRef = useTemplateRef('child')

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'puntoRef', label: 'Punto Referente' },
]
const fetchRoute = 'geografico/terminales'
const defaultSortingValue = 'Nombre'

const columnVisibility = {
  'Id': true,
  'Nombre': true,
  'Punto Referente': true,
}

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Overlay Hooks
const overlay = useOverlay()

// Modal for Insert Item
const modal = overlay.create(LazyGeograficoTerminalesInsertModal, {
  props: {
    open: false,
    data: undefined,
    refresh: childRef?.value?.refreshMet
      ? childRef?.value?.refreshMet
      : () => {},
  },
})

async function openInsertModal() {
  modal.patch({
    open: true,
    refresh: childRef?.value?.refreshMet
      ? childRef?.value?.refreshMet
      : () => {},
    data: undefined,
  })
  modal.open()
}

const modalMap = overlay.create(LazyGeograficoLeafletModal, {
  props: {
    open: false,
    locations: [],
  },
})

// Row Dropdown definition
function getRowItems(row: Row<Terminal>) {
  return [
    {
      label: 'Editar',
      icon: 'i-lucide-pencil',
      async onSelect() {
        modal.patch({
          open: true,
          refresh: childRef?.value?.refreshMet
            ? childRef?.value?.refreshMet
            : () => {},
          data: row.original,
        })
        modal.open()
      },
    },
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
          [{ id: row.original.id.toString() }],
        )
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Ver en mapa',
      icon: 'i-lucide-map',
      async onSelect() {
        const latLong = row.original.puntoRef.latLong.split(',')
        const lat = Number(latLong[0])
        const lng = Number(latLong[1])
        modalMap.patch({
          open: true,
          center: [lat, lng],
          locations: [
            { name: row.original.puntoRef.nombre, lat, lng },
          ],
          title: `Viendo la Terminal: ${row.original.nombre}`,
        })
        modalMap.open()
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Terminal>[] = [
  makeColumnSelect<Terminal>(UCheckbox),
  {
    accessorKey: 'id',
    header: ({ column }) => makeColumnHeader(column, 'Id', UButton),
    id: 'Id',
  },
  {
    accessorKey: 'nombre',
    header: ({ column }) => makeColumnHeader(column, 'Nombre', UButton),
    id: 'Nombre',
  },
  {
    accessorKey: 'puntoRef',
    header: ({ column }) => makeColumnHeader(column, 'Punto Referente', UButton),
    cell: ({ row }) => {
      const puntoRef = row.getValue('Punto Referente') as TerminalPuntoRef
      if (puntoRef) {
        return h('div', undefined, [h('p', undefined, `Nombre: ${puntoRef.nombre}`), h('p', undefined, `Ubicación: ${puntoRef.latLong}`)])
      }
      else {
        return h('p', undefined, '[No está el valor de punto de referencia]')
      }
    },
    id: 'Punto Referente',
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
    :filter-options="filterOptions"
    :columns="columns"
    :column-visibility="columnVisibility"
    :default-sorting-value="defaultSortingValue"
    :fetch-route="fetchRoute"
    @open-insert-modal="openInsertModal"
  />
</template>
