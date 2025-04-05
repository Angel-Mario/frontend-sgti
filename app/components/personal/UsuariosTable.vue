<script setup lang="ts">
import { h } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Column, Row } from "@tanstack/vue-table";
import { upperFirst } from "scule";
import { getPaginationRowModel } from "@tanstack/vue-table";
import {
	LazyPersonalUsuarioInsertModal,
	LazyTablePagination,
} from "#components";

const filterOptions = [
	"id",
	"carnet",
	"usuario",
	"nombre",
	"correo",
	"estado",
	"teléfono",
	"rol",
];

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

//CustomHooks For Managing the states
const { table, rowSelection, sorting } = useTable("nombre");
const { toast, overlay, globalFilter, debounced, filterOption } =
	useTableHeader(filterOptions[1]);
const {
	page,
	pageSize,
	paramFilterSortPagination,
	pagination,
	handlePageSizeChange,
	handleGoToPage,
} = useTableFooter();

const { data, status, error, refresh } = await useFetch<{
	count: number;
	totalPages: number;
	data: Usuario[];
}>("personal/usuarios", makeFetchOptions(paramFilterSortPagination, toast));

const columns: TableColumn<Usuario>[] = [
	makeColumnSelect<Usuario>(UCheckbox),
	{
		accessorKey: "id",
		header: "id",
	},
	{
		accessorKey: "carnet",
		header: ({ column }) => makeColumnHeader(column, "Carnet", UButton),
	},
	{
		accessorKey: "usuario",
		header: ({ column }) => makeColumnHeader(column, "Usuario", UButton),
	},
	{
		accessorKey: "nombre",
		header: ({ column }) => makeColumnHeader(column, "Nombre", UButton),
	},
	{
		accessorKey: "correo",
		header: ({ column }) => makeColumnHeader(column, "Correo", UButton),
	},
	{
		accessorKey: "estado",
		header: ({ column }) => makeColumnHeader(column, "Estado", UButton),
		cell: ({ row }) => {
			const color = {
				activo: "success" as const,
				desactivado: "neutral" as const,
			}[row.getValue("estado") as string];

			return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
				row.getValue("estado")
			);
		},
	},
	{
		accessorKey: "telefono",
		header: ({ column }) => makeColumnHeader(column, "Teléfono", UButton),
		cell: ({ row }) =>
			row.getValue("telefono")
				? `+${row.getValue("telefono")}`
				: "[Sin telefono]",
	},
	{
		accessorKey: "rol",
		header: ({ column }) => makeColumnHeader(column, "Rol", UButton),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-right" },
				h(
					UDropdownMenu,
					{
						content: {
							align: "end",
						},
						items: getRowItems(row),
						"aria-label": "Actions dropdown",
					},
					() =>
						h(UButton, {
							icon: "i-lucide-ellipsis-vertical",
							color: "neutral",
							variant: "ghost",
							class: "ml-auto",
							"aria-label": "Actions dropdown",
						})
				)
			);
		},
	},
];

const modal = overlay.create(LazyPersonalUsuarioInsertModal, {
	props: {
		open: false,
		user: undefined,
	},
});

const openInsertModal = async () => {
	await modal.patch({ open: true, usuario: undefined });
	await modal.open();
};

function getRowItems(row: Row<Usuario>) {
	return [
		{
			label: "Editar",
			icon: "i-lucide-pencil",
			async onSelect() {
				modal.patch({
					open: true,
					usuario: row.original,
				});
				await modal.open();
			},
		},
		{
			label: "Eliminar",
			icon: "i-lucide-trash",
		},
		{
			type: "separator",
		},
		{
			label: "Copiar correo",
			icon: "i-lucide-copy",
			onSelect() {
				navigator.clipboard.writeText(row.original.correo);

				toast.add({
					title: "El correo ha sido copiado al portapapeles",
					color: "success",
					icon: "i-lucide-circle-check",
				});
			},
		},
		{
			label: "Ver detalles",
			icon: "i-lucide-eye",
		},
	];
}

const columnVisibility = ref({
	id: false,
	correo: false,
});

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
				@click="openInsertModal"
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
			:page="page"
			:page-size="pageSize"
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
