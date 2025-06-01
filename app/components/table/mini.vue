<script setup lang="ts" generic="T">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'

const props = defineProps({
  data: {
    type: Array<T>,
    required: true,
  },
  fetchRoute: {
    type: String,
    required: true,
  },
  columns: {
    type: Array<TableColumn<T>>,
    required: true,
  },
  columnVisibility: {
    type: Object,
    default: () => ({}),
  },
  remove: {
    type: Boolean,
    required: false,
    default: true,
  },
  insert: {
    type: Boolean,
    required: false,
    default: true,
  },
})
defineEmits(['delete'])

// CustomHooks For Managing the states
const { table, rowSelection } = useTable()

const deleteSelection = ref(() => {
  rowSelection.value = {}
})
defineExpose({
  deleteSelection,
})

const columnVisibility = ref({
  Id: false,
  ...props.columnVisibility,
})
const columnPinning = ref({
  left: [],
  right: ['actions'],
})

const authStore = useAuthStore()
</script>

<template>
  <div
    class="flex flex-col w-full h-fit max-h-full border-2 border-(--ui-border) rounded-2xl"
  >
    <div
      class="flex flex-wrap gap-y-1 justify-start px-4 py-3.5 border-b gap-x-3 border-(--ui-border-accented)"
    >
      <div class="flex items-center justify-center ml-auto gap-x-3 gap-y-1">
        <!-- Refresh Button Image -->
        <UButton
          color="primary"
          variant="ghost"
          icon="i-custom-refresh"
          @click=" $emit('delete')"
        />
        <!-- Delete Button -->
        <UButton
          v-if="remove"
          label="Eliminar"
          color="error"
          variant="outline"
          icon="i-lucide-trash"
          :ui="{ label: 'hidden sm:block' }"
          :disabled="
            !table?.tableApi?.getIsSomeRowsSelected()
              && !table?.tableApi?.getIsAllRowsSelected()
          "
          @click="
            handleDeleteRows(
              props.fetchRoute,
              () => $emit('delete'),
              deleteSelection,
              props.data.filter((row, index) => {
                if ((rowSelection as boolean[])[index]) return row;
              }) as any[],
              `Bearer ${authStore.getToken}`,
            )

          "
        />
      </div>

      <!-- Selector de filas -->
      <UDropdownMenu
        class="ml-auto sm:ml-0"
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter(
              (column) =>
                column.getCanHide()
                && column.id !== 'actions'
                && column.id !== 'select',
            )
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi
                  ?.getColumn(column.id)
                  ?.toggleVisibility(!!checked);
              },
              onSelect(e?: Event) {
                e?.preventDefault();
              },
            }))
        "
        :content="{ align: 'end' }"
      >
        <UButton
          color="neutral"
          label="Columnas"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      v-model:column-pinning="columnPinning"
      v-model:column-visibility="columnVisibility"
      sticky
      :data="data"
      :columns="columns"
      class="cool-scrollbar-dark"
    />
  </div>
</template>
