<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { LazyGeograficoLeafletModal, LazyVehicularCombustibleAsignadoInsertModal } from '#components'

const childRef = useTemplateRef('child')
const router = useRouter()

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'litros', label: 'Litros' },
  { id: 'punto_combustible', label: 'Punto de Combustible' },
  { id: 'chofer', label: 'Chofer' },
  { id: 'vehiculo', label: 'Vehículo' },
]
const fetchRoute = 'gestion/combustible-chofer'
const defaultSortingValue = 'Chofer'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Overlay Hooks
const overlay = useOverlay()
const toast = useToast()

// Modal for Insert Item
const modal = overlay.create(LazyVehicularCombustibleAsignadoInsertModal, {
  props: {
    open: false,
    data: undefined,
    refresh: childRef?.value?.refreshMet
      ? childRef?.value?.refreshMet
      : () => {},
  },
})

const modalMap = overlay.create(LazyGeograficoLeafletModal, {
  props: {
    open: false,
    locations: [],
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
const authStore = useAuthStore()
// Row Dropdown definition
function getRowItems(row: Row<CombustibleAsignado>) {
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
          [{ id: row.original.id }],
          `Bearer ${authStore.getToken}`,
        )
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Copiar carnet',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.chofer.user.carnet)

        toast.add({
          title: 'El carnet ha sido copiado al portapapeles',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      label: 'Ver en mapa',
      icon: 'i-lucide-map',
      async onSelect() {
        const latLong = row.original.punto_combustible.puntoRef.latLong.split(',')
        const lat = Number(latLong[0])
        const lng = Number(latLong[1])

        modalMap.patch({
          open: true,
          center: [lat, lng],
          locations: [
            { name: row.original.punto_combustible.nombre, lat, lng },
          ],
          title: `Punto de Combustible ${row.original.punto_combustible.nombre}:`,
        })
        modalMap.open()
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<CombustibleAsignado>[] = [
  makeColumnSelect<CombustibleAsignado>(UCheckbox),
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'litros',
    header: ({ column }) => makeColumnHeader(column, 'Litros', UButton),
    id: 'Litros',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'punto_combustible',
    header: ({ column }) => makeColumnHeader(column, 'Punto de Combustible', UButton),
    cell: ({ row }) => {
      const puntoComb = row.getValue('Punto de Combustible') as CombustibleAsignadoPuntoCombustible
      if (puntoComb) {
        return h('p', undefined, puntoComb.nombre)
      }
      else {
        return h('p', undefined, '[No está el valor de punto de referencia]')
      }
    },
    id: 'Punto de Combustible',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'chofer',
    header: ({ column }) => makeColumnHeader(column, 'Chofer', UButton),
    cell: ({ row }) =>
      row.getValue('Chofer')
        ? h('div', { class: 'flex flex-row justify-center' }, [
            h(
              'p',
              undefined,
              (row.getValue('Chofer') as CombustibleAsignadoChofer).user.fullName,
            ),
            h(
              UButton,
              {
                color: 'primary',
                variant: 'solid',
                size: 'md',
                class: 'ml-2 text-xs cursor-pointer',
                onClick: () => {
                  router.push(
                    `/personal/choferes?column=id&search=${(row.getValue('Chofer') as VehiculoChofer).id}`,
                  )
                },
              },
              () => h(UIcon, { name: 'i-lucide-square-arrow-out-up-right' }),
            ),
          ])
        : 'No asignado',
    id: 'Chofer',
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
    cell: ({ row }) =>
      (row.getValue('Vehículo') as CombustibleAsignadoChofer).vehiculo
        ? h('div', { class: 'flex flex-row justify-center' }, [
            h('div', undefined, [
              h(
                'p',
                undefined,
                (row.getValue('Vehículo') as CombustibleAsignadoChofer).vehiculo?.matricula,
              ),
              h(
                'p',
                undefined,
                `Consumo: ${(row.getValue('Vehículo') as CombustibleAsignadoChofer).vehiculo?.consumo}L/100km`,
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
                    `/vehicular/vehiculos?column=id&search=${(row.getValue('Vehículo') as CombustibleAsignadoChofer).id}`,
                  )
                },
              },
              () => h(UIcon, { name: 'i-lucide-square-arrow-out-up-right' }),
            ),
          ])
        : '[Sin vehículo]',
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
    @open-insert-modal="openInsertModal"
  />
</template>
