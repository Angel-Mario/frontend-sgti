<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const childRef = useTemplateRef('child')
const router = useRouter()

const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'complejidad', label: 'Complejidad' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'piezas_necesarias', label: 'Piezas Necesarias' },
  { id: 'vehiculo', label: 'Vehículo' },
]
const fetchRoute = 'vehicular/averias'
const defaultSortingValue = 'Complejidad'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
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
        )
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Averia>[] = [
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
    accessorKey: 'vehiculo',
    header: ({ column }) => makeColumnHeader(column, 'Vehículo', UButton),
    cell: ({ row }) =>
      row.getValue('Vehículo')
        ? h('div', { class: 'flex flex-row justify-center' }, [
            h('div', undefined, [
              h(
                'p',
                undefined,
                (row.getValue('Vehículo') as ChoferVehiculo).matricula,
              ),
              h(
                'p',
                undefined,
                `Marca: ${(row.getValue('Vehículo') as ChoferVehiculo).marca}`,
              ),
              h(
                'p',
                undefined,
                `Modelo: ${(row.getValue('Vehículo') as ChoferVehiculo).modelo}`,
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
                    `/vehicular/vehiculos?column=id&search=${(row.getValue('Vehículo') as ChoferVehiculo).id}`,
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
  />
</template>
