<template>
	<TableMain
		:filter-options="filterOptions"
		:default-sorting-value="defaultSortingValue"
		:fetch-route="fetchRoute"
		:columns="columns"
		@open-insert-modal="openInsertModal"
	/>
</template>

<script lang="ts" setup>
import { LazyPersonalUsuarioInsertModal } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

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
const fetchRoute = "personal/usuarios";
const defaultSortingValue = "usuario";

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

//Custom Hooks
const overlay = useOverlay();
const toast = useToast();

//Modal for Insert Item
const modal = overlay.create(LazyPersonalUsuarioInsertModal, {
	props: {
		open: false,
		data: undefined,
	},
});

const openInsertModal = async () => {
	modal.patch({ open: true, data: undefined });
	await modal.open();
};

//Column Dropdown definition
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

//Const Columns  Table
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
</script>
