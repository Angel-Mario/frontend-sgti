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

<script lang="ts" setup>
import { LazyVehicularOmnibusInsertModal } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

const childRef = useTemplateRef("child");

const filterOptions = [
	{ id: "id", label: "Id" },
	{ id: "nombre_u", label: "Usuario" },
	{ id: "fullName", label: "Nombre" },
	{ id: "correo", label: "Correo" },
	{ id: "carnet", label: "Carnet" },
	{ id: "isActive", label: "Estado" },
	{ id: "telefono", label: "Teléfono" },
];
const fetchRoute = "vehicular/omnibus";
const defaultSortingValue = "Nombre";

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
// const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

//Overlay Hooks
const overlay = useOverlay();
const toast = useToast();

//Modal for Insert Item
const modal = overlay.create(LazyVehicularOmnibusInsertModal, {
	props: {
		open: false,
		data: undefined,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => { },
	},
});

const openInsertModal = async () => {
	modal.patch({
		open: true,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => { },
		data: undefined,
	});
	await modal.open();
};

//Row Dropdown definition
function getRowItems(row: Row<Omnibus>) {
	return [
		{
			label: "Editar",
			icon: "i-lucide-pencil",
			async onSelect() {
				modal.patch({
					open: true,
					refresh: childRef?.value?.refreshMet
						? childRef?.value?.refreshMet
						: () => { },
					data: row.original,
				});
				await modal.open();
			},
		},
		{
			label: "Eliminar",
			icon: "i-lucide-trash",
			onSelect() {
				handleDeleteRows(
					fetchRoute,
					childRef?.value?.refreshMet ? childRef?.value?.refreshMet : () => { },
					childRef?.value?.deleteSelection
						? childRef?.value?.deleteSelection
						: () => { },
					[{ id: row.original.id }],
				);
			},
		},
		{
			type: "separator",
		},
		{
			label: "Copiar chapa",
			icon: "i-lucide-copy",
			onSelect() {
				navigator.clipboard.writeText(row.original.chapa);

				toast.add({
					title: "La chapa ha sido copiada al portapapeles",
					color: "success",
					icon: "i-lucide-circle-check",
				});
			},
		},
		// {
		// 	label: "Ver detalles",
		// 	icon: "i-lucide-eye",
		// },
	];
}

//Const Columns  Table
const columns: TableColumn<Omnibus>[] = [
	makeColumnSelect<Omnibus>(UCheckbox),
	{
		accessorKey: "id",
		header: "Id",
		id: "Id",
	},
	{
		accessorKey: "chapa",
		header: ({ column }) => makeColumnHeader(column, "Chapa", UButton),
		id: "Chapa",
	},
	{
		accessorKey: "consumo",
		header: ({ column }) => makeColumnHeader(column, "Consumo", UButton),
		cell: ({ row }) =>
			row.getValue("Consumo")
				? `${row.getValue("Consumo")}L`
				: "[Sin datos]",
		id: "Consumo",
	},
	{
		accessorKey: "capacidad",
		header: ({ column }) => makeColumnHeader(column, "Capacidad", UButton),
		cell: ({ row }) =>
			row.getValue("Capacidad")
				? `${row.getValue("Capacidad")} pasajeros`
				: "[Sin datos]",
		id: "Capacidad",
	},
	{
		accessorKey: "marca",
		header: ({ column }) => makeColumnHeader(column, "Marca", UButton),
		cell: ({ row }) =>
			row.getValue("Marca")
				? row.getValue("Marca")
				: "[Sin datos]",
		id: "Marca",
	},
	{
		accessorKey: "modelo",
		header: ({ column }) => makeColumnHeader(column, "Modelo", UButton),
		cell: ({ row }) =>
			row.getValue("Modelo")
				? row.getValue("Modelo")
				: "[Sin datos]",
		id: "Modelo",
	},
	{
		accessorKey: "año",
		header: ({ column }) => makeColumnHeader(column, "Año", UButton),
		cell: ({ row }) =>
			row.getValue("Año")
				? row.getValue("Año")
				: "[Sin datos]",
		id: "Año",
	},

	{
		accessorKey: "chofer",
		header: ({ column }) => makeColumnHeader(column, "Chofer", UButton),
		cell: ({ row }) =>
			row.getValue("Chofer")
				? `${(row.getValue("Chofer") as OmnibusChofer).id}`
				: "No asignado",
		id: "Chofer",
	},
	// {
	// 	accessorKey: "telefono",
	// 	header: ({ column }) => makeColumnHeader(column, "Teléfono", UButton),
	// 	cell: ({ row }) =>
	// 		row.getValue("Teléfono")
	// 			? `+53${row.getValue("Teléfono")}`
	// 			: "[Sin teléfono]",
	// 	id: "Teléfono",
	// },
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
						}),
				),
			);
		},
	},
];
</script>
