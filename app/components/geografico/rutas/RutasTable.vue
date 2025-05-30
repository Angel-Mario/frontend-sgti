<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { RutaPunto } from '~/utils/types/geografico/rutas'
import {
  LazyGeograficoLeafletModal,
  LazyGeograficoRutasInsertModal,
} from '#components'

const childRef = useTemplateRef('child')

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'latLong', label: 'latLong' },
  { id: 'distancia', label: 'Distancia' },
  { id: 'hora_salida', label: 'Hora de salida' },
  { id: 'hora_regreso', label: 'Hora de regreso' },
  { id: 'puntoSalida', label: 'Salida' },
  { id: 'puntoRegreso', label: 'Regreso' },
]
const fetchRoute = 'geografico/rutas'
const defaultSortingValue = 'Nombre'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Overlay Hooks
const overlay = useOverlay()

// Modal for Insert Item
const modal = overlay.create(LazyGeograficoRutasInsertModal, {
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
const { token } = useAuthStore()
// Row Dropdown definition
function getRowItems(row: Row<Ruta>) {
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
        await modal.open()
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
          token ? `Bearer ${token}` : '',
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
        const latLong = row.original.puntoSalida.latLong.split(',')
        const lat = Number(latLong[0])
        const lng = Number(latLong[1])
        const latLong2 = row.original.puntoRegreso.latLong.split(',')
        const lat2 = Number(latLong2[0])
        const lng2 = Number(latLong2[1])
        console.log(row.original.nombre)
        modalMap.patch({
          open: true,
          center: [lat, lng],
          locations: [
            { name: row.original.puntoSalida.nombre, lat, lng },
            { name: row.original.puntoRegreso.nombre, lat: lat2, lng: lng2 },
          ],
          title: `Ruta ${row.original.nombre}:`,
        })
        modalMap.open()
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Ruta>[] = [
  makeColumnSelect<Ruta>(UCheckbox),
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
    accessorKey: 'distancia',
    header: ({ column }) => makeColumnHeader(column, 'Distancia', UButton),
    cell: ({ row }) => {
      const distancia = row.getValue('Distancia') as string
      if (distancia) {
        return h('p', undefined, `${distancia}km`)
      }
      return h('p', undefined, '[No está el valor de distancia]')
    },
    id: 'Distancia',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'hora_salida',
    header: ({ column }) => makeColumnHeader(column, 'Hora de salida', UButton),
    id: 'Hora de salida',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'hora_regreso',
    header: ({ column }) =>
      makeColumnHeader(column, 'Hora de regreso', UButton),
    id: 'Hora de regreso',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'puntoSalida',
    header: ({ column }) => makeColumnHeader(column, 'Salida', UButton),
    id: 'Salida',
    cell: ({ row }) =>
      h('p', undefined, (row.getValue('Salida') as RutaPunto).nombre),
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'puntoRegreso',
    header: ({ column }) => makeColumnHeader(column, 'Regreso', UButton),
    cell: ({ row }) =>
      h('p', undefined, (row.getValue('Regreso') as RutaPunto).nombre),
    id: 'Regreso',
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
  <TableMain
    ref="child"
    :filter-options="filterOptions"
    :columns="columns"
    :default-sorting-value="defaultSortingValue"
    :fetch-route="fetchRoute"
    @open-insert-modal="openInsertModal"
  />
</template>
