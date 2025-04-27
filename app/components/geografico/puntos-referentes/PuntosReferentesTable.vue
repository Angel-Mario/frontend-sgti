<template>
	<TableMain
		ref="child"
		:filter-options="filterOptions"
		:columns="columns"
		:default-sorting-value="defaultSortingValue"
		:fetch-route="fetchRoute"
		@open-insert-modal="openInsertModal"
	/>
</template>

<script lang="ts" setup>
import { LazyGeograficoPuntosReferentesInsertModal } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

const childRef = useTemplateRef("child");

const filterOptions = [
	{ id: "id", label: "Id" },
	{ id: "nombre", label: "Nombre" },
	{ id: "latLong", label: "LatLong" },
];
const fetchRoute = "geografico/puntos-ref";
const defaultSortingValue = "Nombre";

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

//Overlay Hooks
const overlay = useOverlay();
const toast = useToast();

//Modal for Insert Item
const modal = overlay.create(LazyGeograficoPuntosReferentesInsertModal, {
	props: {
		open: false,
		data: undefined,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => {},
	},
});

const openInsertModal = async () => {
	modal.patch({
		open: true,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => {},
		data: undefined,
	});
	await modal.open();
};

//Row Dropdown definition
function getRowItems(row: Row<Usuario>) {
	return [
		{
			label: "Editar",
			icon: "i-lucide-pencil",
			async onSelect() {
				modal.patch({
					open: true,
					refresh: childRef?.value?.refreshMet
						? childRef?.value?.refreshMet
						: () => {},
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
					childRef?.value?.refreshMet ? childRef?.value?.refreshMet : () => {},
					childRef?.value?.deleteSelection
						? childRef?.value?.deleteSelection
						: () => {},
					[{ id: row.original.id }],
				);
			},
		},
		{
			type: "separator",
		},
		{
			label: "Ver en mapa",
			icon: "i-lucide-map",
			onSelect() {
				navigator.clipboard.writeText(row.original.correo);

				toast.add({
					title: "Se abrirá un mapa papu",
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
const columns: TableColumn<Usuario>[] = [
	makeColumnSelect<Usuario>(UCheckbox),
	{
		accessorKey: "id",
		header: "Id",
		id: "Id",
	},
	{
		accessorKey: "nombre",
		header: ({ column }) => makeColumnHeader(column, "Nombre", UButton),
		id: "Nombre",
	},
	{
		accessorKey: "latLong",
		header: ({ column }) =>
			makeColumnHeader(column, "Latitud y Longitud", UButton),
		id: "Latitud y Longitud",
	},
	{
		accessorKey: "Usado en",
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "flex items-center gap-3 sm:max-w-48 md:max-w-96" },
				[
					h("div", undefined, [
						h(
							"p",
							{ class: "font-medium text-(--ui-text-highlighted)" },
							"Puntos de combustible: [Ninguno]",
						),
						h(
							"p",
							{ class: "font-medium text-(--ui-text-highlighted)" },
							"Rutas: [Ninguna]",
						),
						h(
							"p",
							{ class: "font-medium text-(--ui-text-highlighted)" },
							"Terminales: [Ninguna]",
						),
					]),
				],
			);
		},
		id: "usadoEn",
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
						}),
				),
			);
		},
	},
];
</script>
