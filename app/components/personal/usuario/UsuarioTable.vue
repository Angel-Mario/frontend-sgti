<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { ConfirmDialog, LazyPersonalUsuarioInsertModal } from '#components'

// Table Ref
const childRef = useTemplateRef('child')

// Filter Options for search parameters
const filterOptions = [
  { id: 'id', label: 'Id' },
  { id: 'nombre_u', label: 'Usuario' },
  { id: 'fullName', label: 'Nombre' },
  { id: 'correo', label: 'Correo' },
  { id: 'carnet', label: 'Carnet' },
  { id: 'isActive', label: 'Estado' },
  { id: 'telefono', label: 'Teléfono' },
]
const fetchRoute = 'personal/usuarios'
const defaultSortingValue = 'Nombre'

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

// Overlay Hooks
const overlay = useOverlay()
const toast = useToast()

// Modal for Insert Item
const modal = overlay.create(LazyPersonalUsuarioInsertModal, {
  props: {
    open: false,
    data: undefined,
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
    data: undefined,
  })
  modal.open()
}
const modalConfirm = overlay.create(
  ConfirmDialog,
  {
    props: {
      message: '',
      resolve: () => {},
    },
  },
)

const authStore = useAuthStore()
// Row Dropdown definition
function getRowItems(row: Row<Usuario>) {
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
      label: row.original.isActive ? 'Desactivar' : 'Activar',
      icon: row.original.isActive ? 'i-lucide-circle-off' : 'i-lucide-circle',
      async onSelect() {
        $fetch(`${fetchRoute}/${row.original.id}`, {
          ...makePostPatchOptions(
            `Se ha ${
              row.original.isActive ? 'desactivado' : 'activado'
            } correctamente el usuario`,
            { isActive: !row.original.isActive },
            () => {
              childRef?.value?.refreshMet()
            },
            toast,
            `Bearer ${authStore.getToken}`,
          ),
          method: 'POST',
        })
      },
    },
    {
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      onSelect() {
        modalConfirm.open({
          message: 'Se eliminará el registro seleccionado',
          resolve: () => handleDeleteRows(
            fetchRoute,
            childRef?.value?.refreshMet ? childRef?.value?.refreshMet : () => {},
            childRef?.value?.deleteSelection
              ? childRef?.value?.deleteSelection
              : () => {},
            [{ id: row.original.id }],
            `Bearer ${authStore.getToken}`,
          ),
        })
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Copiar correo',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.correo)

        toast.add({
          title: 'El correo ha sido copiado al portapapeles',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<Usuario>[] = [
  makeColumnSelect<Usuario>(UCheckbox),
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'nombre_u',
    header: ({ column }) => makeColumnHeader(column, 'Usuario', UButton),
    id: 'Usuario',
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => makeColumnHeader(column, 'Nombre', UButton),
    id: 'Nombre',
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => makeColumnHeader(column, 'Correo', UButton),
    id: 'Correo',
  },
  {
    accessorKey: 'carnet',
    header: ({ column }) => makeColumnHeader(column, 'Carnet', UButton),
    id: 'Carnet',
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => makeColumnHeader(column, 'Estado', UButton),
    cell: ({ row }) => {
      const color = {
        true: 'success' as const,
        false: 'neutral' as const,
      }[row.getValue('Estado') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        (row.getValue('Estado') as boolean) ? 'Activo' : 'Inactivo')
    },
    id: 'Estado',
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => makeColumnHeader(column, 'Teléfono', UButton),
    cell: ({ row }) =>
      row.getValue('Teléfono')
        ? `+53${row.getValue('Teléfono')}`
        : '[Sin teléfono]',
    id: 'Teléfono',
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => makeColumnHeader(column, 'Rol', UButton),
    cell: ({ row }) =>
      (row.getValue('Rol') as string[])[0] === 'admin'
        ? 'Administrador'
        : (row.getValue('Rol') as string[])[0] === 'chofer'
            ? 'Chofer'
            : 'Suministrador',
    id: 'Rol',
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
