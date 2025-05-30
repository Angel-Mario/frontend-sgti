<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import {
  LazyGeograficoLeafletModal,
  LazyGeograficoPuntosReferentesInsertModal,
} from '#components'

const childRef = useTemplateRef('child')

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'latLong', label: 'latLong' },
]
const fetchRoute = 'geografico/puntos-ref'
const defaultSortingValue = 'Nombre'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Overlay Hooks
const overlay = useOverlay()

// Modal for Insert Item
const modal = overlay.create(LazyGeograficoPuntosReferentesInsertModal, {
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
function getRowItems(row: Row<PuntoRef>) {
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
        const latLong = row.original.latLong.split(',')
        const lat = Number(latLong[0])
        const lng = Number(latLong[1])
        modalMap.patch({
          open: true,
          center: [lat, lng],
          locations: [{ name: row.original.nombre, lat, lng }],
          title: `Punto de referencia ${row.original.nombre}: [${row.original.latLong}]`,
        })
        modalMap.open()
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<PuntoRef>[] = [
  makeColumnSelect<PuntoRef>(UCheckbox),
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
    accessorKey: 'latLong',
    header: ({ column }) =>
      makeColumnHeader(column, 'Latitud y Longitud', UButton),
    id: 'latLong',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'usage',
    header: 'Uso',
    cell: ({ row }) => {
      const usage = row.getValue('usage') as Usage
      if (
        usage.terminales.length === 0
        && usage.puntos_combustible.length === 0
        && usage.rutas.length === 0
      ) {
        return h('p', undefined, '[No está siendo utilizado]')
      }
      // Si está siendo utilizado
      return h(
        'div',
        { class: 'flex items-center gap-3 sm:max-w-48 md:max-w-96' },
        [
          h('div', undefined, [
            // Mostrar Puntos de Combustible
            usage.puntos_combustible.length > 0
              ? h('p', `Puntos de combustible: ${usage.puntos_combustible}`)
              : '',
            // Mostrar Rutas
            usage.rutas.length > 0 ? h('p', `Rutas: ${usage.rutas}`) : '',
            // Mostrar Terminales
            usage.terminales.length > 0
              ? h('p', `Terminales: ${usage.terminales}`)
              : '',
          ]),
        ],
      )
    },
    id: 'usage',
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
