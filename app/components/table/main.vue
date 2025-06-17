<script setup lang="ts" generic="T">
import type { TableColumn } from '@nuxt/ui'
import { LazyConfirmDialog } from '#components'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { upperFirst } from 'scule'

const props = defineProps({
  filterOptions: {
    type: Array<{ label: string, id: string }>,
    required: true,
  },
  defaultSortingValue: {
    type: String,
    default: '',
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
  desc: {
    type: Boolean,
    required: false,
    default: false,
  },
  footer: {
    type: Boolean,
    required: false,
    default: true,
  },
})
defineEmits(['openInsertModal'])
// CustomHooks For Managing the states
const { table, rowSelection } = useTable()
const { toast, globalFilter, debounced, filterOption } = useTableHeader(
  props.filterOptions[2]?.id,
)
const {
  paramFilterSortPagination,
  pagination,
  handlePageSizeChange,
  handleGoToPage,
} = useTableFooter()

const route = useRoute()
const sorting = ref([
  {
    id: props.filterOptions.find(o => o.id === (route.query.sorting as string))?.label || (props.defaultSortingValue as string),
    desc: route.query.order === 'desc' || props.desc,
  },
])

watch(
  debounced,
  () => {
    paramFilterSortPagination.value = filteringRouteManager({
      column: filterOption.value as string,
      search: debounced.value as string,
    })
  },
  { immediate: true },
)
const refreshMet = ref(() => {})
const deleteSelection = ref(() => {
  rowSelection.value = {}
})
defineExpose({
  refreshMet,
  deleteSelection,
})
const authStore = useAuthStore()

// Data Fetching Function
const {
  data,
  status,
  error: _error,
  refresh,
  pending,
} = await useFetch<{
  count: number
  pages: number
  data: T[]
}>(
  props.fetchRoute,
  { ...makeFetchOptions(
    paramFilterSortPagination,
    toast,
    `Bearer ${authStore.getToken}`,
  ), deep: false, dedupe: 'defer', key: props.fetchRoute + paramFilterSortPagination.value.toString() },
)

// redefinition RefreshMetodh
refreshMet.value = refresh

const columnVisibility = ref({
  Id: false,
  ...props.columnVisibility,
})
const columnPinning = ref({
  left: [],
  right: ['actions'],
})

const totalItems = computed(() => data.value?.count || 0)

const oldDataBeforeChange = shallowRef(data.value)
// Show old state while loading new data on new request
watch(data, (data, oldData) => {
  if (!data || status.value === 'error') {
    oldDataBeforeChange.value = oldData
  }
  else {
    oldDataBeforeChange.value = data
  }
})

const overlay = useOverlay()
const modal = overlay.create(
  LazyConfirmDialog,
  {
    props: {
      message: '',
      resolve: () => {},
    },
  },
)
</script>

<template>
  <div
    class="flex flex-col w-full h-fit max-h-full border-2 border-(--ui-border) rounded-2xl"
  >
    <div
      class="flex flex-wrap gap-y-1 justify-start px-4 py-3.5 border-b gap-x-3 border-(--ui-border-accented)"
    >
      <div class="flex items-center justify-center gap-x-3 gap-y-1">
        <!-- Filter Text Field and search param dropdown -->
        <UButtonGroup>
          <UInput
            id="globalFilter"
            v-model="globalFilter"
            class="w-36 sm:w-40 max-w-48"
            placeholder="Filtrar por..."
            @keyup.enter="
              paramFilterSortPagination = filteringRouteManager({
                column: filterOption as string,
                search: debounced as string,
              })
            "
          />
          <USelectMenu
            id="filterOption"
            v-model="filterOption"
            value-key="id"
            :search-input="{ placeholder: 'Buscar' }"
            :items="filterOptions"
            class="w-28"
            @change="
              paramFilterSortPagination = filteringRouteManager({
                column: filterOption as string,
                search: debounced as string,
              })
            "
          />
        </UButtonGroup>
        <!-- Refresh Button Image -->
        <UButton
          color="primary"
          variant="ghost"
          icon="i-custom-refresh"
          @click="refresh()"
        />
      </div>

      <div class="flex items-center justify-center ml-auto gap-x-3 gap-y-1">
        <!-- Insert Button -->
        <UButton
          v-if="insert"
          label="Añadir"
          color="secondary"
          variant="outline"
          icon="i-lucide-plus"
          class="ml-auto"
          :ui="{ label: 'hidden sm:block' }"
          @click="$emit('openInsertModal')"
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
            () => {
              const dataLength = (data?.data.filter((row, index) => {
                if ((rowSelection as boolean[])[index]) return row;
              }) as any[])

              modal.open({
                message: dataLength.length > 1 ? `Se eliminarán los ${dataLength.length} registros seleccionados` : `Se eliminará el registro seleccionado`,
                resolve: () => handleDeleteRows(
                  props.fetchRoute,
                  refresh,
                  deleteSelection,
                  dataLength,
                  `Bearer ${authStore.getToken}`,
                ),
              })
            }
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
      v-model:pagination="pagination"
      v-model:column-pinning="columnPinning"
      v-model:column-visibility="columnVisibility"
      v-model:sorting="sorting"
      :sorting-options="{
        manualSorting: true,
      }"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :loading="status === 'pending'"
      sticky
      :data="pending || status === 'error' ? oldDataBeforeChange?.data : data?.data"
      :columns="columns"
      class="cool-scrollbar-dark"
      @update:sorting="
        (event) => {
          const [id] = event;
          const property = props.filterOptions.find(
            (o) => o.label === (id?.id as string),
          );
          paramFilterSortPagination = sortingRouteManager(
            { id: property?.id as string, desc: id?.desc },
          );
        }
      "
    />
    <LazyTablePagination
      :total-items="totalItems"
      @handle-go-to-page="handleGoToPage"
      @handle-page-size-change="handlePageSizeChange"
    />
    <LazyTableFooter
      v-if="footer"
      :row-selected="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
      :total-items="totalItems"
    />
  </div>
</template>
