<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const authStore = useAuthStore()
const toast = useToast()
const childRef = useTemplateRef('child')
const query = shallowRef('')

const fetchRoute = 'gestion/solicitud-refuerzo'

// Form Ref
const formRef = useTemplateRef('form')

const { data, refresh } = useFetch<SolicitudRefuerzoResponse>(
  '/gestion/solicitud-refuerzo',
  { ...makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`) },
)

// Table UI Component Resolvers
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')

// Row Dropdown definition
function getRowItems(row: Row<SolicitudRefuerzo>) {
  return [
    {
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      onSelect() {
        handleDeleteRows(
          fetchRoute,
          () => {
            refresh()
            formRef?.value?.refreshForm()
          },
          childRef?.value?.deleteSelection
            ? () => {
                childRef?.value?.deleteSelection()
                formRef?.value?.refreshForm()
              }
            : () => { formRef?.value?.refreshForm() },
          [{ id: row.original.id }],
          authStore.token ? `Bearer ${authStore.token}` : '',
        )
      },
    },
  ]
}

// Const Columns  Table
const columns: TableColumn<SolicitudRefuerzo>[] = [
  makeColumnSelect<SolicitudRefuerzo>(UCheckbox),
  {
    accessorKey: 'id',
    header: 'Id',
    id: 'Id',
  },
  {
    accessorKey: 'terminal',
    header: ({ column }) => makeColumnHeader(column, 'Terminal', UButton),
    id: 'Terminal',
    cell: ({ row }) => {
      const terminal = row.getValue('Terminal') as SolicitudRefuerzoTerminal

      return h('p', undefined, terminal.nombre)
    },
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => makeColumnHeader(column, 'Fecha', UButton),
    id: 'Fecha',
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
    accessorKey: 'capacidadTotal',
    header: 'Capacidad Total',
    id: 'Capacidad Total',
    meta: {
      class: {
        td: 'text-center',
        th: 'text-center',
      },
    },
  },

  {
    accessorKey: 'vehiculos',
    header: 'Vehículos',
    id: 'Vehículos',
    cell: ({ row }) => {
      const vehiculos = row.getValue('Vehículos') as SolicitudRefuerzoVehiculo[]

      return h(
        'div',
        { class: 'flex items-center gap-3 sm:max-w-48 md:max-w-96' },
        vehiculos.map((vehiculo, index) =>
          h('p', `${vehiculo.matricula}${index === vehiculos.length - 1 ? '' : ','}`),
        ),
      )
    },
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
        Registro de Solicitudes de Refuerzo
      </h1>
      <GestionRefuerzoInsertForm
        ref="form"
        :refresh="refresh"
        class="mx-2"
      />
      <UCollapsible v-if="data?.data && data.data.length > 0" class="flex flex-col w-full gap-2">
        <UButton
          class="group"
          label="Listado de Solicitudes de Refuerzo"
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
            :data="data.data || []"
            :fetch-route="fetchRoute"
            :insert="false"
            @delete="refresh()"
          />
        </template>
      </UCollapsible>
    </div>
  </div>
</template>
