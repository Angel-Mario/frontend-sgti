<script setup lang="ts">
import { h } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Column, Row } from "@tanstack/vue-table";
import { upperFirst } from "scule";
import { getPaginationRowModel } from "@tanstack/vue-table";
import type { Usuario } from "../../utils/types";
import { LazyPersonalUsuarioInsertModal } from "#components";
import { sortingRouteManager } from "~/utils/functions/personal/sorting";
import { filteringRouteManager } from "../../utils/functions/personal/filtering";

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");
const overlay = useOverlay();
const toast = useToast();

const paramFilterSort = ref({});

// https://nuxt.com/docs/api/composables/use-fetch
// https://tanstack.com/table/latest/docs/framework/vue/examples/pagination?path=examples%2Fvue%2Fpagination%2Fsrc%2FApp.vue

const { data, status, error, refresh } = await useFetch<Usuario[]>(
	"personal/usuarios",
	{
		query: paramFilterSort,
		baseURL: "http://localhost:3000/api/",
		// baseURL: useRuntimeConfig().public.apiUrl,
		onRequest({ request, options }) {
			// Set the request headers
			// note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
			options.headers.set("Authorization", "...");
		},
		onRequestError({ request, options, error }) {},
		onResponse({ request, response, options }) {
			// localStorage.setItem("token", response._data.token);
		},
		onResponseError({ request, response, options }) {},
		lazy: true,
	}
);

const colmnHeader = (column: Column<Usuario>, headerName: string) => {
	const isSorted = column.getIsSorted();

	return h(UButton, {
		color: "neutral",
		ui: { leadingIcon: "text-(--ui-primary)" },
		variant: "ghost",
		label: headerName,
		icon: isSorted
			? isSorted === "asc"
				? "i-lucide-arrow-up-narrow-wide"
				: "i-lucide-arrow-down-wide-narrow"
			: "i-lucide-arrow-up-down",
		class: "-mx-2.5",
		onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
	});
};

const columns: TableColumn<Usuario>[] = [
	{
		id: "select",
		accessorKey: "select",
		header: ({ table }) =>
			h(UCheckbox, {
				modelValue: table.getIsSomePageRowsSelected()
					? "indeterminate"
					: table.getIsAllPageRowsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") =>
					table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all",
			}),
		cell: ({ row }) =>
			h(UCheckbox, {
				modelValue: row.getIsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") =>
					row.toggleSelected(!!value),
				"aria-label": "Select row",
			}),
	},
	{
		accessorKey: "id",
		header: "id",
	},
	{
		accessorKey: "carnet",
		header: ({ column }) => colmnHeader(column, "Carnet"),
	},
	{
		accessorKey: "usuario",
		header: ({ column }) => colmnHeader(column, "Usuario"),
	},
	{
		accessorKey: "nombre",
		header: ({ column }) => colmnHeader(column, "Nombre"),
	},
	{
		accessorKey: "correo",
		header: ({ column }) => colmnHeader(column, "Correo"),
	},
	{
		accessorKey: "estado",
		header: ({ column }) => colmnHeader(column, "Estado"),
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
		header: ({ column }) => colmnHeader(column, "Teléfono"),
		cell: ({ row }) =>
			row.getValue("telefono")
				? `+${row.getValue("telefono")}`
				: "[Sin telefono]",
	},
	{
		accessorKey: "rol",
		header: ({ column }) => colmnHeader(column, "Rol"),
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
	modal.patch({ open: true, usuario: undefined });
	await modal.open();
};
const sorting = ref([
	// {
	// 	id: "usuario",
	// 	desc: false,
	// },
]);

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
				// modal.patch()
				// overlay.patch()
				console.log(row.original);
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

const table = useTemplateRef("table");
const rowSelection = ref({});
const columnVisibility = ref({
	id: false,
	correo: false,
});
const pagination = ref({
	pageIndex: 0,
	pageSize: 4,
});

const globalFilter = shallowRef("");
const debounced = refDebounced(globalFilter, 1000);

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
const filterOption = ref(filterOptions[1]);

watch(debounced, () => {
	{
		paramFilterSort.value = filteringRouteManager({
			column: filterOption.value as string,
			search: debounced.value as string,
		});
	}
});

// function rerender() {
//   data.value = defaultData
// }

// function handleGoToPage(e) {
//   const page = e.target.value ? Number(e.target.value) - 1 : 0
//   goToPageNumber.value = page + 1
//   table.value?.tableApi?.setPageIndex(page)
// }

// function handlePageSizeChange(e) {
//   table.value?.tableApi?.setPageSize(Number(e.target.value))
// }
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
						paramFilterSort = filteringRouteManager({
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
				:disabled="!table?.tableApi?.getIsSomeRowsSelected()"
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
			:data="data"
			:columns="columns"
			@update:sorting="
				(event) => {
					const [id] = event;
					paramFilterSort = sortingRouteManager([{ id: id?.id as string, desc: id?.desc }]);
				}
			"
		/>
		<div class="flex justify-center border-t border-(--ui-border) pt-4">
			<UPagination
				:default-page="
					(table?.tableApi?.getState().pagination.pageIndex || 0) + 1
				"
				:items-per-page="table?.tableApi?.getState().pagination.pageSize"
				:total="table?.tableApi?.getFilteredRowModel().rows.length"
				@update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
			/>
		</div>

		<!-- Selected number -->
		<div
			class="px-4 py-3.5 border-t border-(--ui-border-accented) text-sm text-(--ui-text-muted)"
		>
			{{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }}
			de
			{{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }}
			fila(s) seleccionadas.
		</div>
	</div>
</template>
