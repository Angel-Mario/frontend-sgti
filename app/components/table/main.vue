<script setup lang="ts" generic="T">
import { h } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { upperFirst } from "scule";
import { getPaginationRowModel } from "@tanstack/vue-table";
import {
	LazyPersonalUsuarioInsertModal,
	LazyTablePagination,
} from "#components";

const props = defineProps({
	filterOptions: {
		type: Array<string>,
		required: true,
	},
	defaultSortingValue: {
		type: String,
		default: "",
	},
	fetchRoute: {
		type: String,
		required: true,
	},
	columns: {
		type: Array<TableColumn<T>>,
		required: true,
	},
});
defineEmits(["openInsertModal"]);

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

//CustomHooks For Managing the states
const { table, rowSelection } = useTable();
const { toast, globalFilter, debounced, filterOption } = useTableHeader(
	props.filterOptions[1]
);
const {
	paramFilterSortPagination,
	pagination,
	handlePageSizeChange,
	handleGoToPage,
} = useTableFooter();

//Data Fetching Function
const { data, status, error, refresh } = await useFetch<{
	count: number;
	totalPages: number;
	data: T[];
}>("personal/usuarios", makeFetchOptions(paramFilterSortPagination, toast));

const columnVisibility = ref({
	id: false,
	correo: false,
});
const route = useRoute();
const sorting = ref([
	{
		id: (route.query["sorting"] as string) || props.defaultSortingValue,
		desc: route.query["order"] === "asc" || false,
	},
]);

const totalItems = ref(data.value?.count || 0);

watch(debounced, () => {
	{
		paramFilterSortPagination.value = filteringRouteManager({
			column: filterOption.value as string,
			search: debounced.value as string,
		});
	}
});
</script>

<template>
	<div class="flex-1 flex-col w-full border-2 border-(--ui-border) rounded-2xl">
		<div
			class="flex justify-start px-4 py-3.5 border-b gap-x-3 border-(--ui-border-accented)"
		>
			<!-- Filter Text Field and search param dropdown -->
			<UButtonGroup>
				<UInput
					id="globalFilter"
					v-model="globalFilter"
					class="max-w-48"
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
					:search-input="{ placeholder: 'Buscar' }"
					:items="filterOptions"
					class="w-32"
				/>
			</UButtonGroup>
			<!-- Insert Button -->
			<UButton
				label=" Añadir"
				color="secondary"
				variant="outline"
				icon="i-lucide-plus"
				class="ml-auto"
				@click="$emit('openInsertModal')"
			/>
			<UButton
				label="Eliminar"
				color="error"
				variant="outline"
				icon="i-lucide-trash"
				:disabled="
					!table?.tableApi?.getIsSomeRowsSelected() &&
					!table?.tableApi?.getIsAllRowsSelected()
				"
			/>

			<!-- Selector de filas -->
			<UDropdownMenu
				:items="table?.tableApi
				?.getAllColumns()
				.filter((column) => column.getCanHide() && column.id !== 'actions' && column.id !== 'select')
				.map((column) => ({
					label: upperFirst(column.id),
					type: 'checkbox' as const,
					checked: column.getIsVisible(),
					onUpdateChecked(checked: boolean) {
						table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
					},
					onSelect(e?: Event) {
						e?.preventDefault()
					}
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
			:data="data?.data"
			:columns="columns"
			class="max-h-[63vh] cool-scrollbar-dark"
			@update:sorting="
				(event) => {
					const [id] = event;
					paramFilterSortPagination = sortingRouteManager([{ id: id?.id as string, desc: id?.desc }]);
				}
			"
		/>
		<LazyTablePagination
			:total-items="totalItems"
			@handle-go-to-page="handleGoToPage"
			@handle-page-size-change="handlePageSizeChange"
		/>
		<LazyTableFooter
			:row-selected="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
			:total-items="totalItems"
		/>
	</div>
</template>
